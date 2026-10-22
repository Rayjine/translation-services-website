<?php
// Set error handling to catch and log everything
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors in production
ini_set('log_errors', 1);   // Log errors instead

// Register shutdown function to catch fatal errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        ob_end_clean();
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Server Error']);
    }
});

// Capture all output to prevent accidental output corrupting JSON
ob_start();

// Function to send JSON response and exit
function sendJsonResponse($success, $message, $statusCode = 200, $extraData = []) {
    ob_end_clean();
    http_response_code($statusCode);
    $response = [
        'success' => $success,
        'message' => $message
    ];
    if (!empty($extraData)) {
        $response = array_merge($response, $extraData);
    }
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}

// Function to load environment variables from .env file
function loadEnv($path) {
    if (!file_exists($path)) {
        error_log("Environment file not found: $path");
        return false;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }
        
        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue; // Skip invalid lines
        }
        
        $name = trim($parts[0]);
        $value = trim($parts[1], "\" '");
        
        $_ENV[$name] = $value;
        putenv("$name=$value");
    }
    
    return true;
}

// Load secrets only from a path configured outside the document root, or use
// environment variables supplied directly by the hosting provider.
$envPath = getenv('OGHAM_ENV_FILE');
if (is_string($envPath) && $envPath !== '') {
    loadEnv($envPath);
}

function escapeEmailHtml($value) {
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// Keep counters outside the web root. Fail closed if the private directory is
// unavailable; a deployment must never silently remove the abuse limit.
function enforceRateLimit($envPath) {
    $directory = getenv('OGHAM_RATE_LIMIT_DIR');
    if (!is_string($directory) || $directory === '') {
        $directory = is_string($envPath) && $envPath !== '' ? dirname($envPath) . '/rate-limit' : '';
    }
    if ($directory === '') {
        error_log('Private rate-limit directory unavailable');
        sendJsonResponse(false, 'Form temporarily unavailable', 503);
    }
    $documentRoot = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    $parent = realpath(dirname($directory));
    if ($documentRoot === false || $parent === false || str_starts_with($parent . '/', $documentRoot . '/')) {
        error_log('Unsafe rate-limit parent');
        sendJsonResponse(false, 'Form temporarily unavailable', 503);
    }
    if (!is_dir($directory) && !mkdir($directory, 0700)) {
        error_log('Private rate-limit directory unavailable');
        sendJsonResponse(false, 'Form temporarily unavailable', 503);
    }
    $directory = realpath($directory);
    if ($directory === false || $documentRoot === false || str_starts_with($directory . '/', $documentRoot . '/') || !is_writable($directory)) {
        error_log('Unsafe rate-limit directory');
        sendJsonResponse(false, 'Form temporarily unavailable', 503);
    }
    $address = $_SERVER['REMOTE_ADDR'] ?? '';
    $rateKey = (string) ($_ENV['RECAPTCHA_SECRET_KEY'] ?? getenv('RECAPTCHA_SECRET_KEY') ?: 'ogham');
    $key = hash_hmac('sha256', $address, $rateKey);
    $handle = fopen($directory . '/' . $key . '.json', 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        error_log('Rate-limit storage unavailable');
        sendJsonResponse(false, 'Form temporarily unavailable', 503);
    }
    $stored = json_decode(stream_get_contents($handle), true);
    $now = time();
    $window = is_array($stored) && isset($stored['since'], $stored['count']) && $stored['since'] > $now - 3600
        ? $stored : ['since' => $now, 'count' => 0];
    if ($window['count'] >= 20) {
        flock($handle, LOCK_UN);
        fclose($handle);
        header('Retry-After: ' . max(1, $window['since'] + 3600 - $now));
        sendJsonResponse(false, 'Too many requests. Please try again later.', 429);
    }
    $window['count']++;
    rewind($handle);
    if (!ftruncate($handle, 0) || fwrite($handle, json_encode($window)) === false || !fflush($handle)) {
        flock($handle, LOCK_UN);
        fclose($handle);
        sendJsonResponse(false, 'Form temporarily unavailable', 503);
    }
    flock($handle, LOCK_UN);
    fclose($handle);
}

// Function to handle email sending with or without attachment
function sendEmail($to, $subject, $body, $headers, $attachment = null) {
    // Try sending using SMTP directly (since mail() function is not available)
    $smtpServer = 'mail.infomaniak.com'; // Infomaniak SMTP server
    $smtpPort = 465;  // SSL/TLS port for Infomaniak
    
    // Get credentials from environment variables
    $smtpUser = trim((string) ($_ENV['SMTP_USER'] ?? getenv('SMTP_USER') ?? ''));
    $smtpPass = (string) ($_ENV['SMTP_PASS'] ?? getenv('SMTP_PASS') ?? '');
    if (filter_var($smtpUser, FILTER_VALIDATE_EMAIL) === false || preg_match('/[\r\n\0]/', $smtpUser) || $smtpPass === '') {
        error_log('SMTP is not configured');
        return false;
    }

    // Reply only to a validated address supplied by the form.
    $senderEmail = 'info@oghamtranslations.com';
    if (preg_match('/^Reply-To:\s*([^\r\n]*)/mi', $headers, $matches)) {
        $senderEmail = trim($matches[1]);
    }
    
    // Initialize connection
    $success = false;
    try {
        // Create a socket connection to the SMTP server with SSL for port 465
        $socket = false;
        if ($smtpPort == 465) {
            // Use SSL for connection
            $socket = fsockopen("ssl://{$smtpServer}", $smtpPort, $errno, $errstr, 30);
            error_log("Connecting using SSL to {$smtpServer}:{$smtpPort}");
        } else {
            // Use regular connection for other ports
            $socket = fsockopen($smtpServer, $smtpPort, $errno, $errstr, 30);
            error_log("Connecting without SSL to {$smtpServer}:{$smtpPort}");
        }
        if (!$socket) {
            error_log('SMTP connection failed');
            return false;
        }
        stream_set_timeout($socket, 15);
        
        // Check server response
        if (!checkResponse($socket, 220)) {
            fclose($socket);
            return false;
        }
        
        // Send EHLO command
        fputs($socket, "EHLO oghamtranslations.com\r\n");
        if (!checkResponse($socket, 250)) {
            fclose($socket);
            return false;
        }
        
        // Start TLS if not on port 465 (which is usually already SSL)
        if ($smtpPort != 465) {
            fputs($socket, "STARTTLS\r\n");
            if (!checkResponse($socket, 220)) {
                fclose($socket);
                return false;
            }
            
            // Upgrade to TLS
            if (stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT) !== true) {
                fclose($socket);
                return false;
            }
            
            // Send EHLO again after TLS
            fputs($socket, "EHLO oghamtranslations.com\r\n");
            if (!checkResponse($socket, 250)) {
                fclose($socket);
                return false;
            }
        }
        
        // Authentication if credentials provided
        if (!empty($smtpUser) && !empty($smtpPass)) {
            fputs($socket, "AUTH LOGIN\r\n");
            if (!checkResponse($socket, 334)) {
                fclose($socket);
                return false;
            }
            
            fputs($socket, base64_encode($smtpUser) . "\r\n");
            if (!checkResponse($socket, 334)) {
                fclose($socket);
                return false;
            }
            
            fputs($socket, base64_encode($smtpPass) . "\r\n");
            if (!checkResponse($socket, 235)) {
                error_log("SMTP authentication failed");
                fclose($socket);
                return false;
            }
        }
        
        // Set sender and recipient
        fputs($socket, "MAIL FROM: <$smtpUser>\r\n");
        if (!checkResponse($socket, 250)) {
            fclose($socket);
            return false;
        }
        
        fputs($socket, "RCPT TO: <$to>\r\n");
        if (!checkResponse($socket, 250)) {
            fclose($socket);
            return false;
        }
        
        // Start message data
        fputs($socket, "DATA\r\n");
        if (!checkResponse($socket, 354)) {
            fclose($socket);
            return false;
        }
        
        // Prepare message with headers
        $message = "Subject: $subject\r\n";
        $message .= "To: $to\r\n";
        $message .= "From: $smtpUser\r\n";
        $message .= "Reply-To: $senderEmail\r\n";
        $message .= "MIME-Version: 1.0\r\n";
        
        // Handle attachment
        if ($attachment) {
            $separator = bin2hex(random_bytes(24));
            $fileContent = file_get_contents($attachment['tmp_name']);
            $fileEncoded = chunk_split(base64_encode($fileContent));
            $filename = $attachment['name'];
            
            $message .= "Content-Type: multipart/mixed; boundary=\"$separator\"\r\n\r\n";
            $message .= "--$separator\r\n";
            $message .= "Content-Type: text/html; charset=UTF-8\r\n";
            $message .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
            $message .= quoted_printable_encode($body) . "\r\n\r\n";
            $message .= "--$separator\r\n";
            $message .= "Content-Type: application/octet-stream; name=\"$filename\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
            $message .= "$fileEncoded\r\n";
            $message .= "--$separator--";
        } else {
            $message .= "Content-Type: text/html; charset=UTF-8\r\n";
            $message .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
            $message .= quoted_printable_encode($body) . "\r\n";
        }
        
        // SMTP DATA requires CRLF and dot transparency, including user-provided lines.
        $message = preg_replace('/\r\n|\r|\n/', "\r\n", $message);
        $message = preg_replace('/(^|\r\n)\./', '$1..', $message);
        // End message with a single dot
        fputs($socket, $message . "\r\n.\r\n");
        if (!checkResponse($socket, 250)) {
            fclose($socket);
            return false;
        }
        
        // Quit session
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        $success = true;
        
    } catch (Exception $e) {
        $success = false;
    }
    return $success;
}

// Helper function to check SMTP responses
function checkResponse($socket, $expectedCode) {
    $response = '';
    while (substr($response, 3, 1) != ' ') {
        if (!($response = fgets($socket, 256))) {
            return false;
        }
    }
    
    if (substr($response, 0, 3) != $expectedCode) {
        return false;
    }
    
    return true;
}

// Get the request data
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? $_SERVER["CONTENT_TYPE"] : '';

try {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        sendJsonResponse(false, 'Method not allowed', 405);
    }

    if (stripos($contentType, 'multipart/form-data') !== false) {
        $postData = json_decode($_POST['data'] ?? '', true);
        if ($postData === null && json_last_error() !== JSON_ERROR_NONE) {
            sendJsonResponse(false, 'Invalid JSON in form data: ' . json_last_error_msg(), 400);
        }
        $data = $postData;
        $attachment = null;
        if (isset($_FILES['file'])) {
            $upload = $_FILES['file'];
            if (!is_array($upload) || ($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
                sendJsonResponse(false, 'Invalid file upload', 400);
            }
            if (!is_uploaded_file($upload['tmp_name'] ?? '')) {
                sendJsonResponse(false, 'Invalid file upload', 400);
            }
            $uploadSize = filesize($upload['tmp_name']);
            if ($uploadSize === false || $uploadSize > 10 * 1024 * 1024) {
                sendJsonResponse(false, 'File exceeds the 10 MB limit', 413);
            }
            $originalName = basename((string) ($upload['name'] ?? ''));
            $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
            $allowedExtensions = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'rtf'];
            if (!in_array($extension, $allowedExtensions, true) || preg_match('/[\r\n\0]/', $originalName)) {
                sendJsonResponse(false, 'Unsupported file', 400);
            }
            $safeName = preg_replace('/[^A-Za-z0-9._-]/', '_', $originalName);
            $attachment = $upload;
            $attachment['name'] = $safeName !== '' ? $safeName : 'attachment.' . $extension;
        }
    } elseif (stripos($contentType, 'application/json') !== false) {
        $inputData = file_get_contents('php://input');
        $data = json_decode($inputData, true);
        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            sendJsonResponse(false, 'Invalid JSON in request body: ' . json_last_error_msg(), 400);
        }
        $attachment = null;
    } else {
        sendJsonResponse(false, 'Unsupported content type', 415);
    }

    if (!is_array($data) || empty($data)) {
        sendJsonResponse(false, 'No data received', 400);
    }

    // Validate all string values on the server; the browser's validation is not a security boundary.
    $maxLengths = [
        'firstName' => 120, 'lastName' => 120, 'email' => 254, 'phone' => 60,
        'company' => 200, 'sourceLanguage' => 100, 'targetLanguage' => 100,
        'serviceType' => 120, 'projectDetails' => 12000, 'deadline' => 40,
        'budget' => 120, 'howDidYouHear' => 500
    ];
    foreach ($maxLengths as $field => $maxLength) {
        if (isset($data[$field]) && !is_string($data[$field])) {
            sendJsonResponse(false, 'Invalid form data', 400);
        }
        if (isset($data[$field])) {
            $data[$field] = trim($data[$field]);
            if (strlen($data[$field]) > $maxLength) {
                sendJsonResponse(false, 'A form field is too long', 400);
            }
        }
    }
    $requiredFields = ['firstName', 'lastName', 'email', 'sourceLanguage', 'targetLanguage', 'serviceType', 'projectDetails'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || $data[$field] === '') {
            sendJsonResponse(false, 'Missing required field: ' . $field, 400);
        }
    }
    if (($data['agreeToTerms'] ?? false) !== true) {
        sendJsonResponse(false, 'Terms must be accepted', 400);
    }

    if (preg_match('/[\r\n\0]/', $data['firstName'] . $data['lastName'] . $data['email']) ||
        filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
        sendJsonResponse(false, 'Invalid email or name', 400);
    }

    enforceRateLimit($envPath);

    // CAPTCHA is mandatory. Missing configuration or a failed verification must never fail open.
    $recaptchaToken = $data['recaptchaToken'] ?? '';
    $recaptchaSecret = trim((string) ($_ENV['RECAPTCHA_SECRET_KEY'] ?? getenv('RECAPTCHA_SECRET_KEY') ?? ''));
    if (!is_string($recaptchaToken) || trim($recaptchaToken) === '') {
        sendJsonResponse(false, 'CAPTCHA verification is required', 400);
    }
    if ($recaptchaSecret === '' || !function_exists('curl_init')) {
        error_log('CAPTCHA verification is not configured');
        sendJsonResponse(false, 'Form verification is temporarily unavailable', 503);
    }
    $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $recaptchaSecret,
            'response' => $recaptchaToken,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10
    ]);
    $captchaBody = curl_exec($ch);
    $captchaStatus = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    $captchaResult = is_string($captchaBody) ? json_decode($captchaBody, true) : null;
    $validCaptchaHosts = ['oghamtranslations.com', 'www.oghamtranslations.com'];
    if ($captchaStatus !== 200 || !is_array($captchaResult) || ($captchaResult['success'] ?? false) !== true ||
        !in_array($captchaResult['hostname'] ?? '', $validCaptchaHosts, true)) {
        sendJsonResponse(false, 'CAPTCHA verification failed', 400);
    }

    // Constructing email
    $to = "info@oghamtranslations.com";
    $subject = "New Translation Request from {$data['firstName']} {$data['lastName']}";

    // Build email body
    $body = "<html><body>";
    $body .= "<h2>New Translation Request</h2>";
    $body .= "<p><strong>Name:</strong> " . escapeEmailHtml($data['firstName']) . " " . escapeEmailHtml($data['lastName']) . "</p>";
    $body .= "<p><strong>Email:</strong> " . escapeEmailHtml($data['email']) . "</p>";

    if (!empty($data['phone'])) {
        $body .= "<p><strong>Phone:</strong> " . escapeEmailHtml($data['phone']) . "</p>";
    }

    if (!empty($data['company'])) {
        $body .= "<p><strong>Company:</strong> " . escapeEmailHtml($data['company']) . "</p>";
    }

    $body .= "<p><strong>Source Language:</strong> " . escapeEmailHtml($data['sourceLanguage']) . "</p>";
    $body .= "<p><strong>Target Language:</strong> " . escapeEmailHtml($data['targetLanguage']) . "</p>";
    $body .= "<p><strong>Service Type:</strong> " . escapeEmailHtml($data['serviceType']) . "</p>";
    $body .= "<p><strong>Project Details:</strong> " . nl2br(escapeEmailHtml($data['projectDetails'])) . "</p>";

    if (!empty($data['deadline'])) {
        $body .= "<p><strong>Deadline:</strong> " . escapeEmailHtml($data['deadline']) . "</p>";
    }

    if (!empty($data['budget'])) {
        $body .= "<p><strong>Budget:</strong> " . escapeEmailHtml($data['budget']) . "</p>";
    }

    if (!empty($data['howDidYouHear'])) {
        $body .= "<p><strong>How they heard about us:</strong> " . escapeEmailHtml($data['howDidYouHear']) . "</p>";
    }

    if (!empty($data['agreeToTerms']) && $data['agreeToTerms'] === true) {
        $body .= "<p><strong>Agreed to Terms:</strong> Yes</p>";
    }

    $body .= "</body></html>";

    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Reply-To: {$data['email']}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send the email
    $mailSent = sendEmail($to, $subject, $body, $headers, $attachment);

    if ($mailSent) {
        sendJsonResponse(true, 'Your message has been sent successfully!', 200, ['fileAttached' => !empty($attachment)]);
    } else {
        sendJsonResponse(false, 'Failed to send the email. Please try again later.', 500);
    }
} catch (Throwable $e) {
    error_log('Contact form processing failed');
    sendJsonResponse(false, 'Error processing request. Please try again.', 500);
}

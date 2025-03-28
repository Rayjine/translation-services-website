<?php
// Set error handling to catch and log everything
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors in production
ini_set('log_errors', 1);   // Log errors instead

// Detect production environment
$is_production = strpos(__DIR__, '/sites/oghamtranslations.com') !== false;

// Set log directory
$log_dir = __DIR__ . '/logs';

// Create log directory if it doesn't exist
if (!file_exists($log_dir)) {
    mkdir($log_dir, 0755, true);
}

// Set the log file to our custom location
ini_set('error_log', $log_dir . '/php_errors.log');



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

// Load environment variables from the production path
$envPath = '/home/clients/4684ac79f6c28e7a53817535f7015dba/sites/oghamtranslations.com/.env';
loadEnv($envPath);

// Basic environment variables check
error_log('ENV variables loaded from production path');

// Create our contact submissions backup directory
$backupDir = __DIR__ . '/contact_submissions';
if (!file_exists($backupDir)) {
    mkdir($backupDir, 0755, true);
}

// Function to handle email sending with or without attachment
function sendEmail($to, $subject, $body, $headers, $attachment = null) {
    // Immediately save form data to a JSON file as a backup
    global $backupDir;
    $timestamp = date('Y-m-d_H-i-s');
    $backupFile = $backupDir . '/submission_' . $timestamp . '.json';
    
    $backupData = [
        'timestamp' => $timestamp,
        'to' => $to,
        'subject' => $subject,
        'body' => $body,
        'headers' => $headers,
        'attachment' => $attachment ? $attachment['name'] : null
    ];
    
    file_put_contents($backupFile, json_encode($backupData, JSON_PRETTY_PRINT));
    // Append form details to log file as a backup method in case SMTP fails
    error_log("====== NEW FORM SUBMISSION ======\n".
             "To: {$to}\n".
             "Subject: {$subject}\n".
             "Body: {$body}\n".
             "Headers: {$headers}\n".
             "Attachment: " . ($attachment ? $attachment['name'] : 'None'));
             
    // Try sending using SMTP directly (since mail() function is not available)
    $smtpServer = 'mail.infomaniak.com'; // Infomaniak SMTP server
    $smtpPort = 465;  // SSL/TLS port for Infomaniak
    
    // Get credentials from environment variables
    $smtpUser = $_ENV['SMTP_USER'] ?? getenv('SMTP_USER') ?? 'info@oghamtranslations.com';
    $smtpPass = $_ENV['SMTP_PASS'] ?? getenv('SMTP_PASS') ?? '';
    
    // Log SMTP connection info (without exposing full password)
    error_log("SMTP connection details: {$smtpServer}:{$smtpPort} with user {$smtpUser}");
    
    // Parse the From header to get the sender email
    $senderEmail = 'info@oghamtranslations.com'; // Default fallback
    if (preg_match('/From: ([^\r\n]*)/i', $headers, $matches)) {
        $senderEmail = trim(str_replace(['<', '>'], '', $matches[1]));
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
            error_log("Socket connection failed: $errno - $errstr");
            return false;
        }
        
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
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            
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
            $separator = md5(time());
            $fileContent = file_get_contents($attachment['tmp_name']);
            $fileEncoded = chunk_split(base64_encode($fileContent));
            $filename = $attachment['name'];
            
            $message .= "Content-Type: multipart/mixed; boundary=\"$separator\"\r\n\r\n";
            $message .= "--$separator\r\n";
            $message .= "Content-Type: text/html; charset=UTF-8\r\n";
            $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
            $message .= "$body\r\n\r\n";
            $message .= "--$separator\r\n";
            $message .= "Content-Type: application/octet-stream; name=\"$filename\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
            $message .= "$fileEncoded\r\n";
            $message .= "--$separator--";
        } else {
            $message .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
            $message .= "$body\r\n";
        }
        
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
    
    // Save the form data to a file as a backup if sending fails
    if (!$success) {
        $formDataFile = __DIR__ . '/contact_submissions/form_' . date('Y-m-d_H-i-s') . '.html';
        file_put_contents($formDataFile, $body);
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
    if (strpos($contentType, 'multipart/form-data') !== false) {
        $postData = json_decode($_POST['data'], true);
        if ($postData === null && json_last_error() !== JSON_ERROR_NONE) {
            sendJsonResponse(false, 'Invalid JSON in form data: ' . json_last_error_msg(), 400);
        }
        $data = $postData;
        $attachment = isset($_FILES['file']) && $_FILES['file']['error'] === 0 ? $_FILES['file'] : null;
    } else {
        $inputData = file_get_contents('php://input');
        $data = json_decode($inputData, true);
        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            sendJsonResponse(false, 'Invalid JSON in request body: ' . json_last_error_msg(), 400);
        }
        $attachment = null;
    }

    if (empty($data)) {
        sendJsonResponse(false, 'No data received', 400);
    }

    // Verify required fields
    $requiredFields = ['firstName', 'lastName', 'email', 'sourceLanguage', 'targetLanguage', 'serviceType', 'projectDetails'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            sendJsonResponse(false, 'Missing required field: ' . $field, 400);
        }
    }

    // reCAPTCHA verification (enable as needed)
    if (!empty($data['recaptchaToken'])) {
        // Get the secret key
        $recaptchaSecret = $_ENV['RECAPTCHA_SECRET_KEY'] ?? getenv('RECAPTCHA_SECRET_KEY') ?? '';
        
        if (!empty($recaptchaSecret)) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
                'secret' => $recaptchaSecret,
                'response' => $data['recaptchaToken'],
                'remoteip' => $_SERVER['REMOTE_ADDR']
            ]));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $recaptchaResponse = json_decode(curl_exec($ch), true);
            curl_close($ch);

            if (!$recaptchaResponse['success']) {
                // For testing: Allow form submission despite reCAPTCHA failure
                
                // Uncomment this in production to enforce reCAPTCHA
                /*
                sendJsonResponse(false, 'CAPTCHA verification failed', 400, [
                    'details' => $recaptchaResponse['error-codes']
                ]);
                */
            }
        }
    }

    // Constructing email
    $to = "info@oghamtranslations.com";
    $subject = "New Translation Request from {$data['firstName']} {$data['lastName']}";

    // Build email body
    $body = "<html><body>";
    $body .= "<h2>New Translation Request</h2>";
    $body .= "<p><strong>Name:</strong> {$data['firstName']} {$data['lastName']}</p>";
    $body .= "<p><strong>Email:</strong> {$data['email']}</p>";

    if (!empty($data['phone'])) {
        $body .= "<p><strong>Phone:</strong> {$data['phone']}</p>";
    }

    if (!empty($data['company'])) {
        $body .= "<p><strong>Company:</strong> {$data['company']}</p>";
    }

    $body .= "<p><strong>Source Language:</strong> {$data['sourceLanguage']}</p>";
    $body .= "<p><strong>Target Language:</strong> {$data['targetLanguage']}</p>";
    $body .= "<p><strong>Service Type:</strong> {$data['serviceType']}</p>";
    $body .= "<p><strong>Project Details:</strong> " . nl2br(htmlspecialchars($data['projectDetails'])) . "</p>";

    if (!empty($data['deadline'])) {
        $body .= "<p><strong>Deadline:</strong> {$data['deadline']}</p>";
    }

    if (!empty($data['budget'])) {
        $body .= "<p><strong>Budget:</strong> {$data['budget']}</p>";
    }

    if (!empty($data['howDidYouHear'])) {
        $body .= "<p><strong>How they heard about us:</strong> {$data['howDidYouHear']}</p>";
    }

    if (!empty($data['agreeToTerms']) && $data['agreeToTerms'] === true) {
        $body .= "<p><strong>Agreed to Terms:</strong> Yes</p>";
    }

    $body .= "</body></html>";

    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$data['email']}\r\n";
    $headers .= "Reply-To: {$data['email']}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send the email
    $mailSent = sendEmail($to, $subject, $body, $headers, $attachment);

    if ($mailSent) {
        sendJsonResponse(true, 'Your message has been sent successfully!', 200, ['fileAttached' => !empty($attachment)]);
    } else {
        sendJsonResponse(false, 'Failed to send the email. Please try again later.', 500);
    }
} catch (Exception $e) {
    sendJsonResponse(false, 'Error processing request. Please try again.', 500);
}

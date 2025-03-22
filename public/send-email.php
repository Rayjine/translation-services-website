<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get POST data
$contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';

// Handle form data with file uploads
if (strpos($contentType, 'multipart/form-data') !== false) {
    // If form data has file, the JSON data is in the 'data' field
    $data = isset($_POST['data']) ? json_decode($_POST['data'], true) : [];
} else {
    // Otherwise, get the JSON data directly from the request body
    $data = json_decode(file_get_contents('php://input'), true);
}

// Verify required fields
$requiredFields = ['firstName', 'lastName', 'email', 'sourceLanguage', 'targetLanguage', 'serviceType', 'projectDetails'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required field: ' . $field]);
        exit();
    }
}

// Optional: Verify reCAPTCHA if provided
// Check for recaptchaToken (which could be named captchaValue or recaptchaToken depending on frontend implementation)
$recaptchaToken = !empty($data['recaptchaToken']) ? $data['recaptchaToken'] : (!empty($data['captchaValue']) ? $data['captchaValue'] : null);

if (!empty($recaptchaToken)) {
    $recaptchaSecret = 'YOUR_RECAPTCHA_SECRET_KEY'; // Replace with your secret key from .env
    $recaptchaResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $recaptchaSecret . '&response=' . $recaptchaToken);
    $recaptchaData = json_decode($recaptchaResponse);
    
    if (!$recaptchaData->success) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'CAPTCHA verification failed']);
        exit();
    }
}

// Construct email
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

// Add the terms agreement confirmation
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

// Send email
$mailSent = mail($to, $subject, $body, $headers);

// Handle file upload (if a file was sent)
$fileAttached = false;
// Check for file in regular $_FILES array
if (isset($_FILES['file']) && $_FILES['file']['error'] === 0) {
    $attachment = $_FILES['file'];
    $filename = $attachment['name'];
    
    // Send a second email with attachment
    // Note: This is a simple approach; for more complex attachment handling, consider using libraries like PHPMailer
    $fileContent = file_get_contents($attachment['tmp_name']);
    $fileEncoded = chunk_split(base64_encode($fileContent));
    
    $separator = md5(time());
    
    $eol = "\r\n";
    
    $headers = "From: {$data['email']}" . $eol;
    $headers .= "Reply-To: {$data['email']}" . $eol;
    $headers .= "MIME-Version: 1.0" . $eol;
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol;
    
    $message = "--" . $separator . $eol;
    $message .= "Content-Type: text/html; charset=\"UTF-8\"" . $eol;
    $message .= "Content-Transfer-Encoding: 8bit" . $eol . $eol;
    $message .= "File attachment for request from {$data['firstName']} {$data['lastName']}" . $eol;
    
    $message .= "--" . $separator . $eol;
    $message .= "Content-Type: application/octet-stream; name=\"" . $filename . "\"" . $eol;
    $message .= "Content-Transfer-Encoding: base64" . $eol;
    $message .= "Content-Disposition: attachment" . $eol . $eol;
    $message .= $fileEncoded . $eol;
    $message .= "--" . $separator . "--";
    
    $fileAttached = mail($to, "Attachment: " . $subject, $message, $headers);
}

// Send response back to client
if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!', 'fileAttached' => $fileAttached]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send the email. Please try again later.']);
}

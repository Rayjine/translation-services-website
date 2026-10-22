<?php
// Run with:
// podman run --rm --network=none --read-only --tmpfs /tmp \
//   -e OGHAM_ENV_FILE= -e RECAPTCHA_SECRET_KEY= -e SMTP_USER= -e SMTP_PASS= \
//   -v "$PWD/public/send-email.php:/app/public/send-email.php:ro,Z" \
//   -v "$PWD/tests/contact-validation.php:/app/tests/contact-validation.php:ro,Z" \
//   docker.io/library/php:8.2-cli php /app/tests/contact-validation.php

$host = '127.0.0.1';
$port = 18782;
$address = "http://$host:$port/send-email.php";
$server = proc_open(
    ['php', '-S', "$host:$port", '-t', '/app/public'],
    [0 => ['pipe', 'r'], 1 => ['file', '/dev/null', 'w'], 2 => ['file', '/dev/null', 'w']],
    $pipes
);
if (!is_resource($server)) {
    fwrite(STDERR, "Unable to start local PHP server\n");
    exit(1);
}
fclose($pipes[0]);

try {
    $ready = false;
    for ($attempt = 0; $attempt < 30; $attempt++) {
        $socket = @stream_socket_client("tcp://$host:$port", $errno, $error, 0.1);
        if ($socket) {
            fclose($socket);
            $ready = true;
            break;
        }
        usleep(100000);
    }
    if (!$ready) {
        throw new RuntimeException('Local PHP server did not start');
    }

    $valid = [
        'firstName' => 'Ada', 'lastName' => 'Lovelace',
        'email' => 'ada@example.org', 'sourceLanguage' => 'English',
        'targetLanguage' => 'French', 'serviceType' => 'Translation',
        'projectDetails' => 'A short document', 'agreeToTerms' => true,
    ];
    $cases = [
        ['get', 'GET', null, 405, 'Method not allowed'],
        ['invalid_json', 'POST', '{', 400, 'Invalid JSON in request body'],
        ['invalid_field_type', 'POST', json_encode(array_replace($valid, ['firstName' => ['Ada']])), 400, 'Invalid form data'],
        ['terms_false', 'POST', json_encode(array_replace($valid, ['agreeToTerms' => false])), 400, 'Terms must be accepted'],
        ['invalid_email', 'POST', json_encode(array_replace($valid, ['email' => 'not-an-email'])), 400, 'Invalid email or name'],
        ['missing_captcha', 'POST', json_encode($valid), 400, 'CAPTCHA verification is required'],
        ['unconfigured_captcha', 'POST', json_encode(array_replace($valid, ['recaptchaToken' => 'local-test-token'])), 503, 'Form verification is temporarily unavailable'],
    ];

    $failed = false;
    foreach ($cases as [$name, $method, $body, $expectedStatus, $expectedMessage]) {
        $options = ['method' => $method, 'ignore_errors' => true, 'timeout' => 3];
        if ($body !== null) {
            $options['header'] = "Content-Type: application/json\r\n";
            $options['content'] = $body;
        }
        $response = @file_get_contents($address, false, stream_context_create(['http' => $options]));
        $status = isset($http_response_header[0]) && preg_match('/^HTTP\/\S+ (\d+)/', $http_response_header[0], $match)
            ? (int) $match[1] : null;
        $json = is_string($response) ? json_decode($response, true) : null;
        $passed = $status === $expectedStatus && is_array($json)
            && ($json['success'] ?? null) === false
            && str_contains((string) ($json['message'] ?? ''), $expectedMessage);
        $failed = $failed || !$passed;
        echo json_encode([
            'case' => $name, 'pass' => $passed, 'status' => $status,
            'expected_status' => $expectedStatus, 'message' => $json['message'] ?? null,
        ], JSON_UNESCAPED_SLASHES) . "\n";
    }
    exit($failed ? 1 : 0);
} finally {
    proc_terminate($server);
    proc_close($server);
}

<?php
require_once __DIR__ . '/../public/smtp-protocol.php';

function assertTrue($condition, string $message): void {
    if (!$condition) throw new RuntimeException($message);
}

function exercise(string $mode, ?array $attachment = null): array {
    $process = proc_open(['php', __DIR__ . '/fake-smtp.php', $mode],
        [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes);
    assertTrue(is_resource($process), 'Fake SMTP failed to start');
    fclose($pipes[0]);
    $port = (int) trim(fgets($pipes[1]));
    assertTrue($port > 0, 'Fake SMTP did not report a port');
    $socket = stream_socket_client("tcp://127.0.0.1:$port", $errno, $error, 5);
    assertTrue($socket !== false, 'Cannot connect to loopback SMTP');
    stream_set_timeout($socket, 5);
    $sent = smtpSend($socket, 'sender@example.org', 'local-pass', 'recipient@example.org',
        'A local delivery test', "<p>Café</p>\r\n.line after newline", 'reply@example.org', $attachment);
    fclose($socket);
    $result = json_decode(stream_get_contents($pipes[1]), true);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[1]); fclose($pipes[2]);
    assertTrue(proc_close($process) === 0, 'Fake SMTP failed: ' . $stderr);
    assertTrue(is_array($result), 'Fake SMTP returned no transcript');
    return [$sent, $result];
}

[$sent, $message] = exercise('accept');
assertTrue($sent, 'Plain message should be accepted');
assertTrue(in_array('QUIT', $message['commands'], true), 'SMTP session must close');
assertTrue(str_contains($message['data'], "Reply-To: reply@example.org\r\n"), 'Reply-To header missing');
assertTrue(str_contains($message['data'], "Content-Transfer-Encoding: quoted-printable\r\n"), 'HTML encoding missing');
assertTrue(str_contains($message['data'], 'Caf=C3=A9'), 'UTF-8 body not quoted-printable encoded');
assertTrue(str_contains($message['data'], "\r\n..line after newline"), 'SMTP dot stuffing missing');
assertTrue(!preg_match('/(?<!\r)\n/', $message['data']), 'SMTP data contains bare LF');
assertTrue(!str_contains($message['data'], 'multipart/mixed'), 'Plain message unexpectedly multipart');

$file = tempnam(sys_get_temp_dir(), 'ogham-attachment-');
file_put_contents($file, "Test attachment\nline two\n");
try {
    [$sent, $message] = exercise('accept', ['tmp_name' => $file, 'name' => 'sample.txt']);
    assertTrue($sent, 'Attachment message should be accepted');
    assertTrue(str_contains($message['data'], 'Content-Type: multipart/mixed; boundary="'), 'Multipart header missing');
    assertTrue(str_contains($message['data'], 'filename="sample.txt"'), 'Attachment filename missing');
    assertTrue(str_contains($message['data'], chunk_split(base64_encode(file_get_contents($file)))), 'Attachment bytes not delivered');
    assertTrue(!preg_match('/(?<!\r)\n/', $message['data']), 'Multipart data contains bare LF');
} finally {
    unlink($file);
}
foreach (['reject_rcpt', 'reject_data'] as $rejection) {
    [$sent] = exercise($rejection);
    assertTrue(!$sent, "SMTP $rejection must not report delivery");
}
echo "SMTP loopback protocol passed (plain, multipart, CRLF, encoding, dot transparency, refusals; no external mail)\n";

<?php
/** SMTP conversation over an already connected socket. No network address is configurable here. */
function smtpReadCode($socket, int $expected): bool {
    do {
        $line = fgets($socket, 512);
        if ($line === false || !preg_match('/^([0-9]{3})([ -])/', $line, $match)) return false;
        $code = (int) $match[1];
    } while ($match[2] === '-');
    return $code === $expected;
}

function smtpSend($socket, string $smtpUser, string $smtpPass, string $to, string $subject,
                  string $body, string $replyTo, ?array $attachment = null): bool {
    if (!smtpReadCode($socket, 220)) return false;
    fwrite($socket, "EHLO oghamtranslations.com\r\n");
    if (!smtpReadCode($socket, 250)) return false;
    fwrite($socket, "AUTH LOGIN\r\n");
    if (!smtpReadCode($socket, 334)) return false;
    fwrite($socket, base64_encode($smtpUser) . "\r\n");
    if (!smtpReadCode($socket, 334)) return false;
    fwrite($socket, base64_encode($smtpPass) . "\r\n");
    if (!smtpReadCode($socket, 235)) return false;
    fwrite($socket, "MAIL FROM: <$smtpUser>\r\n");
    if (!smtpReadCode($socket, 250)) return false;
    fwrite($socket, "RCPT TO: <$to>\r\n");
    if (!smtpReadCode($socket, 250)) return false;
    fwrite($socket, "DATA\r\n");
    if (!smtpReadCode($socket, 354)) return false;

    $message = "Subject: $subject\r\nTo: $to\r\nFrom: $smtpUser\r\nReply-To: $replyTo\r\nMIME-Version: 1.0\r\n";
    if ($attachment !== null) {
        $content = file_get_contents($attachment['tmp_name']);
        if ($content === false) return false;
        $boundary = bin2hex(random_bytes(24));
        $filename = $attachment['name'];
        $message .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n\r\n";
        $message .= "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: quoted-printable\r\n\r\n";
        $message .= quoted_printable_encode($body) . "\r\n\r\n";
        $message .= "--$boundary\r\nContent-Type: application/octet-stream; name=\"$filename\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
        $message .= chunk_split(base64_encode($content)) . "\r\n--$boundary--";
    } else {
        $message .= "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: quoted-printable\r\n\r\n";
        $message .= quoted_printable_encode($body);
    }
    // SMTP DATA uses CRLF and doubles any leading dot, including in body lines.
    $message = preg_replace('/\r\n|\r|\n/', "\r\n", $message);
    $message = preg_replace('/(^|\r\n)\./', '$1..', $message);
    fwrite($socket, $message . "\r\n.\r\n");
    if (!smtpReadCode($socket, 250)) return false;
    fwrite($socket, "QUIT\r\n");
    return smtpReadCode($socket, 221);
}

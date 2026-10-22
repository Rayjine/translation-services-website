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

/** Write the complete SMTP frame; a successful fwrite may consume only part of it. */
function smtpWriteAll($socket, string $data): bool {
    $length = strlen($data);
    for ($offset = 0; $offset < $length;) {
        $written = fwrite($socket, substr($data, $offset));
        if ($written === false || $written === 0) return false;
        $offset += $written;
    }
    return true;
}

/** Encode non-ASCII subject text as folded RFC 2047 words and prevent header injection. */
function smtpSubjectHeader(string $subject): string {
    $subject = trim(preg_replace('/[\r\n\x00-\x1F\x7F]+/', ' ', $subject));
    if (preg_match('/[^\x20-\x7E]/', $subject) !== 1) return $subject;

    // Adjacent encoded words are decoded and concatenated by standard mail clients.
    $words = [];
    foreach (str_split($subject, 45) as $chunk) {
        $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
    }
    return implode("\r\n ", $words);
}

function smtpSend($socket, string $smtpUser, string $smtpPass, string $to, string $subject,
                  string $body, string $replyTo, ?array $attachment = null): bool {
    if (!smtpReadCode($socket, 220)) return false;
    if (!smtpWriteAll($socket, "EHLO oghamtranslations.com\r\n")) return false;
    if (!smtpReadCode($socket, 250)) return false;
    if (!smtpWriteAll($socket, "AUTH LOGIN\r\n")) return false;
    if (!smtpReadCode($socket, 334)) return false;
    if (!smtpWriteAll($socket, base64_encode($smtpUser) . "\r\n")) return false;
    if (!smtpReadCode($socket, 334)) return false;
    if (!smtpWriteAll($socket, base64_encode($smtpPass) . "\r\n")) return false;
    if (!smtpReadCode($socket, 235)) return false;
    if (!smtpWriteAll($socket, "MAIL FROM: <$smtpUser>\r\n")) return false;
    if (!smtpReadCode($socket, 250)) return false;
    if (!smtpWriteAll($socket, "RCPT TO: <$to>\r\n")) return false;
    if (!smtpReadCode($socket, 250)) return false;
    if (!smtpWriteAll($socket, "DATA\r\n")) return false;
    if (!smtpReadCode($socket, 354)) return false;

    $message = "Subject: " . smtpSubjectHeader($subject) . "\r\nTo: $to\r\nFrom: $smtpUser\r\nReply-To: $replyTo\r\nMIME-Version: 1.0\r\n";
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
    if (!smtpWriteAll($socket, $message . "\r\n.\r\n")) return false;
    if (!smtpReadCode($socket, 250)) return false;
    // The server has accepted responsibility for the message at DATA's 250.
    // Do not report failure (and invite a duplicate submission) if QUIT is lost.
    smtpWriteAll($socket, "QUIT\r\n");
    return true;
}

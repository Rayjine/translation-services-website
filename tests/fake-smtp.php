<?php
// Loopback SMTP fixture for tests only. One connection, no relay, no delivery.
$mode = $argv[1] ?? 'accept';
$listener = stream_socket_server('tcp://127.0.0.1:0', $errno, $error);
if (!$listener) exit(2);
echo substr(strrchr(stream_socket_get_name($listener, false), ':'), 1) . "\n";
flush();
$client = stream_socket_accept($listener, 10);
if (!$client) exit(3);
stream_set_timeout($client, 10);
fwrite($client, "220 fake SMTP ready\r\n");
$commands = [];
$data = '';
$step = 0;
$inData = false;
while (($line = fgets($client)) !== false) {
    if ($inData) {
        if ($line === ".\r\n") {
            $inData = false;
            fwrite($client, $mode === 'reject_data' ? "554 rejected\r\n" : "250 queued locally\r\n");
            if ($mode === 'reject_data') break;
            if ($mode === 'quit_disconnect') break;
        } else {
            $data .= $line;
        }
        continue;
    }
    $commands[] = rtrim($line, "\r\n");
    if (str_starts_with($line, 'EHLO ')) fwrite($client, "250-fake.local\r\n250 AUTH LOGIN\r\n");
    elseif (str_starts_with($line, 'AUTH LOGIN')) fwrite($client, "334 VXNlcm5hbWU6\r\n");
    elseif ($step === 0) { $step = 1; fwrite($client, "334 UGFzc3dvcmQ6\r\n"); }
    elseif ($step === 1) { $step = 2; fwrite($client, "235 authenticated\r\n"); }
    elseif (str_starts_with($line, 'MAIL FROM:')) fwrite($client, "250 sender ok\r\n");
    elseif (str_starts_with($line, 'RCPT TO:')) {
        fwrite($client, $mode === 'reject_rcpt' ? "550 recipient rejected\r\n" : "250 recipient ok\r\n");
        if ($mode === 'reject_rcpt') break;
    }
    elseif ($line === "DATA\r\n") { $inData = true; fwrite($client, "354 send data\r\n"); }
    elseif ($line === "QUIT\r\n") { fwrite($client, "221 bye\r\n"); break; }
    else { fwrite($client, "500 unexpected\r\n"); break; }
}
fclose($client);
fclose($listener);
echo json_encode(['commands' => $commands, 'data' => $data], JSON_UNESCAPED_SLASHES) . "\n";

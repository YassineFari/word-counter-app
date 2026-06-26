<?php

function send_mail(string $to, string $subject, string $body): bool {
  require_once __DIR__ . '/../config/mail.php';

  // Log to debug file for testing
  $debug = fopen(MAIL_DEBUG_FILE, 'a');
  fwrite($debug, "[" . date('Y-m-d H:i:s') . "] TO: $to | SUBJECT: $subject\n");
  fwrite($debug, "BODY: $body\n\n");
  fclose($debug);

  // Try sending via PHP mail()
  $headers = "From: " . MAIL_FROM_NAME . " <" . MAIL_FROM . ">\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

  return mail($to, $subject, $body, $headers);
}

<?php
session_start();
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email = trim($input['email'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['error' => 'Please enter a valid email address.']);
  exit;
}

try {
  $pdo = getDB();

  $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :e LIMIT 1');
  $stmt->execute(['e' => $email]);
  $user = $stmt->fetch();

  // Always return success to prevent email enumeration
  // Only send if user exists
  if ($user) {
    // Delete old tokens for this email
    $pdo->prepare('DELETE FROM password_resets WHERE email = :e')->execute(['e' => $email]);

    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', time() + 3600); // 1 hour

    $stmt = $pdo->prepare('INSERT INTO password_resets (email, token, expires_at) VALUES (:e, :t, :ex)');
    $stmt->execute(['e' => $email, 't' => $token, 'ex' => $expires]);

    $resetLink = 'http://localhost:3000/reset-password?token=' . $token;
    $subject = 'Reset Your TextToolsHub Password';
    $body = "<h2>Password Reset Request</h2>
            <p>Click the link below to reset your password. This link expires in 1 hour.</p>
            <p><a href=\"$resetLink\">$resetLink</a></p>
            <p>If you did not request this, please ignore this email.</p>";

    send_mail($email, $subject, $body);
  }

  echo json_encode(['success' => true, 'message' => 'If this email exists, a reset link has been sent.']);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Server error. Please try again.']);
}

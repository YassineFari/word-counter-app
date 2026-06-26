<?php
session_start();
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$token = trim($input['token'] ?? '');
$password = $input['password'] ?? '';

if (strlen($password) < 8) {
  http_response_code(422);
  echo json_encode(['error' => 'Password must be at least 8 characters.']);
  exit;
}

try {
  $pdo = getDB();

  $stmt = $pdo->prepare('SELECT email FROM password_resets WHERE token = :t AND expires_at > NOW() LIMIT 1');
  $stmt->execute(['t' => $token]);
  $row = $stmt->fetch();

  if (!$row) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or expired reset token.']);
    exit;
  }

  $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
  $stmt = $pdo->prepare('UPDATE users SET password = :p WHERE email = :e');
  $stmt->execute(['p' => $hash, 'e' => $row['email']]);

  $pdo->prepare('DELETE FROM password_resets WHERE email = :e')->execute(['e' => $row['email']]);

  echo json_encode(['success' => true, 'message' => 'Password reset successfully. You can now log in.']);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Server error. Please try again.']);
}

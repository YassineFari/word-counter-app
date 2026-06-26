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
$username = trim($input['username'] ?? '');
$email    = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

$errors = [];

if (strlen($username) < 3 || strlen($username) > 50) {
  $errors['username'] = 'Username must be 3-50 characters.';
} elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
  $errors['username'] = 'Username can only contain letters, numbers, and underscores.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = 'Please enter a valid email address.';
}

if (strlen($password) < 8) {
  $errors['password'] = 'Password must be at least 8 characters.';
}

if (!empty($errors)) {
  http_response_code(422);
  echo json_encode(['error' => 'Validation failed', 'fields' => $errors]);
  exit;
}

try {
  $pdo = getDB();

  $stmt = $pdo->prepare('SELECT id, username, email FROM users WHERE username = :u OR email = :e LIMIT 1');
  $stmt->execute(['u' => $username, 'e' => $email]);
  $existing = $stmt->fetch();

  if ($existing) {
    $field = $existing['username'] === $username ? 'username' : 'email';
    http_response_code(409);
    echo json_encode(['error' => 'already_taken', 'message' => "This $field is already registered.", 'field' => $field]);
    exit;
  }

  $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
  $stmt = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (:u, :e, :p)');
  $stmt->execute(['u' => $username, 'e' => $email, 'p' => $hash]);

  $userId = (int) $pdo->lastInsertId();
  $_SESSION['user_id'] = $userId;
  $_SESSION['username'] = $username;

  echo json_encode([
    'success' => true,
    'user' => [
      'id' => $userId,
      'username' => $username,
      'email' => $email,
    ],
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Server error. Please try again.']);
}

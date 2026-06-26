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
$email    = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

$errors = [];

if (empty($email)) {
  $errors['email'] = 'Please enter your email.';
}
if (empty($password)) {
  $errors['password'] = 'Please enter your password.';
}

if (!empty($errors)) {
  http_response_code(422);
  echo json_encode(['error' => 'Validation failed', 'fields' => $errors]);
  exit;
}

try {
  $pdo  = getDB();
  $stmt = $pdo->prepare('SELECT id, username, email, password FROM users WHERE email = :e LIMIT 1');
  $stmt->execute(['e' => $email]);
  $user = $stmt->fetch();

  if (!$user || !password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password.']);
    exit;
  }

  $_SESSION['user_id']  = (int) $user['id'];
  $_SESSION['username'] = $user['username'];

  echo json_encode([
    'success' => true,
    'user' => [
      'id' => $user['id'],
      'username' => $user['username'],
      'email' => $user['email'],
    ],
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Server error. Please try again.']);
}

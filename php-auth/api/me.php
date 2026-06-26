<?php
session_start();
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

if (!isset($_SESSION['user_id'])) {
  http_response_code(401);
  echo json_encode(['error' => 'Not authenticated']);
  exit;
}

try {
  $pdo = getDB();
  $stmt = $pdo->prepare('SELECT id, username, email FROM users WHERE id = :id LIMIT 1');
  $stmt->execute(['id' => $_SESSION['user_id']]);
  $user = $stmt->fetch();

  if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'User not found']);
    exit;
  }

  echo json_encode(['user' => $user]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Server error']);
}

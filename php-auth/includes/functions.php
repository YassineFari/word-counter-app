<?php

function e(string $value): string {
  return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function csrf_token(): string {
  if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  }
  return $_SESSION['csrf_token'];
}

function verify_csrf(string $token): bool {
  return hash_equals($_SESSION['csrf_token'] ?? '', $token);
}

function redirect(string $url): void {
  header('Location: ' . $url);
  exit;
}

function old(string $key, string $default = ''): string {
  return $_SESSION['old'][$key] ?? $default;
}

function error(string $key): string {
  return $_SESSION['errors'][$key] ?? '';
}

function has_error(string $key): bool {
  return isset($_SESSION['errors'][$key]);
}

function set_flash(string $type, string $message): void {
  $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function flash(): ?array {
  $f = $_SESSION['flash'] ?? null;
  unset($_SESSION['flash']);
  return $f;
}

function is_logged_in(): bool {
  return isset($_SESSION['user_id']);
}

function require_login(): void {
  if (!is_logged_in()) {
    set_flash('danger', __('login_required'));
    redirect('login.php');
  }
}

function remember_me(int $userId): void {
  $token = bin2hex(random_bytes(32));
  $expires = time() + 86400 * 30;

  setcookie('remember_token', $token, $expires, '/', '', false, true);

  $hashed = hash('sha256', $token);
  try {
    $pdo  = getDB();
    $stmt = $pdo->prepare('UPDATE users SET remember_token = :token WHERE id = :id');
    $stmt->execute(['token' => $hashed, 'id' => $userId]);
  } catch (PDOException $e) {
    // silently fail – cookie login is a convenience, not a requirement
  }
}

function clear_remember_me(int $userId): void {
  setcookie('remember_token', '', time() - 3600, '/');
  try {
    $pdo  = getDB();
    $stmt = $pdo->prepare('UPDATE users SET remember_token = NULL WHERE id = :id');
    $stmt->execute(['id' => $userId]);
  } catch (PDOException $e) {
    // silently fail
  }
}

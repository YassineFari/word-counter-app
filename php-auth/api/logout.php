<?php
session_start();
require_once __DIR__ . '/cors.php';

$_SESSION = [];
session_destroy();
setcookie(session_name(), '', time() - 3600, '/');

echo json_encode(['success' => true]);

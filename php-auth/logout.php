<?php

session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/lang.php';
require_once __DIR__ . '/includes/functions.php';

if (isset($_SESSION['user_id'])) {
  clear_remember_me($_SESSION['user_id']);
}

$_SESSION = [];

if (ini_get('session.use_cookies')) {
  $p = session_get_cookie_params();
  setcookie(session_name(), '', time() - 3600, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
}

session_destroy();

set_flash('info', __('logout_message'));
redirect('login.php');

<?php

$supported = ['en', 'fr', 'es', 'pt', 'de', 'it'];
$default   = 'en';

// Load from session or cookie
$lang = $_SESSION['lang'] ?? $_COOKIE['lang'] ?? $default;

if (!in_array($lang, $supported)) {
  $lang = $default;
}

// Persist in session
$_SESSION['lang'] = $lang;

// Handle language switch via GET
if (isset($_GET['lang']) && in_array($_GET['lang'], $supported)) {
  $_SESSION['lang'] = $_GET['lang'];
  setcookie('lang', $_GET['lang'], time() + 86400 * 365, '/');
  // Redirect without ?lang= to avoid repeated param
  $uri = strtok($_SERVER['REQUEST_URI'], '?');
  header('Location: ' . $uri);
  exit;
}

$translations = require __DIR__ . "/../lang/{$lang}.php";

function __(string $key): string {
  global $translations;
  return $translations[$key] ?? $key;
}

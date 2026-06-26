<?php

define('MAIL_METHOD', 'smtp'); // 'smtp' or 'mail'
define('MAIL_HOST', 'smtp.gmail.com');
define('MAIL_PORT', 587);
define('MAIL_USER', 'your-email@gmail.com');
define('MAIL_PASS', 'your-app-password');
define('MAIL_FROM', 'noreply@texttoolshub.com');
define('MAIL_FROM_NAME', 'TextToolsHub');

// For local testing without a real mail server
define('MAIL_DEBUG_FILE', __DIR__ . '/../mail_debug.log');

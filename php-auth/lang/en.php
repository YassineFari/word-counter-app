<?php

return [
  // Nav
  'nav_home'          => 'Home',
  'nav_dashboard'     => 'Dashboard',
  'nav_login'         => 'Log In',
  'nav_register'      => 'Register',
  'nav_logout'        => 'Log Out',
  'nav_language'      => 'Language',

  // Home
  'home_title'        => 'Welcome to AuthSystem',
  'home_subtitle'     => 'A secure PHP login & registration system with MySQL.',
  'home_btn_register' => 'Create Account',
  'home_btn_login'    => 'Log In',
  'home_btn_dashboard'=> 'Go to Dashboard',
  'home_btn_logout'   => 'Log Out',
  'home_feature1'     => 'BCRYPT Hashing',
  'home_feature1_desc'=> 'Passwords are hashed with bcrypt (cost 12).',
  'home_feature2'     => 'CSRF Protected',
  'home_feature2_desc'=> 'Every form includes a unique CSRF token.',
  'home_feature3'     => 'PDO Prepared Statements',
  'home_feature3_desc'=> 'All queries use prepared statements to prevent SQL injection.',

  // Register
  'register_title'    => 'Create an Account',
  'register_subtitle' => 'Fill in the form below to register.',
  'register_username' => 'Username',
  'register_email'    => 'Email',
  'register_password' => 'Password',
  'register_confirm'  => 'Confirm Password',
  'register_btn'      => 'Register',
  'register_have_account' => 'Already have an account?',
  'register_login'    => 'Log in',
  'register_success'  => 'Registration successful! Welcome.',
  'register_error_username_length' => 'Username must be between 3 and 50 characters.',
  'register_error_username_chars'  => 'Username may only contain letters, numbers, and underscores.',
  'register_error_email'   => 'Please enter a valid email address.',
  'register_error_password_length' => 'Password must be at least 8 characters.',
  'register_error_password_match'  => 'Passwords do not match.',
  'register_error_username_taken'  => 'This username is already taken.',
  'register_error_email_taken'     => 'This email is already registered.',
  'register_error_db'     => 'A database error occurred. Please try again.',
  'register_error_csrf'   => 'Invalid CSRF token.',

  // Login
  'login_title'       => 'Log In',
  'login_subtitle'    => 'Access your account.',
  'login_email'       => 'Email',
  'login_password'    => 'Password',
  'login_remember'    => 'Remember me',
  'login_btn'         => 'Log In',
  'login_no_account'  => 'Don\'t have an account?',
  'login_register'    => 'Register',
  'login_error_email' => 'Please enter your email.',
  'login_error_password' => 'Please enter your password.',
  'login_error_invalid'  => 'Invalid email or password.',
  'login_error_db'       => 'A database error occurred. Please try again.',
  'login_welcome'     => 'Welcome back',
  'login_required'    => 'Please log in to access this page.',

  // Dashboard
  'dashboard_title'   => 'Dashboard',
  'dashboard_welcome' => 'Welcome',
  'dashboard_logged_in' => 'You are logged in.',
  'dashboard_user_id' => 'User ID',
  'dashboard_username' => 'Username',
  'dashboard_session' => 'Session',
  'dashboard_btn_logout' => 'Log Out',

  // Logout
  'logout_message'    => 'You have been logged out.',

  // Footer
  'footer_rights'     => 'All rights reserved.',

  // Strength meter
  'strength_weak'     => 'Weak',
  'strength_fair'     => 'Fair',
  'strength_good'     => 'Good',
  'strength_strong'   => 'Strong',
  'strength_very_strong' => 'Very strong',
];

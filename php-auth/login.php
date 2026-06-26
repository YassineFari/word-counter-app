<?php

session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/lang.php';
require_once __DIR__ . '/includes/functions.php';

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  if (!verify_csrf($_POST['csrf_token'] ?? '')) {
    die('Invalid CSRF token.');
  }

  $email    = trim($_POST['email'] ?? '');
  $password = $_POST['password'] ?? '';
  $remember = isset($_POST['remember']);

  if (empty($email)) {
    $errors['email'] = __('login_error_email');
  }

  if (empty($password)) {
    $errors['password'] = __('login_error_password');
  }

  if (empty($errors)) {
    try {
      $pdo  = getDB();
      $stmt = $pdo->prepare('SELECT id, username, password FROM users WHERE email = :e LIMIT 1');
      $stmt->execute(['e' => $email]);
      $user = $stmt->fetch();

      if (!$user || !password_verify($password, $user['password'])) {
        $errors['general'] = __('login_error_invalid');
      } else {
        $_SESSION['user_id']  = (int) $user['id'];
        $_SESSION['username'] = $user['username'];

        if ($remember) {
          remember_me($user['id']);
        }

        set_flash('success', __('login_welcome') . ', ' . e($user['username']) . '!');
        redirect('dashboard.php');
      }
    } catch (PDOException $e) {
      $errors['general'] = __('login_error_db');
    }
  }

  $_SESSION['errors'] = $errors;
  $_SESSION['old']    = ['email' => $email];
  redirect('login.php');
}

$pageTitle = __('login_title');
?>
<?php require __DIR__ . '/includes/header.php'; ?>

<div class="card p-4 p-md-5">
  <h1 class="h3 mb-1 text-center"><?= __('login_title') ?></h1>
  <p class="text-muted text-center mb-4"><?= __('login_subtitle') ?></p>

  <?php if ($f = flash()): ?>
    <div class="alert alert-<?= e($f['type']) ?>"><?= e($f['message']) ?></div>
  <?php endif; ?>

  <?php if (!empty($errors['general'])): ?>
    <div class="alert alert-danger"><?= e($errors['general']) ?></div>
  <?php endif; ?>

  <form method="POST" action="" novalidate>
    <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">

    <div class="mb-3">
      <label for="email" class="form-label"><?= __('login_email') ?></label>
      <input type="email" name="email" id="email"
             class="form-control <?= has_error('email') ? 'is-invalid' : '' ?>"
             value="<?= e(old('email')) ?>" required>
      <div class="invalid-feedback"><?= error('email') ?></div>
    </div>

    <div class="mb-3">
      <label for="password" class="form-label"><?= __('login_password') ?></label>
      <div class="password-wrapper">
        <input type="password" name="password" id="password"
               class="form-control <?= has_error('password') ? 'is-invalid' : '' ?>" required>
        <button type="button" class="toggle-pw" onclick="togglePW('password',this)" tabindex="-1">Show</button>
      </div>
      <div class="invalid-feedback"><?= error('password') ?></div>
    </div>

    <div class="mb-4 form-check">
      <input type="checkbox" name="remember" id="remember" class="form-check-input">
      <label for="remember" class="form-check-label"><?= __('login_remember') ?></label>
    </div>

    <button type="submit" class="btn btn-primary w-100 py-2"><?= __('login_btn') ?></button>
  </form>

  <p class="text-center text-muted mt-4 mb-0">
    <?= __('login_no_account') ?> <a href="register.php"><?= __('login_register') ?></a>.
  </p>
</div>

<script>
function togglePW(id, btn) {
  const inp = document.getElementById(id);
  const isPW = inp.type === 'password';
  inp.type = isPW ? 'text' : 'password';
  btn.textContent = isPW ? 'Hide' : 'Show';
}
</script>

<?php
unset($_SESSION['errors'], $_SESSION['old']);
require __DIR__ . '/includes/footer.php';

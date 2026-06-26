<?php

session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/lang.php';
require_once __DIR__ . '/includes/functions.php';

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  if (!verify_csrf($_POST['csrf_token'] ?? '')) {
    die(__('register_error_csrf'));
  }

  $username = trim($_POST['username'] ?? '');
  $email    = trim($_POST['email'] ?? '');
  $password = $_POST['password'] ?? '';
  $confirm  = $_POST['confirm_password'] ?? '';

  if (strlen($username) < 3 || strlen($username) > 50) {
    $errors['username'] = __('register_error_username_length');
  } elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
    $errors['username'] = __('register_error_username_chars');
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = __('register_error_email');
  }

  if (strlen($password) < 8) {
    $errors['password'] = __('register_error_password_length');
  } elseif ($password !== $confirm) {
    $errors['confirm_password'] = __('register_error_password_match');
  }

  if (empty($errors)) {
    try {
      $pdo = getDB();

      $stmt = $pdo->prepare('SELECT id FROM users WHERE username = :u OR email = :e LIMIT 1');
      $stmt->execute(['u' => $username, 'e' => $email]);
      $existing = $stmt->fetch();

      if ($existing) {
        $stmt2 = $pdo->prepare('SELECT username FROM users WHERE username = :u LIMIT 1');
        $stmt2->execute(['u' => $username]);
        if ($stmt2->fetch()) {
          $errors['username'] = __('register_error_username_taken');
        }

        $stmt3 = $pdo->prepare('SELECT id FROM users WHERE email = :e LIMIT 1');
        $stmt3->execute(['e' => $email]);
        if ($stmt3->fetch()) {
          $errors['email'] = __('register_error_email_taken');
        }
      }
    } catch (PDOException $e) {
      $errors['general'] = __('register_error_db');
    }
  }

  if (empty($errors)) {
    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    try {
      $stmt = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (:u, :e, :p)');
      $stmt->execute(['u' => $username, 'e' => $email, 'p' => $hash]);

      $_SESSION['user_id']  = (int) $pdo->lastInsertId();
      $_SESSION['username'] = $username;

      set_flash('success', __('register_success'));
      redirect('dashboard.php');
    } catch (PDOException $e) {
      $errors['general'] = __('register_error_db');
    }
  }

  $_SESSION['errors'] = $errors;
  $_SESSION['old']    = ['username' => $username, 'email' => $email];
  redirect('register.php');
}

$pageTitle = __('register_title');
?>
<?php require __DIR__ . '/includes/header.php'; ?>

<div class="card p-4 p-md-5">
  <h1 class="h3 mb-1 text-center"><?= __('register_title') ?></h1>
  <p class="text-muted text-center mb-4"><?= __('register_subtitle') ?></p>

  <?php if ($f = flash()): ?>
    <div class="alert alert-<?= e($f['type']) ?>"><?= e($f['message']) ?></div>
  <?php endif; ?>

  <?php if (!empty($errors['general'])): ?>
    <div class="alert alert-danger"><?= e($errors['general']) ?></div>
  <?php endif; ?>

  <form method="POST" action="" novalidate>
    <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">

    <div class="mb-3">
      <label for="username" class="form-label"><?= __('register_username') ?></label>
      <input type="text" name="username" id="username"
             class="form-control <?= has_error('username') ? 'is-invalid' : '' ?>"
             value="<?= e(old('username')) ?>" required minlength="3" maxlength="50"
             pattern="[a-zA-Z0-9_]+">
      <div class="invalid-feedback"><?= error('username') ?></div>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label"><?= __('register_email') ?></label>
      <input type="email" name="email" id="email"
             class="form-control <?= has_error('email') ? 'is-invalid' : '' ?>"
             value="<?= e(old('email')) ?>" required>
      <div class="invalid-feedback"><?= error('email') ?></div>
    </div>

    <div class="mb-3">
      <label for="password" class="form-label"><?= __('register_password') ?></label>
      <div class="password-wrapper">
        <input type="password" name="password" id="password"
               class="form-control <?= has_error('password') ? 'is-invalid' : '' ?>"
               required minlength="8">
        <button type="button" class="toggle-pw" onclick="togglePW('password',this)" tabindex="-1">Show</button>
      </div>
      <div class="mt-2">
        <div class="strength-bar w-0" id="strengthBar"></div>
        <small class="text-muted" id="strengthText"></small>
      </div>
      <div class="invalid-feedback"><?= error('password') ?></div>
    </div>

    <div class="mb-4">
      <label for="confirm_password" class="form-label"><?= __('register_confirm') ?></label>
      <div class="password-wrapper">
        <input type="password" name="confirm_password" id="confirm_password"
               class="form-control <?= has_error('confirm_password') ? 'is-invalid' : '' ?>"
               required minlength="8">
        <button type="button" class="toggle-pw" onclick="togglePW('confirm_password',this)" tabindex="-1">Show</button>
      </div>
      <div class="invalid-feedback"><?= error('confirm_password') ?></div>
    </div>

    <button type="submit" class="btn btn-primary w-100 py-2"><?= __('register_btn') ?></button>
  </form>

  <p class="text-center text-muted mt-4 mb-0">
    <?= __('register_have_account') ?> <a href="login.php"><?= __('register_login') ?></a>.
  </p>
</div>

<script>
function togglePW(id, btn) {
  const inp = document.getElementById(id);
  const isPW = inp.type === 'password';
  inp.type = isPW ? 'text' : 'password';
  btn.textContent = isPW ? 'Hide' : 'Show';
}

const strengthLabels = [
  '', '<?= __('strength_weak') ?>', '<?= __('strength_fair') ?>',
  '<?= __('strength_good') ?>', '<?= __('strength_strong') ?>',
  '<?= __('strength_very_strong') ?>'
];

document.getElementById('password').addEventListener('input', function () {
  const v = this.value;
  const bar = document.getElementById('strengthBar');
  const txt = document.getElementById('strengthText');
  let score = 0;
  if (v.length >= 8) score++;
  if (v.length >= 12) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[a-z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const map = [
    { w: '0%',  c: '#e5e7eb' },
    { w: '20%', c: '#ef4444' },
    { w: '40%', c: '#f97316' },
    { w: '60%', c: '#eab308' },
    { w: '80%', c: '#22c55e' },
    { w: '100%',c: '#16a34a' },
  ];
  const idx = Math.min(score, 5);
  bar.style.width = map[idx].w;
  bar.style.background = map[idx].c;
  txt.textContent = strengthLabels[idx];
});
</script>

<?php
unset($_SESSION['errors'], $_SESSION['old']);
require __DIR__ . '/includes/footer.php';

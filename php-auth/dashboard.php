<?php

session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/lang.php';
require_once __DIR__ . '/includes/functions.php';

require_login();

$pageTitle = __('dashboard_title');
?>
<?php require __DIR__ . '/includes/header.php'; ?>

<div class="card p-4 p-md-5 text-center">
  <?php if ($f = flash()): ?>
    <div class="alert alert-<?= e($f['type']) ?>"><?= e($f['message']) ?></div>
  <?php endif; ?>

  <div class="mb-4">
    <div class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
         style="width:72px;height:72px;font-size:1.75rem;font-weight:700;">
      <?= e(strtoupper($_SESSION['username'][0])) ?>
    </div>
  </div>

  <h1 class="h3 mb-1"><?= __('dashboard_welcome') ?>, <?= e($_SESSION['username']) ?>!</h1>
  <p class="text-muted"><?= __('dashboard_logged_in') ?></p>

  <hr class="my-4">

  <div class="table-responsive">
    <table class="table table-bordered text-start mb-0">
      <tbody>
        <tr><th class="bg-light" style="width:140px"><?= __('dashboard_user_id') ?></th><td><?= e((string) $_SESSION['user_id']) ?></td></tr>
        <tr><th class="bg-light"><?= __('dashboard_username') ?></th><td><?= e($_SESSION['username']) ?></td></tr>
        <tr><th class="bg-light"><?= __('dashboard_session') ?></th><td><?= session_id() ?></td></tr>
      </tbody>
    </table>
  </div>

  <a href="logout.php" class="btn btn-outline-danger mt-4"><?= __('dashboard_btn_logout') ?></a>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>

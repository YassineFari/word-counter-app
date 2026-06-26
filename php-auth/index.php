<?php

session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/lang.php';
require_once __DIR__ . '/includes/functions.php';

$pageTitle = __('nav_home');
?>
<?php require __DIR__ . '/includes/header.php'; ?>

<div class="card p-4 p-md-5 text-center">
  <h1 class="h3 mb-2"><?= __('home_title') ?></h1>
  <p class="text-muted mb-4"><?= __('home_subtitle') ?></p>

  <?php if ($f = flash()): ?>
    <div class="alert alert-<?= e($f['type']) ?>"><?= e($f['message']) ?></div>
  <?php endif; ?>

  <div class="d-flex justify-content-center gap-3 flex-wrap">
    <?php if (is_logged_in()): ?>
      <a href="dashboard.php" class="btn btn-primary px-4"><?= __('home_btn_dashboard') ?></a>
      <a href="logout.php" class="btn btn-outline-danger px-4"><?= __('home_btn_logout') ?></a>
    <?php else: ?>
      <a href="register.php" class="btn btn-primary px-4"><?= __('home_btn_register') ?></a>
      <a href="login.php" class="btn btn-outline-primary px-4"><?= __('home_btn_login') ?></a>
    <?php endif; ?>
  </div>

  <hr class="my-4">

  <div class="row text-start g-3">
    <div class="col-sm-4">
      <div class="p-3 rounded bg-light">
        <h6 class="fw-semibold"><?= __('home_feature1') ?></h6>
        <small class="text-muted"><?= __('home_feature1_desc') ?></small>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="p-3 rounded bg-light">
        <h6 class="fw-semibold"><?= __('home_feature2') ?></h6>
        <small class="text-muted"><?= __('home_feature2_desc') ?></small>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="p-3 rounded bg-light">
        <h6 class="fw-semibold"><?= __('home_feature3') ?></h6>
        <small class="text-muted"><?= __('home_feature3_desc') ?></small>
      </div>
    </div>
  </div>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>

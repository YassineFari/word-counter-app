<!DOCTYPE html>
<html lang="<?= $_SESSION['lang'] ?? 'en' ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= e($pageTitle ?? 'User Authentication') ?></title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css">
  <style>
    body { background: #f0f4f8; min-height: 100vh; display: flex; flex-direction: column; }
    .navbar { background: #2563eb !important; }
    .card { border: none; border-radius: 1rem; box-shadow: 0 4px 24px rgba(0,0,0,.06); }
    .btn-primary { background: #2563eb; border-color: #2563eb; }
    .btn-primary:hover { background: #1d4ed8; border-color: #1d4ed8; }
    .form-control:focus { border-color: #2563eb; box-shadow: 0 0 0 .2rem rgba(37,99,235,.2); }
    .password-wrapper { position: relative; }
    .password-wrapper .toggle-pw { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #6b7280; font-size: .85rem; padding: 0; line-height: 1; }
    .strength-bar { height: 4px; border-radius: 4px; transition: width .3s, background .3s; }
    footer { margin-top: auto; }
    .lang-btn { background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25); color: #fff; font-size: .8rem; padding: .3rem .7rem; border-radius: .375rem; cursor: pointer; transition: all .2s; display:flex;align-items:center;gap:5px; }
    .lang-btn:hover, .lang-btn:focus { background: rgba(255,255,255,.25); outline:none; }
    .lang-dropdown { min-width: 170px; border: none; border-radius: .5rem; box-shadow: 0 4px 20px rgba(0,0,0,.12); padding: .4rem; margin-top: .35rem !important; }
    .lang-dropdown .dropdown-item { font-size: .85rem; border-radius: .35rem; padding: .45rem .7rem; color: #1f2937 !important; display:flex;align-items:center;gap:8px; }
    .lang-dropdown .dropdown-item:hover { background: #f0f4ff; }
    .lang-dropdown .dropdown-item.active { background: #2563eb; color: #fff !important; font-weight:600; }
    .dropdown-toggle::after { margin-left: auto; }
  </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark">
  <div class="container">
    <a class="navbar-brand fw-bold" href="index.php">AuthSystem</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav ms-auto align-items-lg-center gap-1">
        <?php if (is_logged_in()): ?>
          <li class="nav-item"><a class="nav-link" href="dashboard.php"><?= __('nav_dashboard') ?></a></li>
          <li class="nav-item"><a class="nav-link" href="logout.php"><?= __('nav_logout') ?></a></li>
        <?php else: ?>
          <li class="nav-item"><a class="nav-link" href="login.php"><?= __('nav_login') ?></a></li>
          <li class="nav-item"><a class="nav-link" href="register.php"><?= __('nav_register') ?></a></li>
        <?php endif; ?>
        <li class="nav-item dropdown">
          <button class="lang-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <?php
            $fi = ['en'=>'gb','fr'=>'fr','es'=>'es','pt'=>'pt','de'=>'de','it'=>'it'];
            $lang = $_SESSION['lang'] ?? 'en';
            ?>
            <span class="fi fi-<?= $fi[$lang] ?? 'gb' ?> fis"></span>
            <?= strtoupper($lang) ?>
          </button>
          <ul class="dropdown-menu dropdown-menu-end lang-dropdown">
            <li><a class="dropdown-item <?= $lang === 'en' ? 'active' : '' ?>" href="?lang=en"><span class="fi fi-gb fis"></span> English</a></li>
            <li><a class="dropdown-item <?= $lang === 'fr' ? 'active' : '' ?>" href="?lang=fr"><span class="fi fi-fr fis"></span> Français</a></li>
            <li><a class="dropdown-item <?= $lang === 'es' ? 'active' : '' ?>" href="?lang=es"><span class="fi fi-es fis"></span> Español</a></li>
            <li><a class="dropdown-item <?= $lang === 'pt' ? 'active' : '' ?>" href="?lang=pt"><span class="fi fi-pt fis"></span> Português</a></li>
            <li><a class="dropdown-item <?= $lang === 'de' ? 'active' : '' ?>" href="?lang=de"><span class="fi fi-de fis"></span> Deutsch</a></li>
            <li><a class="dropdown-item <?= $lang === 'it' ? 'active' : '' ?>" href="?lang=it"><span class="fi fi-it fis"></span> Italiano</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

<main class="container py-5">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">

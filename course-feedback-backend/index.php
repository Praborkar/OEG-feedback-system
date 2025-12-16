<?php

// ✅ LOAD COMPOSER AUTOLOADER (CRITICAL)
require_once __DIR__ . '/vendor/autoload.php';

// ✅ LOAD ENV VARIABLES
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// ================= HEADERS =================
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// ✅ Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ================= ROUTING =================

// Normalize URI (remove trailing slash)
$uri = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$method = $_SERVER['REQUEST_METHOD'];

// Controllers
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/FeedbackController.php';
require_once __DIR__ . '/controllers/AdminController.php';

/* ================= AUTH ================= */

if ($uri === '/api/auth/signup' && $method === 'POST') {
    AuthController::signup();
    exit;
}

if ($uri === '/api/auth/login' && $method === 'POST') {
    AuthController::login();
    exit;
}

/* ================= FEEDBACK ================= */

if ($uri === '/api/feedback' && $method === 'POST') {
    FeedbackController::submit();
    exit;
}

/* ================= ADMIN (JWT PROTECTED) ================= */

if ($uri === '/api/admin/feedback' && $method === 'GET') {
    AdminController::feedback();
    exit;
}

if ($uri === '/api/admin/stats' && $method === 'GET') {
    AdminController::stats();
    exit;
}

/* ================= 404 ================= */

http_response_code(404);
echo json_encode([
    "success" => false,
    "message" => "Route not found"
]);
exit;

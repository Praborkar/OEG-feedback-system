<?php

require_once __DIR__ . '/../config/jwt.php';

function authGuard() {
    $headers = getallheaders();

    if (empty($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Authorization header missing"
        ]);
        exit;
    }

    if (!preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Invalid Authorization format"
        ]);
        exit;
    }

    try {
        // 🔐 Decoded token object
        return verifyJWT($matches[1]);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Invalid or expired token"
        ]);
        exit;
    }
}

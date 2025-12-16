<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../vendor/autoload.php';

const JWT_SECRET = "super_secret_key_123";
const JWT_ISSUER = "course-feedback-api";
const JWT_EXPIRY = 86400;

function generateJWT($adminId) {
    return JWT::encode([
        "iss" => JWT_ISSUER,
        "iat" => time(),
        "exp" => time() + JWT_EXPIRY,
        "sub" => $adminId
    ], JWT_SECRET, "HS256");
}

function verifyJWT($token) {
    return JWT::decode($token, new Key(JWT_SECRET, "HS256"));
}

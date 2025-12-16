<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt.php';

class AuthController {

    public static function signup() {
        $data = json_decode(file_get_contents("php://input"), true);

        // ✅ SIMPLE VALIDATION (EASY MODE)
        if (empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Email and password required"
            ]);
            exit;
        }

        $db = Database::connect();

        // Prevent duplicate admin accounts
        $check = $db->prepare("SELECT id FROM admins WHERE email = ?");
        $check->execute([$data['email']]);

        if ($check->fetch()) {
            http_response_code(409);
            echo json_encode([
                "success" => false,
                "message" => "Admin already exists"
            ]);
            exit;
        }

        $stmt = $db->prepare(
            "INSERT INTO admins (email, password) VALUES (?, ?)"
        );

        $stmt->execute([
            $data['email'],
            password_hash($data['password'], PASSWORD_BCRYPT)
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Admin created"
        ]);
    }

    public static function login() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Email and password required"
            ]);
            exit;
        }

        $db = Database::connect();

        $stmt = $db->prepare("SELECT * FROM admins WHERE email = ?");
        $stmt->execute([$data['email']]);
        $admin = $stmt->fetch();

        if (!$admin || !password_verify($data['password'], $admin['password'])) {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Invalid login"
            ]);
            exit;
        }

        echo json_encode([
            "success" => true,
            "token" => generateJWT([
                "id" => $admin['id'],
                "email" => $admin['email']
            ])
        ]);
    }
}

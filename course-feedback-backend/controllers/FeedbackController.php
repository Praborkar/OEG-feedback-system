<?php

require_once __DIR__ . '/../config/database.php';

class FeedbackController {

    public static function submit() {
        $data = json_decode(file_get_contents("php://input"), true);

        // ✅ Validate rating
        if (!isset($data['rating']) || $data['rating'] < 1 || $data['rating'] > 5) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Rating is required (1–5)"
            ]);
            exit;
        }

        // ✅ Validate required fields
        if (empty($data['video_id']) || empty($data['session_id'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "video_id and session_id are required"
            ]);
            exit;
        }

        $db = Database::connect();

        // 🔧 FIX: use `feedback` column (not `comment`)
        $stmt = $db->prepare(
            "INSERT INTO feedback (rating, feedback, video_id, session_id)
             VALUES (?, ?, ?, ?)"
        );

        $stmt->execute([
            $data['rating'],
            $data['comment'] ?? null, // frontend sends `comment`
            $data['video_id'],
            $data['session_id']
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Feedback submitted"
        ]);
    }
}

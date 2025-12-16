<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

class AdminController {

    public static function feedback() {
        authGuard();
        $db = Database::connect();

        $query = "SELECT rating, feedback, video_id, session_id, created_at FROM feedback WHERE 1=1";
        $params = [];

        if (!empty($_GET['rating'])) {
            $query .= " AND rating = ?";
            $params[] = $_GET['rating'];
        }

        if (!empty($_GET['from_date']) && !empty($_GET['to_date'])) {
            $query .= " AND created_at BETWEEN ? AND ?";
            $params[] = $_GET['from_date'];
            $params[] = $_GET['to_date'];
        }

        $query .= " ORDER BY created_at DESC";

        $stmt = $db->prepare($query);
        $stmt->execute($params);

        echo json_encode([
            "success" => true,
            "data" => $stmt->fetchAll()
        ]);
    }

    public static function stats() {
        authGuard();
        $db = Database::connect();

        $ratings = $db->query(
            "SELECT rating FROM feedback ORDER BY rating"
        )->fetchAll(PDO::FETCH_COLUMN);

        $count = count($ratings);
        $average = $count ? array_sum($ratings) / $count : 0;

        $median = 0;
        if ($count > 0) {
            $mid = intdiv($count, 2);
            $median = $count % 2
                ? $ratings[$mid]
                : ($ratings[$mid - 1] + $ratings[$mid]) / 2;
        }

        echo json_encode([
            "success" => true,
            "data" => [
                "total_feedback" => $count,
                "average_rating" => round($average, 2),
                "median_rating" => $median
            ]
        ]);
    }
}

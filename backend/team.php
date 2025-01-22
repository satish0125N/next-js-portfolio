<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type, Accept');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Read the JSON file
$jsonData = file_get_contents('team.json');

if ($jsonData === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to read team data']);
    exit;
}

// Return the JSON data
echo $jsonData;

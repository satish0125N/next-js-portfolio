<?php
// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Static Bearer token
$staticToken = 'backend_static_token';

// Get the Authorization header
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized: No token provided']);
    exit;
}

// Check if the token is valid
$authHeader = $headers['Authorization'];
$bearerToken = str_replace('Bearer ', '', $authHeader);

if ($bearerToken !== $staticToken) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden: Invalid token']);
    exit;
}

// Read the project data from JSON file
$projects = file_get_contents('projects.json');
$projectsData = json_decode($projects, true);

// Check if an ID parameter is passed
if (isset($_GET['id'])) {
    $projectId = $_GET['id'];

    // Search for the project with the given ID
    $filteredProjects = array_filter($projectsData, function ($project) use ($projectId) {
        return $project['id'] == $projectId;
    });

    if (!empty($filteredProjects)) {
        echo json_encode(array_values($filteredProjects));
    } else {
        echo json_encode(['error' => 'Project not found']);
    }
} else {
    // Return all projects
    echo json_encode($projectsData);
}

exit;

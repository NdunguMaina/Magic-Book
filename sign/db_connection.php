<?php
// Database connection settings
$host = 'localhost';
$dbname = 'magicbook'; // Database name
$username = 'root'; // Default XAMPP MySQL username
$password = ''; // Default XAMPP MySQL password (leave empty if no password)

// Create a new PDO connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Display error message if connection fails
    die("Database connection failed: " . $e->getMessage());
}
?>

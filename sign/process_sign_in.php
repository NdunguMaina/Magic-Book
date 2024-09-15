<?php
session_start();
include 'db_connection.php'; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Retrieve user data from the database
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        // Store user information in the session
        $_SESSION['user'] = ['email' => $user['email']];
        $_SESSION['signedIn'] = true;

        // Redirect to the home page after successful login
        header('Location:https://ndungumaina.github.io/Magic-Book/');
    } else {
        // Invalid credentials
        echo "<script>alert('Invalid email or password');window.location.href='index.php';</script>";
    }
}
?>

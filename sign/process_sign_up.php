<?php
session_start();
include 'db_connection.php'; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $phoneNumber = $_POST['phoneNumber'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // Validate that passwords match
    if ($password !== $confirmPassword) {
        echo "<script>alert('Passwords do not match');window.location.href='sign_up.php';</script>";
        exit();
    }

    // Hash the password before storing it
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check if the email already exists
    $checkEmail = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $checkEmail->execute(['email' => $email]);

    if ($checkEmail->rowCount() > 0) {
        echo "<script>alert('Email already exists');window.location.href='sign_up.php';</script>";
        exit();
    }

    // Insert user data into the database
    $sql = "INSERT INTO users (email, phoneNumber, password) VALUES (:email, :phoneNumber, :password)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email, 'phoneNumber' => $phoneNumber, 'password' => $hashedPassword]);

    $_SESSION['user'] = ['email' => $email];
    $_SESSION['signedIn'] = true;

    // Redirect to the login page
    header('Location: https://ndungumaina.github.io/Magic-Book/');
    exit();
}
?>

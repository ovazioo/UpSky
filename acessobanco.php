<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "UpskyCadastro";

// Primeiro conecta sem especificar banco
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Cria o banco caso não exista
$conn->query("CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

// Seleciona o banco
$conn->select_db($dbname);

// Cria a tabela de cadastro caso não exista
$sql = "CREATE TABLE IF NOT EXISTS cadastro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    nome_completo VARCHAR(255),
    data_nascimento DATE,
    senha VARCHAR(255) NOT NULL
    
)";
$conn->query($sql);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome_usuario = trim($_POST['nome_usuario'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $senha = $_POST['senha'] ?? '';
    $nome_completo = trim($_POST['nome_completo'] ?? '');
    $data_nascimento = trim($_POST['data_nascimento'] ?? '');

    if (strlen($senha) < 8) die("A senha deve ter pelo menos 8 caracteres.");
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) die("Email inválido.");

    $hash = password_hash($senha, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO cadastro (email, nome_usuario, nome_completo, data_nascimento, senha) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $email, $nome_usuario, $nome_completo, $data_nascimento, $hash);

    if ($stmt->execute()) {
        header("location: index.html");
        exit;
    } else {
        echo "Erro ao cadastrar: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Função para verificar se o usuário já existe
function checkUserExists($email, $conn) {
    $sql = "SELECT * FROM Reconhecimento WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0;
}

// Processar requisições
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];

    // Login
    if ($action == "login") {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM Reconhecimento WHERE email=? AND senha=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo "success";
        } else {
            echo "error";
        }
    }

    // Cadastro
    elseif ($action == "register") {
        $nome = $_POST['nome'];
        $idade = $_POST['idade'];
        $email = $_POST['email'];
        $daltonismo = $_POST['daltonismo'];
        $senha = $_POST['senha'];

        if (checkUserExists($email, $conn)) {
            echo "exists";
        } else {
            $sql = "INSERT INTO Reconhecimento (nome, idade, email, daltonismo, senha) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sisss", $nome, $idade, $email, $daltonismo, $senha);
            if ($stmt->execute()) {
                echo "success";
            } else {
                echo "error";
            }
        }
    }

    // Alterar dados
    elseif ($action == "update") {
        $nome = $_POST['nome'];
        $idade = $_POST['idade'];
        $email = $_POST['email'];
        $daltonismo = $_POST['daltonismo'];
        $senha = $_POST['senha'];

        $sql = "UPDATE Reconhecimento SET nome=?, idade=?, daltonismo=?, senha=? WHERE email=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sisss", $nome, $idade, $daltonismo, $senha, $email);
        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "error";
        }
    }

    // Deletar usuário
    elseif ($action == "delete") {
        $email = $_POST['email'];

        $sql = "DELETE FROM Reconhecimento WHERE email=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "error";
        }
    }

    $stmt->close();
    $conn->close();
}
?>

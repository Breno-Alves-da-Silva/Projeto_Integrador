<?php
header('Content-Type: text/html; charset=UTF-8');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start(); // Iniciar a sessão

$servername = "localhost";
$username = "tdssl222n_brenoalves"; // Nome de usuário do banco de dados
$password = "BvBSIin47NWvBcR"; // Senha do banco de dados
$dbname = "tdssl222n_brenoalves";

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
            $user = $result->fetch_assoc();
            $_SESSION['user_id'] = $user['id']; // Armazena o ID do usuário na sessão
            $_SESSION['email'] = $user['email']; // Armazena o email do usuário na sessão
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
        $tipoDaltonismo = $_POST['tipoDaltonismo'];
        $senha = $_POST['senha'];

        if (checkUserExists($email, $conn)) {
            echo "exists";
        } else {
            $sql = "INSERT INTO Reconhecimento (nome, idade, email, tipoDaltonismo, senha) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssss", $nome, $idade, $email, $tipoDaltonismo, $senha);
            if ($stmt->execute()) {
                echo "success";
            } else {
                echo "error";
            }
        }
    }

    // Recuperar detalhes do usuário para o perfil
    elseif ($action == "getUserDetails") {
        if (!isset($_SESSION['user_id'])) {
            echo json_encode(["error" => "Usuário não autenticado"]);
            exit;
        }

        $user_id = $_SESSION['user_id'];

        $sql = "SELECT nome, idade, email, tipoDaltonismo FROM Reconhecimento WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Usuário não encontrado"]);
        }
        exit;
    }

    // Alterar dados
    elseif ($action == "update") {
        if (!isset($_SESSION['user_id'])) {
            echo "Usuário não autenticado";
            exit;
        }

        $nome = $_POST['nome'];
        $idade = $_POST['idade'];
        $email = $_POST['email'];
        $tipoDaltonismo = $_POST['tipoDaltonismo'];
        $senha = $_POST['senha'];
        $user_id = $_SESSION['user_id'];

        $sql = "UPDATE Reconhecimento SET nome=?, idade=?, email=?, tipoDaltonismo=?, senha=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi", $nome, $idade, $email, $tipoDaltonismo, $senha, $user_id);

        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "error: " . $stmt->error;
        }
    }

    // Deletar usuário
    elseif ($action == "delete") {
        if (!isset($_SESSION['user_id'])) {
            echo "Usuário não autenticado";
            exit;
        }

        $user_id = $_SESSION['user_id'];

        $sql = "DELETE FROM Reconhecimento WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        if ($stmt->execute()) {
            echo "success";
            session_destroy(); // Destruir a sessão após a exclusão do usuário
        } else {
            echo "error";
        }
    }

    $stmt->close();
    $conn->close();
}
?>

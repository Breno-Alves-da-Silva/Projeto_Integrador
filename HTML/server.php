
<?php
// Configurações do banco de dados
$servername = "localhost"; // Nome do servidor MySQL
$username = "tdssl222n_brenoalves"; // Nome de usuário do banco de dados
$password = "BvBSIin47NWvBcR"; // Senha do banco de dados
$dbname = "tdssl222n_brenoalves"; // Nome do banco de dados

// Cria conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    // Se houver erro na conexão, exibe mensagem de erro e interrompe o script
    die("Connection failed: " . $conn->connect_error);
}

// Define o cabeçalho para JSON
header('Content-Type: application/json');

// Lê os dados da solicitação recebida como JSON e converte para array associativo
$input = json_decode(file_get_contents('php://input'), true);

// Verifica se há uma ação especificada na URL (ex: ?action=register)
if (isset($_GET['action'])) {
    $action = $_GET['action']; // Obtém o valor da ação

    // Ação para registrar um novo usuário
    if ($action == 'register') {
        $nome = $input['nome']; // Obtém o nome de usuário do input JSON
        $senha = senha_hash($input['senha'], senha_DEFAULT); // Cria um hash da senha fornecida
        $email = $input['email']; // Obtém o email do input JSON
        $tipoDaltonismo = $input['tipoDaltonismo'];
        $idade = $input['idade'];

        // Verifica se o nome de usuário já existe no banco de dados
        $stmt = $conn->prepare("SELECT * FROM users WHERE nome=?");
        $stmt->bind_param("s", $nome);
        $stmt->execute();
        $result = $stmt->get_result();

        // Se o nome de usuário já estiver em uso, retorna mensagem de erro
        if ($result->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'nome already exists']);
        } else {
            // Insere um novo usuário no banco de dados
            $stmt = $conn->prepare("INSERT INTO users (nome, senha, email, tipoDaltonismo, idade) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $nome, $senha, $email, $tipoDaltonismo, $idade);
            
            // Verifica se a inserção foi bem-sucedida e retorna mensagem correspondente
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Registration successful']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
            }
        }
        $stmt->close(); // Fecha a declaração preparada
    } 
    // Ação para realizar login de usuário
    elseif ($action == 'login') {
        $email = $input['email']; // Obtém o nome de usuário do input JSON
        $senha = $input['senha']; // Obtém a senha do input JSON

        // Verifica se o nome de usuário e a senha estão corretos
        $stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        // Se encontrar o usuário no banco de dados
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc(); // Obtém os dados do usuário como um array associativo
            // Verifica se a senha fornecida corresponde à senha armazenada (usando função senha_verify)
            if (senha_verify($senha, $user['senha'])) {
                echo json_encode(['success' => true, 'message' => 'Login successful', 'email' => $user['email']]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Incorrect senha']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'E-mail not found']);
        }
        $stmt->close(); // Fecha a declaração preparada
    } 
    // Ação para atualizar dados do usuário
    elseif ($action == 'update') {
        $nome = $input['nome']; // Obtém o nome de usuário do input JSON
        $senha = senha_hash($input['senha'], senha_DEFAULT); // Cria um novo hash da senha
        $email = $input['email']; // Obtém o email do input JSON
        $tipoDaltonismo = $input['tipoDaltonismo']; // Obtém a deficiência
        $idade = $input['idade']; // Obtém a idade

        // Atualiza os dados do usuário no banco de dados
        $stmt = $conn->prepare("UPDATE users SET senha=?, email=?, tipoDaltonismo=?, idade=? WHERE nome=?");
        $stmt->bind_param("sssss", $senha, $email, $nome, $tipoDaltonismo, $idade);
        
        // Verifica se a atualização foi bem-sucedida e retorna mensagem correspondente
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Update successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
        }
        $stmt->close(); // Fecha a declaração preparada
    } 
    // Ação para deletar um usuário
    elseif ($action == 'delete') {
        $nome = $input['nome']; // Obtém o nome de usuário do input JSON

        // Deleta o usuário do banco de dados
        $stmt = $conn->prepare("DELETE FROM users WHERE nome=?");
        $stmt->bind_param("s", $nome);
        
        // Verifica se a exclusão foi bem-sucedida e retorna mensagem correspondente
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
        }
        $stmt->close(); // Fecha a declaração preparada
    }
}

$conn->close(); // Fecha a conexão com o banco de dados
?>

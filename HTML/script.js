// Função para manipular requisições ao servidor
function sendRequest(action, data, callback) {
    const params = new URLSearchParams({ action, ...data });
    fetch('server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    })
    .then(response => response.text())
    .then(callback)
    .catch(error => console.error('Erro:', error));
}

// Manipulação do formulário de login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    sendRequest("login", { email, password }, function(data) {
        if (data === "success") {
            window.location.href = 'telaPrincipal.html';
        } else {
            alert("Login falhou!");
        }
    });
});

// Manipulação do formulário de cadastro
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("username").value;
    const idade = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const daltonismo = document.getElementById("colorBlindnessType").value;
    const senha = document.getElementById("password").value;

    sendRequest("register", { nome, idade, email, daltonismo, senha }, function(data) {
        if (data === "success") {
            alert("Cadastro realizado com sucesso!");
            window.location.href = 'login.html';
        } else if (data === "exists") {
            alert("Usuário já cadastrado!");
        } else {
            alert("Erro no cadastro!");
        }
    });
});

// Carregar dados do usuário no perfil
document.addEventListener("DOMContentLoaded", function() {
    const email = "usuario_logado_email@example.com"; // Substituir com o email do usuário logado

    sendRequest("getUserDetails", { email }, function(data) {
        const userDetails = JSON.parse(data);
        document.getElementById("userName").textContent = userDetails.nome;
        document.getElementById("userEmail").textContent = userDetails.email;
        document.getElementById("userAge").textContent = userDetails.idade;
        document.getElementById("userDaltonismo").textContent = userDetails.daltonismo;
    });

    // Deletar usuário
    document.getElementById("deleteUserBtn").addEventListener("click", function() {
        if (confirm("Tem certeza que deseja deletar sua conta?")) {
            sendRequest("delete", { email }, function(data) {
                if (data === "success") {
                    alert("Conta deletada com sucesso!");
                    window.location.href = 'login.html';
                } else {
                    alert("Erro ao deletar a conta!");
                }
            });
        }
    });

    // Alterar usuário
    document.getElementById("updateUserBtn").addEventListener("click", function() {
        window.location.href = 'alterarDados.html';
    });
});

// Manipulação do formulário de atualização de dados
document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("updateUsername").value;
    const idade = document.getElementById("updateAge").value;
    const email = document.getElementById("updateEmail").value;
    const daltonismo = document.getElementById("updateColorBlindnessType").value;
    const senha = document.getElementById("updatePassword").value;

    sendRequest("update", { nome, idade, email, daltonismo, senha }, function(data) {
        if (data === "success") {
            alert("Dados alterados com sucesso!");
            window.location.href = 'perfil.html';
        } else {
            alert("Erro ao alterar os dados!");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
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
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
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
    }

    // Manipulação do formulário de cadastro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById("username").value;
            const idade = document.getElementById("age").value;
            const email = document.getElementById("email").value;
            const tipoDaltonismo = document.getElementById("colorBlindnessType").value;
            const senha = document.getElementById("password").value;

            sendRequest("register", { nome, idade, email, tipoDaltonismo, senha }, function(data) {
                if (data === "success") {
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = 'index.html';
                } else if (data === "exists") {
                    alert("Usuário já cadastrado!");
                } else {
                    alert("Erro no cadastro!");
                }
            });
        });
    }

    // Carregar dados do usuário no perfil
    const userProfile = document.getElementById("userDetails");
    if (userProfile) {
        sendRequest("getUserDetails", {}, function(data) {
            const userDetails = JSON.parse(data);
            if (!userDetails.error) {
                document.getElementById("userName").textContent = userDetails.nome;
                document.getElementById("userEmail").textContent = userDetails.email;
                document.getElementById("userAge").textContent = userDetails.idade;
                document.getElementById("userDaltonismo").textContent = userDetails.tipoDaltonismo;
            } else {
                alert(userDetails.error);
            }
        });

        // Deletar usuário
        const deleteUserBtn = document.getElementById("deleteUserBtn");
        if (deleteUserBtn) {
            deleteUserBtn.addEventListener("click", function() {
                if (confirm("Tem certeza que deseja deletar sua conta?")) {
                    sendRequest("delete", {}, function(data) {
                        if (data === "success") {
                            alert("Conta deletada com sucesso!");
                            window.location.href = 'index.html';
                        } else {
                            alert("Erro ao deletar a conta!");
                        }
                    });
                }
            });
        }

        // Alterar usuário
        const updateUserBtn = document.getElementById("updateUserBtn");
        if (updateUserBtn) {
            updateUserBtn.addEventListener("click", function() {
                window.location.href = 'alterarDados.html';
            });
        }
    }

    // Manipulação do formulário de atualização de dados
    const updateForm = document.getElementById("updateForm");
    if (updateForm) {
        updateForm.addEventListener("submit", function(event) {
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
    }
});

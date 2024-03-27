// User Form = Pega os dados do formulário e envia para o Banco de Dados
const userForm = document.getElementById('user-form')

// User List = Mostra os dados do Banco de Dados
const userList = document.getElementById('user-list')

function listUsers(){
    fetch('http://localhost:3000/usuarios')
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = ''
            data.forEach(user => {
                const li = document.createElement('li')
                li.innerHTML = `${user.nome} - Idade: ${user.idade} - Email: ${user.email} - Tipo de Daltonismo: ${user.tipodeDaltonismo}`
                userList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

userForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const nome     = document.getElementById('nome').value
    const idade       = document.getElementById('idade').value
    const email    = document.getElementById('email').value
    const tipodeDaltonismo    = document.getElementById('email').value
    const senha    = document.getElementById('senha').value

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, idade: idade, email: email,tipodeDaltonismo: tipodeDaltonismo,senha: senha }),
    })
        .then(response => response.json())
        .then(() => {
            listUsers()
            userForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

listUsers()
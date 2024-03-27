const dados = require('./dados.json')
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const server = express()
server.use(cors())
server.use(express.json())

server.listen(3000, () => {
    console.log("O servidor está funcionando")
})

server.get('/', (req, res) => {
    return res.json({ mensagem: "Estou funcionando" })
})
server.post('/usuario', (req, res) => {
    const novoUsuario = req.body

    if (!novoUsuario.nome || !novoUsuario.idade || !novoUsuario.email || !novoUsuario.tipodeDaltonismo || !novoUsuario.senha) {
        return res.status(400).json({ mensagem: "Dados não preenchidos ou incompletos, tente novamente" })
    } else {
        dados.Usuarios.push(novoUsuario)
        salvarDados(dados)

        return res.status(201).json({ mensagem: "Usuario cadastrado com sucesso" })
    }
})
//GET
server.get('/dados.json', (req, res) => {
    return res.json(dados.Usuarios)
})
//PUT
server.put('/usuario/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id)
    const atualizarUsuario = req.body

    const indiceUsuario = dados.Usuario.findIndex(u => u.id === usuarioId)

    if (indiceUsuario === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado" })
    } else {
        dados.Usuario[indiceUsuario].nome = atualizarUsuario.nome || dados.Usuario[indiceUsuario].nome

        dados.Usuario[indiceUsuario].nome = atualizarUsuario.nome || dados.Usuario[indiceUsuario].nome

        dados.Usuario[indiceUsuario].nome = atualizarUsuario.nome || dados.MUsuario[indiceUsuario].nome

        salvarDadosMedicamento(dadosMedicamento)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})
//DELETE
server.delete('/usuario/:id', (req, res) => {
    const id = parseInt(req.params.id)

    dados.Usuarios = dados.Usuarios.filter(u => u.id !== id)

    salvarDados(dados)
    return res.status(200).json({ mensagem: "Usuario excluido com sucesso" })
})

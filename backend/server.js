// backend/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configurações para ler dados de formulários e JSON
app.use(cors());
app.use(express.json());

// Permite ao Express servir seus arquivos CSS, JS e Assets diretamente das suas pastas originais
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/pages', express.static(path.join(__dirname, '../pages')));

// Banco de dados simulado em memória
const usuariosDB = [];

// Rota para servir a Página Inicial (index.html) na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// API de Cadastro
app.post('/api/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, message: "Preencha todos os campos!" });
    }
    const existe = usuariosDB.find(u => u.email === email);
    if (existe) {
        return res.status(400).json({ success: false, message: "E-mail já cadastrado." });
    }
    usuariosDB.push({ nome, email, senha });
    return res.status(201).json({ success: true, message: "Conta criada com sucesso!" });
});

// API de Login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuariosDB.find(u => u.email === email && u.senha === senha);
    if (!usuario) {
        return res.status(400).json({ success: false, message: "E-mail ou senha incorretos." });
    }
    return res.json({ success: true, user: { nome: usuario.nome, email: usuario.email } });
});

app.listen(PORT, () => {
    console.log(`\x1b[33m%s\x1b[0m`, `✨ ATELIER LUX ONLINE: Acesse http://localhost:${PORT}`);
});
require ("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

//CONFIGURAR JSON
app.use(express.json());
app.use(cors());

//MODELOS
const User = require("./api/modelos/User.js");

// ROTA PÚBLICA
app.get("/", (req, res) => {
    res.status(200).json({msg: "Bem vindo a nossa API!"})
});

//ROTA PRIVADA
app.get("/user/:id", checarToken, async (req,res) => {
    const id = req.params.id;

    //CHECAR SE USUÁRIO EXISTE
    const user = await User.findById(id, "-senha");

    if (!user) {
        return res.status(404).json({msg: "usuário não encontrado"})
    }

    res.status(200).json({user})
})

function checarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({msg: "Acesso negado"})
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(400).json({msg: "Token inválido"})
    }
}


//REGISTRAR USUÁRIO
app.post("/auth/register", async(req,res) => {
    const {nome, sobrenome, email, senha, confirmarSenha} = req.body

    //VALIDAÇÕES
    if(!nome) {
        return res.status(422).json({msg: "O nome é obrigatório"})
    }
    if(!sobrenome) {
        return res.status(422).json({msg: "O sobrenome é obrigatório"})
    }
    if(!email) {
        return res.status(422).json({msg: "O email é obrigatório"})
    }
    if(!senha) {
        return res.status(422).json({msg: "A senha é obrigatória"})
    }
    if(senha !== confirmarSenha) {
        return res.status(422).json({msg: "As senhas não coincidem"})
    }

    //CHECAR SE USUÁRIO JÁ EXISTE
    const userExists = await User.findOne({email: email});
    if(userExists) {
        return res.status(422).json({msg: "Email já cadastrado"})
    }

    //CRIAR SENHA
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    //CRIAR USUÁRIO
    const user = new User({
        nome,
        sobrenome,
        email,
        senha: senhaHash,
    });

    try {
        await user.save();
        res.status(201).json({msg: "Usuário criado com sucesso"})
    } catch (error) {
        res.status(500).json({msg: "Erro no servidor, tente novamente mais tarde"})
    }
})

//LOGIN DO USUÁRIO
app.post("/auth/login", async (req, res) => {
    const {email, senha} = req.body;

    //VALIDAÇÕES
    if(!email) {
        return res.status(422).json({msg: "O email é obrigatório"})
    }
    if(!senha) {
        return res.status(422).json({msg: "A senha é obrigatória"})
    }

    //CHECAR SE USUÁRIO EXISTE
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(404).json({msg: "Usuário não encontrado"})
    }

    //CHECAR SE A SENHA ESTÁ CORRETA
    const checarSenha = await bcrypt.compare(senha, user.senha);

    if (!checarSenha) {
        return res.status(402).json({msg: "Senha incorreta"})
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user._id,
        }, secret,
        )

        res.status(200).json({msg: "Autenticação realizada com sucesso", token})
    } catch (error) {
        res.status(500).json({msg: "Erro no servidor, tente novamente mais tarde"})
    }
})

//CREDENCIAIS
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ltwduin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
    app.listen(3000);
    console.log("Conectou ao banco");
}).catch((err) => console.log(err))

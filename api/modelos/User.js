const mongoose = require("mongoose");

const User = mongoose.model("User", {
    nome: String,
    sobrenome: String,
    email: String,
    senha: String
});

module.exports = User;
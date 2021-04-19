const Sequelize = require("sequelize");
const conn = require("./connection");
const Modalidades = require("./ModalidadesExer");
const Clients = require("./Clients");

const Exercicios = conn.define("exercicios", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }    
});

Modalidades.hasMany(Exercicios);
Exercicios.belongsTo(Modalidades);

Exercicios.sync({force: false}).then(() => {
    console.log("Tabela de exercícios em funcionamento normal");
}).catch((erro) => {
    console.log("Erro na tabela de exercícios: " + erro);
});

module.exports = Exercicios;
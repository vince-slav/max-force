const Sequelize = require("sequelize");
const conn = require("./connection");

const Modalidades = conn.define("modalidades", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


Modalidades.sync({force: false}).then(() => {
    console.log("Tabela de modalidades em funcionamento normal");
}).catch((erro) => {
    console.log("Erro na tabela de modalidades: " + erro);
});
 
module.exports = Modalidades;
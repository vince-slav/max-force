const Sequelize = require("sequelize");
const conn = require("./connection");

const Admin = conn.define("admin", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Admin.sync({force: false})
          .then(() => {
              console.log("Tabela administrativa em funcionamento normal");
          })
          .catch((erro) => {
              console.log("Erro na tabela administrativa");
          });

module.exports = Admin;


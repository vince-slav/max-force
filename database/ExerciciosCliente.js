const Sequelize = require("sequelize");
const conn = require("./connection");
const Clients = require("./Clients");

const ClienteExercicios = conn.define("clientesExercicios", {
    exercicio1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serie1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    exercicio2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serie2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    exercicio3: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serie3: {
        type: Sequelize.STRING,
        allowNull: false
    },
    exercicio4: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serie4: {
        type: Sequelize.STRING,
        allowNull: false
    },
    exercicio5: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serie5: {
        type: Sequelize.STRING,
        allowNull: false
    },
    exercicio6: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serie6: {
        type: Sequelize.STRING,
        allowNull: false
    },
    exercicio7: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serie7: {
        type: Sequelize.STRING,
        allowNull: false
    },
    exercicio8: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serie8: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Clients.hasMany(ClienteExercicios);
ClienteExercicios.belongsTo(Clients);

ClienteExercicios.sync({force: false}).then(() => {
    console.log("Tabela de exercícios dos clientes em funcionamento normal");
}).catch((erro) => {
    console.log("Erro na tabela de exercícios dos clientes: " + erro);
});

module.exports = ClienteExercicios;
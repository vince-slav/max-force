const Sequelize = require("sequelize");
const conn = require("./connection");

const Clients = conn.define("cliente", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        defaultValue: true,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ncasa: {
        type: Sequelize.STRING,
        allowNull: false
    },   
    vencimento: {
        type: Sequelize.INTEGER,
        allowNull: false      
    }, 
    modalidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    objetivo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },    
    observacao: {
        type: Sequelize.STRING,
        allowNull: true
    }    
});

Clients.sync({force: false})
            .then(() => {
                console.log("Tabela clientes em funcionamento normal");
            })
            .catch((erro) => {
                console.log("Erro na tabela clientes: " + erro);
            });

module.exports = Clients;
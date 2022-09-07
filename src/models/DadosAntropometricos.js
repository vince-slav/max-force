const Sequelize = require("sequelize");
const conn = require("../database/connection");
const Clientes = require("./Clients");

const DadosAntropometricos = conn.define("Dados_Antropometricos", {
    peso: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estatura: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    dobraTricipal: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    dobraAbdominal: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    dobraSubescapular: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    dobraAxilarMedia: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    dobraCoxa: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    dobraToraxica: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    dobraSuprailiaca: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    circumferenciaBracoRelaxado: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    circumferenciaAntebraco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    circumferenciaCintura: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    circumferenciaAbdomen: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    circumferenciaQuadril: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    circumferenciaCoxaMedial: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

Clientes.hasOne(DadosAntropometricos);
DadosAntropometricos.belongsTo(Clientes);


DadosAntropometricos.sync({force: false})
.then(() => {
    console.log("Tabela de dados antropometricos em funcionamento normal");
})
.catch((erro) => {
    console.log("Erro na tabela de dados");
});

module.exports = DadosAntropometricos;
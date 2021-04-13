const Sequelize = require("sequelize");
const conn = require("./connection");

const MsgContato = conn.define("msg-contato", {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    assunto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensagem: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

MsgContato.sync({force: false})
.then(() => {
    console.log("Tabel de contato em funcionamento normal");
})
.catch((erro) => {
    console.log("Erro na tabela de contato");
});
module.exports = MsgContato;




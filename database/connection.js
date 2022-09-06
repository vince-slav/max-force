const Sequelize = require("sequelize");

const conn = new Sequelize("maxforce", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = conn;
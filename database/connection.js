const Sequelize = require("sequelize");

const conn = new Sequelize("maxforce", "root", "videolan009007", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = conn;
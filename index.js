const express = require("express");
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const session = require("express-session");
const authAdm = require("./src/middleware/authAdm");
// const bcrypt = require("bcryptjs");
const connection = require("./src/database/connection");
const routes = require("./routes");

app.use(session({
  secret: "bv=+)dc#$%",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

connection.authenticate()
  .then(() => {
    console.log("Conexão com a base de dados estabelecida");
  })
  .catch((erro) => {
    console.log("Falha ao conectar com a base de dados");
  });

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(bodyParser.json());


app.listen(3000, (erro) => {
  if (erro) {
    console.log("Falha ao conectar");
  } else {
    console.log("Conexão estabelecida em 127.0.0.1:3000");
  }
});
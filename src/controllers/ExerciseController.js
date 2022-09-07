const Modalidades = require("../models/ModalidadesExer");
const Exercicios = require("../models/Exercicios");

exports.newExercise = (req, res) => {
  Modalidades.findAll().then((modalidades) => {
    res.render("newExer", { modalidades: modalidades });
  });
};

exports.recExer = (req, res) => {
  var nome = req.body.nome;
  var modalidade = req.body.modalidade;
  Exercicios.create({
    nome: nome,
    modalidadeId: modalidade,
  })
    .then(() => {
      res.redirect("/clients");
    })
    .catch((erro) => {
      res.send("Houve um erro ao tentar cadastrar o exercício :(");
    });
};

exports.newModality = (req, res) => {
  res.render("newMod");
};

exports.recMod = (req, res) => {
  var modalidade = req.body.modalidade;
  Modalidades.create({
    nome: modalidade,
  })
    .then(() => {
      res.redirect("/clients");
    })
    .catch((erro) => {
      res.send("Houve um erro ao tentar cadastrar a modalidade :(");
    });
};

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
      res.redirect("/novo-exercicio?success=true");
    })
    .catch((erro) => {
      res.redirect("/novo-exercicio?error=true");
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
      res.redirect("/nova-modalidade?success=true");
    })
    .catch((erro) => {
      res.redirect("/nova-modalidade?error=true");
    });
};

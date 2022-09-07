const Contatato = require("../models/Contatato");
const MsgContato = require("../models/Contatato");

exports.index = (req, res) => {
  res.render("index");
};

exports.contato = (req, res) => {
  res.render("contato");
};

exports.notificacao = (req, res) => {
  MsgContato.findAll()
    .then((msg) => {
      if (msg != undefined) {
        res.render("notificacoes", { msgs: msg });
      } else {
        res.send("Notificações não encontrada.");
      }
    })
    .catch((erro) => {
      res.send("Notificações indisponível no momento.");
    });
};

exports.deleteNot = (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Contatato.destroy({
        where: { id: id },
      })
        .then(() => {
          res.redirect("/notificacoes");
        })
        .catch((erro) => {
          res.redirect("/notificacoes");
        });
    } else {
      res.redirect("/notificacoes");
    }
  } else {
    res.redirect("/notificacoes");
  }
};

exports.recContato = (req, res) => {
  var email = req.body.email;
  var assunto = req.body.assunto;
  var msg = req.body.message;

  MsgContato.create({
    email: email,
    assunto: assunto,
    mensagem: msg,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      res.send("Erro: houve um problema, tente mais tarde");
    });
};

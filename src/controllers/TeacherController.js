const Clients = require("../models/Clients");
const Admin = require("../models/Admin");
// const bcrypt = require("bcryptjs");
const Swal = require("sweetalert2");
const { Op } = require("sequelize");

exports.admDeslog = (req, res) => {
  req.session.admin = undefined;
  res.redirect("/");
};

exports.admin = (req, res) => {
  res.render("admin");
};

exports.clients = (req, res) => {
  Clients.findAll().then((clients) => {
    res.render("clients", { clients: clients });
  });
};

exports.adm2 = (req, res) => {
  res.render("adm2");
};

exports.newAdm = (req, res) => {
  res.render("newAdm");
};

exports.deleteAdm = (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Admin.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/searchResultAdm");
      });
    } else {
      res.redirect("/clients");
    }
  } else {
    res.redirect("/clients");
  }
};

exports.updateAdm = (req, res) => {
  var id = req.params.id;
  Admin.findByPk(id)
    .then((admin) => {
      if (admin != undefined) {
        res.render("updateAdm", { admin: admin });
      } else {
        res.redirect("/");
      }
    })
    .catch((erro) => {
      res.redirect("/");
    });
};

exports.recUpdateAdm = (req, res) => {
  var id = req.body.id;
  var nome = req.body.nomeadm;
  var email = req.body.emailadm;
  var telefone = req.body.teladm;
  var cpf = req.body.cpfadm;

  Admin.update(
    {
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
    },
    { where: { id: id } }
  ).then(() => {
    res.redirect("/searchResultAdm");
  });
};

exports.searchResultAdm = (req, res) => {
  Admin.findAll().then((admins) => {
    res.render("searchResultAdm", { admins: admins });
  });
};

exports.recSearchAdm = (req, res) => {
  var criterio = req.body.criterio;
  var valor = req.body.valor;

  switch (criterio) {
    case "Nome":
      Admin.findAll({
        where: {
          nome: {
            [Op.like]: "%" + valor + "%",
          },
        },
      })
        .then((admins) => {
          res.render("searchResultAdm", { admins: admins });
        })
        .catch((erro) => {
          res.send("Administrador não encontrado");
        });
      break;

    case "CPF":
      Admin.findAll({
        where: { cpf: valor },
      })
        .then((admins) => {
          res.render("searchResultAdm", { admins: admins });
        })
        .catch((erro) => {
          res.send("Administrador não encontrado");
        });
      break;

    case "E-mail":
      Admin.findAll({
        where: { email: valor },
      })
        .then((clients) => {
          res.render("searchResultAdm", { admins: admins });
        })
        .catch((erro) => {
          res.send("Administrador não encontrado");
        });
      break;

    default:
      res.send("Administrador não encontrado");
  }
};

exports.newAdm = (req, res) => {
  var nomeadm = req.body.nomeadm;
  var emailadm = req.body.emailadm;
  var teladm = req.body.teladm;
  var cpfadm = req.body.cpfadm;
  var passadm = req.body.passadm;

  Admin.findOne({ where: { email: emailadm } }).then((admin) => {
    if (admin == undefined) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(passadm, salt);
      Admin.create({
        nome: nomeadm,
        email: emailadm,
        telefone: teladm,
        cpf: cpfadm,
        senha: hash,
      })
        .then(() => {
          res.redirect("/clients");
        })
        .catch((erro) => {
          res.send("Erro ao cadastrar: " + erro);
        });
    } else {
      res.redirect("/");
    }
  });
};

exports.authenticate = (req, res) => {
  var email = req.body.email;
  var pass = req.body.pass;

  Admin.findOne({ where: { email: email } }).then((admin) => {
    if (admin != undefined) {
      // caso exista admin com esse email
      // var correct = bcrypt.compareSync(pass, admin.senha);

      if (pass == admin.senha) {
        req.session.admin = {
          id: admin.id,
          email: admin.email,
        };
        res.redirect("/clients");
      } else {
        res.redirect("/admin?error=true");
      }
    } else {
      res.redirect("/admin?error=true");
    }
  });
};

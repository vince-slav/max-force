const Clients = require("../models/Clients");
const DadosAntropometricos = require("../models/DadosAntropometricos");
const Exercicios = require("../models/Exercicios");
const ClienteExercicios = require("../models/ExerciciosCliente");

exports.login = (req, res) => {
  res.render("login");
};

exports.newUser = (req, res) => {
  res.render("newuser");
};

exports.profile = (req, res) => {
  res.render("profile");
};

exports.dadosPessoais = (req, res) => {
  Clients.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (user != undefined) {
        res.render("dadosPessoais", { user: user });
      } else {
        res.send("Erro: Usuário não encontrado.");
      }
    })
    .catch((erro) => {
      console.log("Erro: " + erro);
    });
};

exports.medidas = (req, res) => {
  DadosAntropometricos.findOne()
    .then((medidas) => {
      if (medidas != undefined) {
        res.render("medidas", { medidas: medidas });
      } else {
        res.send("Erro: dados não encontrado.");
      }
    })
    .catch((erro) => {
      console.log("Erro: " + erro);
    });
};

exports.treinoDoDia = (req, res) => {
  ClienteExercicios.findOne()
    .then((treino) => {
      if (treino != undefined) {
        res.render("treino", { treino: treino });
      } else {
        res.send("Erro: treino não encontrado.");
      }
    })
    .catch((erro) => {
      console.log("Erro: " + erro);
    });
};

exports.newClient = (req, res) => {
  var nome = req.body.nome;
  var email = req.body.email;
  var sexo = req.body.sexo;
  var nascimento = req.body.datan;
  var cpf = req.body.cpf;
  var tel = req.body.tel;
  var cidade = req.body.cidade;
  var cep = req.body.cep;
  var endereco = req.body.endereco;
  var complemento = req.body.complemento;
  var ncasa = req.body.ncasa;
  var vencimento = req.body.vencimento;
  var modalidade = req.body.mod;
  var objetivo = req.body.mod;
  var senha = req.body.senha;
  var observacao = req.body.obs;

  Clients.findOne({ where: { email: email } }).then((user) => {
    if (user == undefined) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(senha, salt);
      Clients.create({
        nome: nome,
        email: email,
        sexo: sexo,
        nascimento: nascimento,
        cpf: cpf,
        tel: tel,
        cidade: cidade,
        cep: cep,
        endereco: endereco,
        complemento: complemento,
        ncasa: ncasa,
        vencimento: vencimento,
        modalidade: modalidade,
        objetivo: objetivo,
        senha: hash,
        observacao: observacao,
      })
        .then(() => {
          res.redirect("/searchClient");
        })
        .catch((erro) => {
          res.send("Erro ao cadastrar os dados pessoais");
        });
    } else {
      res.send("Usuário já cadastrado");
    }
  });
};

exports.dadosAntropometricos = (req, res) => {
  Clients.findAll()
    .then((clientes) => {
      res.render("dadosAntropometricos", { clientes: clientes });
    })
    .catch((erro) => {
      res.send("Ocorreu um erro ao tentar acessar a página :(");
    });
};

exports.recDadosAntropometricos = (req, res) => {
  var peso = req.body.peso;
  var estatura = req.body.estatura;
  var dobraTricipal = req.body.dobraTricipal;
  var dobraAbdominal = req.body.dobraAbdominal;
  var dobraSubescapular = req.body.dobraSubescapular;
  var dobraAxilarMedia = req.body.dobraAxilarMedia;
  var dobraCoxa = req.body.dobraCoxa;
  var dobraToraxica = req.body.dobraToraxica;
  var dobraSuprailiaca = req.body.dobraSuprailiaca;
  var circumferenciaBracoRelaxado = req.body.circumferenciaBracoRelaxado;
  var circumferenciaAntebraco = req.body.circumferenciaAntebraco;
  var circumferenciaCintura = req.body.circumferenciaCintura;
  var circumferenciaAbdomen = req.body.circumferenciaAbdomen;
  var circumferenciaQuadril = req.body.circumferenciaQuadril;
  var circumferenciaCoxaMedial = req.body.circumferenciaCoxaMedial;
  var id = req.body.cliente;

  DadosAntropometricos.create({
    peso: peso,
    estatura: estatura,
    dobraTricipal: dobraTricipal,
    dobraAbdominal: dobraAbdominal,
    dobraSubescapular: dobraSubescapular,
    dobraAxilarMedia: dobraAxilarMedia,
    dobraCoxa: dobraCoxa,
    dobraToraxica: dobraToraxica,
    dobraSuprailiaca: dobraSuprailiaca,
    circumferenciaBracoRelaxado: circumferenciaBracoRelaxado,
    circumferenciaAntebraco: circumferenciaAntebraco,
    circumferenciaCintura: circumferenciaCintura,
    circumferenciaAbdomen: circumferenciaAbdomen,
    circumferenciaQuadril: circumferenciaQuadril,
    circumferenciaCoxaMedial: circumferenciaCoxaMedial,
    clienteId: id,
  })
    .then(() => {
      res.redirect("/newuser");
    })
    .catch((erro) => {
      res.send("Houve um erro ao cadastrar os dados antropométricos :(");
      res.send("Houve um erro ao cadastrar os dados antropométricos :(");
      console.log("Erro ao cadastrar dados antropometricos: " + erro);
    });
};

exports.deleteClient = (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Clients.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/searchClient");
      });
    } else {
      res.redirect("/clients");
    }
  } else {
    res.redirect("/clients");
  }
};

exports.updateClient = (req, res) => {
  var id = req.params.id;
  Clients.findByPk(id)
    .then((cliente) => {
      if (cliente != undefined) {
        res.render("update", { cliente: cliente });
      } else {
        res.redirect("/");
      }
    })
    .catch((erro) => {
      res.redirect("/");
    });
};

exports.recUpdate = (req, res) => {
  var id = req.body.id;
  var nome = req.body.nome;
  var email = req.body.email;
  var sexo = req.body.sexo;
  var nascimento = req.body.datan;
  var cpf = req.body.cpf;
  var tel = req.body.tel;
  var cidade = req.body.cidade;
  var cep = req.body.cep;
  var endereco = req.body.endereco;
  var complemento = req.body.complemento;
  var ncasa = req.body.ncasa;
  var vencimento = req.body.vencimento;
  var modalidade = req.body.mod;
  var objetivo = req.body.obj;
  var senha = req.body.senha;
  var observacao = req.body.obs;

  Clients.update(
    {
      nome: nome,
      email: email,
      sexo: sexo,
      nascimento: nascimento,
      cpf: cpf,
      tel: tel,
      cidade: cidade,
      cep: cep,
      endereco: endereco,
      complemento: complemento,
      ncasa: ncasa,
      vencimento: vencimento,
      modalidade: modalidade,
      objetivo: objetivo,
      senha: senha,
      observacao: observacao,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/result");
    })
    .catch((erro) => {
      res.send("Ocorreu um erro ao tentar salvar as alterções :(");
      console.log("Erro ao salvar as alteraçoes: " + erro);
    });
};

exports.searchClient = (req, res) => {
  res.render("searchClient");
};

exports.recExerCli = (req, res) => {
  var exer1 = req.body.exer1;
  var serie1 = req.body.serie1;
  var exer2 = req.body.exer2;
  var serie2 = req.body.serie2;
  var exer3 = req.body.exer3;
  var serie3 = req.body.serie3;
  var exer4 = req.body.exer4;
  var serie4 = req.body.serie4;
  var exer5 = req.body.exer5;
  var serie5 = req.body.serie5;
  var exer6 = req.body.exer6;
  var serie6 = req.body.serie6;
  var exer7 = req.body.exer7;
  var serie7 = req.body.serie7;
  var exer8 = req.body.exer8;
  var serie8 = req.body.serie8;
  var clientId = req.body.clientId;

  ClienteExercicios.create({
    exercicio1: exer1,
    serie1: serie1,
    exercicio2: exer2,
    serie2: serie2,
    exercicio3: exer3,
    serie3: serie3,
    exercicio4: exer4,
    serie4: serie4,
    exercicio5: exer5,
    serie5: serie5,
    exercicio6: exer6,
    serie6: serie6,
    exercicio7: exer7,
    serie7: serie7,
    exercicio8: exer8,
    serie8: serie8,
    clienteId: clientId,
  })
    .then(() => {})
    .catch((erro) => {});
};

exports.exercicios = (req, res) => {
  var id = req.params.id;
  Clients.findByPk(id)
    .then((user) => {
      Exercicios.findAll()
        .then((exercicios) => {
          res.render("exercicios", { exercicios: exercicios, user: user });
        })
        .catch((erro) => {
          res.send("Ocorreu um erro ao tentar carregar a página :(");
          console.log("Erro ao carregar a página: " + erro);
        });
    })
    .catch((erro) => {
      console.log("Erro: " + erro);
    });
};

exports.result = (req, res) => {
  Clients.findAll().then((clients) => {
    res.render("searchResult", { clients: clients });
  });
};

exports.recSearch = (req, res) => {
  var criterio = req.body.criterio;
  var valor = req.body.valor;

  switch (criterio) {
    case "Nome":
      Clients.findAll({
        where: {
          nome: {
            [Op.like]: "%" + valor + "%",
          },
        },
      })
        .then((clients) => {
          res.render("searchResult", { clients: clients });
        })
        .catch((erro) => {
          res.send("Usuário não encontrado");
        });
      break;

    case "CPF":
      Clients.findAll({
        where: { cpf: valor },
      })
        .then((clients) => {
          res.render("searchResult", { clients: clients });
        })
        .catch((erro) => {
          res.send("Usuário não encontrado");
        });
      break;

    case "Sexo":
      Clients.findAll({
        where: { sexo: valor },
      })
        .then((clients) => {
          res.render("searchResult", { clients: clients });
        })
        .catch((erro) => {
          res.send("Usuário não encontrado");
        });
      break;

    case "Objetivo":
      Clients.findAll({
        where: { objetivo: valor },
      })
        .then((clients) => {
          res.render("searchResult", { clients: clients });
        })
        .catch((erro) => {
          res.send("Usuário não encontrado");
        });
      break;

    case "E-mail":
      Clients.findAll({
        where: { email: valor },
      })
        .then((clients) => {
          res.render("searchResult", { clients: clients });
        })
        .catch((erro) => {
          res.send("Usuário não encontrado");
        });
      break;

    case "CEP":
      Clients.findAll({
        where: { cep: valor },
      })
        .then((clients) => {
          res.render("searchResult", { clients: clients });
        })
        .catch((erro) => {
          res.send("Usuário não encontrado");
        });
      break;

    default:
      res.send("Usuário não encontrado");
  }
};

exports.authUser = (req, res) => {
  var email = req.body.email;
  var senha = req.body.senha;

  Clients.findOne({ where: { email: email } })
    .then((user) => {
      if (user != undefined) {
        var correct = bcrypt.compareSync(senha, user.senha);
        if (correct) {
          req.session.user = {
            id: user.id,
            email: user.email,
          };

          Clients.findOne({ where: { email: email } })
            .then((user) => {
              if (user != undefined) {
                res.render("profile", { user: user });
              } else {
                res.send("Erro: Usuário não encontrado.");
              }
            })
            .catch((erro) => {
              console.log("Erro: " + erro);
            });
        } else {
          res.redirect("/");
        }
      } else {
        res.redirect("/");
      }
    })
    .catch((erro) => {
      console.log("Erro: " + erro);
    });
};

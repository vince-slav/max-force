/*  Admin, Contatato, DadosAntropometricos, Modalidades, Exercicios
    ClienteExercicios e MsgContato  são módulos referentes à tabelas
    de entidades do sistema
*/

/*  authAdm é o módulo referente ao middleware responsável pela sessão
    e autenticação do administrador(professor)   
*/

//  bcrypt é o módulo nativo do nodejs para fazer hash de senhas

//  op é um módulo nativo do sequelize para fazer manipulações no banco de dados
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
    maxAge: 1000 * 60 * 60 * 24 // duração do cookie em milisegundos
  }
}));

connection.authenticate()
  .then(() => {
    console.log("Conexão com a base de dados estabelecida");
  })
  .catch((erro) => {
    console.log("Falha ao conectar com a base de dados");
  });
//////////////////////////////////////////////////////////////////////////////

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(bodyParser.json());


//ROTAS DOS SITE
// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/contato", (req, res) => {
//   res.render("contato");
// });

// app.get("/notificacoes", (req, res) => {
//   MsgContato.findAll()
//     .then((msg) => {
//       if (msg != undefined) {
//         res.render("notificacoes", { msgs: msg });
//       } else {
//         res.send("Notificações não encontrada.");
//       }
//     })
//     .catch((erro) => {
//       res.send("Notificações indisponível no momento.");
//     })
// });

// app.post("/delete-not", (req, res) => {
//   var id = req.body.id;
//   if (id != undefined) {
//     if (!isNaN(id)) {
//       Contatato.destroy({
//         where: { id: id }
//       })
//         .then(() => {
//           res.redirect("/notificacoes")
//         })
//         .catch((erro) => {
//           res.redirect("/notificacoes");
//         })
//     } else {
//       res.redirect("/notificacoes");
//     }
//   } else {
//     res.redirect("/notificacoes");
//   }
// });

// app.post("/rec-contato", (req, res) => {
//   var email = req.body.email;
//   var assunto = req.body.assunto;
//   var msg = req.body.message;

//   MsgContato.create({
//     email: email,
//     assunto: assunto,
//     mensagem: msg
//   })
//     .then(() => {
//       res.redirect("/")
//     })
//     .catch((erro) => {
//       res.send("Erro: houve um problema, tente mais tarde");
//     });
// });
// ////////////////////////////////////////FIM DAS ROTAS DAS ROTAS DO SITE/////////////////////////////////////////// 

// //ROTAS DO CLIENTE
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.get("/newuser", (req, res) => {
//   res.render("newuser");
// });

// app.get("/profile", (req, res) => {
//   res.render("profile");
// });

// app.get("/dadosPessoais", (req, res) => {
//   Clients.findOne({
//     where: { email: email }
//   })
//     .then((user) => {
//       if (user != undefined) {
//         res.render("dadosPessoais", { user: user });
//       } else {
//         res.send("Erro: Usuário não encontrado.");
//       }
//     })
//     .catch((erro) => {
//       console.log("Erro: " + erro);
//     });
// });

// app.get("/medidas", (req, res) => {
//   DadosAntropometricos.findOne()
//     .then((medidas) => {
//       if (medidas != undefined) {
//         res.render("medidas", { medidas: medidas });
//       } else {
//         res.send("Erro: dados não encontrado.");
//       }
//     })
//     .catch((erro) => {
//       console.log("Erro: " + erro);
//     });
// });

// app.get("/treinoDoDia", (req, res) => {
//   ClienteExercicios.findOne()
//     .then((treino) => {
//       if (treino != undefined) {
//         res.render("treino", { treino: treino });
//       } else {
//         res.send("Erro: treino não encontrado.");
//       }
//     })
//     .catch((erro) => {
//       console.log("Erro: " + erro);
//     });

// })

// app.post("/rec", (req, res) => {
//   var nome = req.body.nome;
//   var email = req.body.email;
//   var sexo = req.body.sexo;
//   var nascimento = req.body.datan;
//   var cpf = req.body.cpf;
//   var tel = req.body.tel;
//   var cidade = req.body.cidade;
//   var cep = req.body.cep;
//   var endereco = req.body.endereco;
//   var complemento = req.body.complemento;
//   var ncasa = req.body.ncasa;
//   var vencimento = req.body.vencimento;
//   var modalidade = req.body.mod;
//   var objetivo = req.body.mod;
//   var senha = req.body.senha;
//   var observacao = req.body.obs;

//   Clients.findOne({ where: { email: email } })
//     .then((user) => {
//       if (user == undefined) {
//         var salt = bcrypt.genSaltSync(10);
//         var hash = bcrypt.hashSync(senha, salt);
//         Clients.create({
//           nome: nome,
//           email: email,
//           sexo: sexo,
//           nascimento: nascimento,
//           cpf: cpf,
//           tel: tel,
//           cidade: cidade,
//           cep: cep,
//           endereco: endereco,
//           complemento: complemento,
//           ncasa: ncasa,
//           vencimento: vencimento,
//           modalidade: modalidade,
//           objetivo: objetivo,
//           senha: hash,
//           observacao: observacao
//         }).then(() => {
//           res.redirect("/searchClient");
//         }).catch((erro) => {
//           res.send("Erro ao cadastrar os dados pessoais");
//         })
//       } else {
//         res.send("Usuário já cadastrado");
//       }
//     });
// });

// app.get("/dadosAntropometricos", (req, res) => {
//   Clients.findAll().then((clientes) => {
//     res.render("dadosAntropometricos", { clientes: clientes });
//   }).catch((erro) => {
//     res.send("Ocorreu um erro ao tentar acessar a página :(");
//   });
// });

// app.post("/recDadosAntropometricos", (req, res) => {
//   var peso = req.body.peso;
//   var estatura = req.body.estatura;
//   var dobraTricipal = req.body.dobraTricipal;
//   var dobraAbdominal = req.body.dobraAbdominal;
//   var dobraSubescapular = req.body.dobraSubescapular;
//   var dobraAxilarMedia = req.body.dobraAxilarMedia;
//   var dobraCoxa = req.body.dobraCoxa;
//   var dobraToraxica = req.body.dobraToraxica;
//   var dobraSuprailiaca = req.body.dobraSuprailiaca;
//   var circumferenciaBracoRelaxado = req.body.circumferenciaBracoRelaxado;
//   var circumferenciaAntebraco = req.body.circumferenciaAntebraco;
//   var circumferenciaCintura = req.body.circumferenciaCintura;
//   var circumferenciaAbdomen = req.body.circumferenciaAbdomen;
//   var circumferenciaQuadril = req.body.circumferenciaQuadril;
//   var circumferenciaCoxaMedial = req.body.circumferenciaCoxaMedial;
//   var id = req.body.cliente;

//   DadosAntropometricos.create({
//     peso: peso,
//     estatura: estatura,
//     dobraTricipal: dobraTricipal,
//     dobraAbdominal: dobraAbdominal,
//     dobraSubescapular: dobraSubescapular,
//     dobraAxilarMedia: dobraAxilarMedia,
//     dobraCoxa: dobraCoxa,
//     dobraToraxica: dobraToraxica,
//     dobraSuprailiaca: dobraSuprailiaca,
//     circumferenciaBracoRelaxado: circumferenciaBracoRelaxado,
//     circumferenciaAntebraco: circumferenciaAntebraco,
//     circumferenciaCintura: circumferenciaCintura,
//     circumferenciaAbdomen: circumferenciaAbdomen,
//     circumferenciaQuadril: circumferenciaQuadril,
//     circumferenciaCoxaMedial: circumferenciaCoxaMedial,
//     clienteId: id
//   }).then(() => {
//     res.redirect("/newuser");
//   }).catch((erro) => {
//     res.send("Houve um erro ao cadastrar os dados antropométricos :(");
//     res.send("Houve um erro ao cadastrar os dados antropométricos :(");
//     console.log("Erro ao cadastrar dados antropometricos: " + erro);
//   });
// });

// app.post("/delete", authAdm, (req, res) => {
//   var id = req.body.id;
//   if (id != undefined) {
//     if (!isNaN(id)) {
//       Clients.destroy({
//         where: {
//           id: id
//         }
//       }).then(() => {
//         res.redirect("/searchClient");
//       })
//     } else {
//       res.redirect("/clients");
//     }
//   } else {
//     res.redirect("/clients")
//   }
// });

// app.get("/update/:id", (req, res) => {
//   var id = req.params.id;
//   Clients.findByPk(id).then((cliente) => {
//     if (cliente != undefined) {
//       res.render("update", { cliente: cliente })
//     } else {
//       res.redirect("/")
//     }
//   }).catch((erro) => {
//     res.redirect("/");
//   })
// });

// app.post("/recUpdate", (req, res) => {
//   var id = req.body.id;
//   var nome = req.body.nome;
//   var email = req.body.email;
//   var sexo = req.body.sexo;
//   var nascimento = req.body.datan;
//   var cpf = req.body.cpf;
//   var tel = req.body.tel;
//   var cidade = req.body.cidade;
//   var cep = req.body.cep;
//   var endereco = req.body.endereco;
//   var complemento = req.body.complemento;
//   var ncasa = req.body.ncasa;
//   var vencimento = req.body.vencimento;
//   var modalidade = req.body.mod;
//   var objetivo = req.body.obj;
//   var senha = req.body.senha;
//   var observacao = req.body.obs;

//   Clients.update({
//     nome: nome,
//     email: email,
//     sexo: sexo,
//     nascimento: nascimento,
//     cpf: cpf,
//     tel: tel,
//     cidade: cidade,
//     cep: cep,
//     endereco: endereco,
//     complemento: complemento,
//     ncasa: ncasa,
//     vencimento: vencimento,
//     modalidade: modalidade,
//     objetivo: objetivo,
//     senha: senha,
//     observacao: observacao
//   }, { where: { id: id } }).then(() => {
//     res.redirect("/result");
//   }).catch((erro) => {
//     res.send("Ocorreu um erro ao tentar salvar as alterções :(");
//     console.log("Erro ao salvar as alteraçoes: " + erro);
//   })
// });

// app.get("/searchClient", (req, res) => {
//   res.render("searchClient");
// });

// app.post("/recExerCli", (req, res) => {
//   var exer1 = req.body.exer1;
//   var serie1 = req.body.serie1;
//   var exer2 = req.body.exer2;
//   var serie2 = req.body.serie2;
//   var exer3 = req.body.exer3;
//   var serie3 = req.body.serie3;
//   var exer4 = req.body.exer4;
//   var serie4 = req.body.serie4;
//   var exer5 = req.body.exer5;
//   var serie5 = req.body.serie5;
//   var exer6 = req.body.exer6;
//   var serie6 = req.body.serie6;
//   var exer7 = req.body.exer7;
//   var serie7 = req.body.serie7;
//   var exer8 = req.body.exer8;
//   var serie8 = req.body.serie8;
//   var clientId = req.body.clientId;

//   ClienteExercicios.create({
//     exercicio1: exer1,
//     serie1: serie1,
//     exercicio2: exer2,
//     serie2: serie2,
//     exercicio3: exer3,
//     serie3: serie3,
//     exercicio4: exer4,
//     serie4: serie4,
//     exercicio5: exer5,
//     serie5: serie5,
//     exercicio6: exer6,
//     serie6: serie6,
//     exercicio7: exer7,
//     serie7: serie7,
//     exercicio8: exer8,
//     serie8: serie8,
//     clienteId: clientId
//   }).then(() => {

//   }).catch((erro) => {

//   });
// });

// app.get("/exercicios/:id", (req, res) => {
//   var id = req.params.id;
//   Clients.findByPk(id).then((user) => {
//     Exercicios.findAll(

//     ).then((exercicios) => {
//       res.render("exercicios", { exercicios: exercicios, user: user });
//     }).catch((erro) => {
//       res.send("Ocorreu um erro ao tentar carregar a página :(");
//       console.log("Erro ao carregar a página: " + erro);
//     });
//   }).catch((erro) => {
//     console.log("Erro: " + erro);
//   })

// });

// app.get("/result", (req, res) => {
//   Clients.findAll().then((clients) => {
//     res.render("searchResult", { clients: clients });
//   })
// });

// app.post("/recSearch", (req, res) => {
//   var criterio = req.body.criterio;
//   var valor = req.body.valor;

//   switch (criterio) {
//     case "Nome":
//       Clients.findAll({
//         where: {
//           nome: {
//             [Op.like]: '%' + valor + '%'
//           }
//         }
//       })
//         .then((clients) => {
//           res.render("searchResult", { clients: clients });
//         })
//         .catch((erro) => {
//           res.send("Usuário não encontrado");
//         });
//       break;

//     case "CPF":
//       Clients.findAll({
//         where: { cpf: valor }
//       })
//         .then((clients) => {
//           res.render("searchResult", { clients: clients });
//         })
//         .catch((erro) => {
//           res.send("Usuário não encontrado");
//         });
//       break;

//     case "Sexo":
//       Clients.findAll({
//         where: { sexo: valor }
//       })
//         .then((clients) => {
//           res.render("searchResult", { clients: clients });
//         })
//         .catch((erro) => {
//           res.send("Usuário não encontrado");
//         });
//       break;

//     case "Objetivo":
//       Clients.findAll({
//         where: { objetivo: valor }
//       })
//         .then((clients) => {
//           res.render("searchResult", { clients: clients });
//         })
//         .catch((erro) => {
//           res.send("Usuário não encontrado");
//         });
//       break;

//     case "E-mail":
//       Clients.findAll({
//         where: { email: valor }
//       })
//         .then((clients) => {
//           res.render("searchResult", { clients: clients })
//         })
//         .catch((erro) => {
//           res.send("Usuário não encontrado");
//         });
//       break;

//     case "CEP":
//       Clients.findAll({
//         where: { cep: valor }
//       })
//         .then((clients) => {
//           res.render("searchResult", { clients: clients });
//         })
//         .catch((erro) => {
//           res.send("Usuário não encontrado");
//         });
//       break;

//     default:
//       res.send("Usuário não encontrado");
//   }
// });

// app.post("/authUser", (req, res) => {
//   var email = req.body.email;
//   var senha = req.body.senha;

//   Clients.findOne({ where: { email: email } })
//     .then((user) => {
//       if (user != undefined) {
//         var correct = bcrypt.compareSync(senha, user.senha);
//         if (correct) {
//           req.session.user = {
//             id: user.id,
//             email: user.email
//           }

//           Clients.findOne({ where: { email: email } })
//             .then((user) => {
//               if (user != undefined) {
//                 res.render("profile", { user: user });
//               } else {
//                 res.send("Erro: Usuário não encontrado.");
//               }
//             })
//             .catch((erro) => {
//               console.log("Erro: " + erro);
//             });

//         } else {
//           res.redirect("/");
//         }
//       } else {
//         res.redirect("/");
//       }
//     })
//     .catch((erro) => {
//       console.log("Erro: " + erro);
//     })
// });

// ////////////////////////////////////////FIM DAS ROTAS DOS CLIENTES/////////////////////////////////////////// 


// //ROTAS DO PROFESSOR
// app.get("/admDeslog", (req, res) => {
//   req.session.admin = undefined;
//   res.redirect("/");
// });

// app.get("/admin", (req, res) => {
//   res.render("admin");
// });

// app.get("/clients", authAdm, (req, res) => {
//   Clients.findAll().then((clients) => {
//     res.render("clients", { clients: clients });
//   })
// });

// app.get("/adm2", (req, res) => {
//   res.render("adm2");
// });

// app.get("/newAdm", (req, res) => {
//   res.render("newAdm");
// });

// app.post("/deleteAdm", authAdm, (req, res) => {
//   var id = req.body.id;
//   if (id != undefined) {
//     if (!isNaN(id)) {
//       Admin.destroy({
//         where: {
//           id: id
//         }
//       }).then(() => {
//         res.redirect("/searchResultAdm");
//       })
//     } else {
//       res.redirect("/clients");
//     }
//   } else {
//     res.redirect("/clients")
//   }
// });

// app.get("/updateAdm/:id", (req, res) => {
//   var id = req.params.id;
//   Admin.findByPk(id).then((admin) => {
//     if (admin != undefined) {
//       res.render("updateAdm", { admin: admin })
//     } else {
//       res.redirect("/")
//     }
//   }).catch((erro) => {
//     res.redirect("/");
//   })
// });

// app.post("/recUpdateAdm", (req, res) => {
//   var id = req.body.id;
//   var nome = req.body.nomeadm;
//   var email = req.body.emailadm;
//   var telefone = req.body.teladm;
//   var cpf = req.body.cpfadm;

//   Admin.update({
//     nome: nome,
//     email: email,
//     telefone: telefone,
//     cpf: cpf
//   }, { where: { id: id } }).then(() => {
//     res.redirect("/searchResultAdm");
//   })
// });

// app.get("/searchResultAdm", (req, res) => {
//   Admin.findAll().then((admins) => {
//     res.render("searchResultAdm", { admins: admins });
//   })
// });


// app.post("/recSearchAdm", (req, res) => {
//   var criterio = req.body.criterio;
//   var valor = req.body.valor;

//   switch (criterio) {
//     case "Nome":
//       Admin.findAll({
//         where: {
//           nome: {
//             [Op.like]: '%' + valor + '%'
//           }
//         }
//       })
//         .then((admins) => {
//           res.render("searchResultAdm", { admins: admins });
//         })
//         .catch((erro) => {
//           res.send("Administrador não encontrado");
//         });
//       break;

//     case "CPF":
//       Admin.findAll({
//         where: { cpf: valor }
//       })
//         .then((admins) => {
//           res.render("searchResultAdm", { admins: admins });
//         })
//         .catch((erro) => {
//           res.send("Administrador não encontrado");
//         });
//       break;

//     case "E-mail":
//       Admin.findAll({
//         where: { email: valor }
//       })
//         .then((clients) => {
//           res.render("searchResultAdm", { admins: admins })
//         })
//         .catch((erro) => {
//           res.send("Administrador não encontrado");
//         });
//       break;

//     default:
//       res.send("Administrador não encontrado");
//   }
// });

// app.post("/newadm", (req, res) => {
//   var nomeadm = req.body.nomeadm;
//   var emailadm = req.body.emailadm;
//   var teladm = req.body.teladm;
//   var cpfadm = req.body.cpfadm;
//   var passadm = req.body.passadm;

//   Admin.findOne({ where: { email: emailadm } })
//     .then((admin) => {
//       if (admin == undefined) {
//         var salt = bcrypt.genSaltSync(10);
//         var hash = bcrypt.hashSync(passadm, salt);
//         Admin.create({
//           nome: nomeadm,
//           email: emailadm,
//           telefone: teladm,
//           cpf: cpfadm,
//           senha: hash
//         }).then(() => {
//           res.redirect("/clients");
//         }).catch((erro) => {
//           res.send("Erro ao cadastrar: " + erro);
//         });
//       } else {
//         res.redirect("/");
//       }
//     })
// });

// app.post("/authenticate", (req, res) => {
//   var email = req.body.email;
//   var pass = req.body.pass;

//   Admin.findOne({ where: { email: email } })
//     .then((admin) => {
//       if (admin != undefined) {
//         var correct = bcrypt.compareSync(pass, admin.senha);
//         if (correct) {
//           req.session.admin = {
//             id: admin.id,
//             email: admin.email
//           }
//           res.redirect("/clients");
//         } else {
//           res.send("E-Mail ou senha incorreto");
//           // res.redirect("/admin");
//         }
//       }
//       else if (email == "admin@max.com" && pass == "admin") {
//         res.redirect("/clients");
//       }
//       else {
//         //colocar o alert de usuário não cadastrado
//         res.redirect("/admin");
//       }
//     })
// });
// ////////////////////////////////////////FIM DAS ROTAS DOS PROFESSORES/////////////////////////////////////////// 

// //ROTAS DOS EXERCÍCIOS
// app.get("/novo-exercicio", (req, res) => {
//   Modalidades.findAll().then((modalidades) => {
//     res.render("newExer", { modalidades: modalidades });
//   });
// });

// app.post("/recExer", (req, res) => {
//   var nome = req.body.nome;
//   var modalidade = req.body.modalidade;
//   Exercicios.create({
//     nome: nome,
//     modalidadeId: modalidade
//   }).then(() => {
//     res.redirect("/clients");
//   }).catch((erro) => {
//     res.send("Houve um erro ao tentar cadastrar o exercício :(");
//   });
// });

// app.get("/nova-modalidade", (req, res) => {
//   res.render("newMod");
// });

// app.post("/recMod", (req, res) => {
//   var modalidade = req.body.modalidade;
//   Modalidades.create({
//     nome: modalidade
//   })
//     .then(() => {
//       res.redirect("/clients");
//     }).catch((erro) => {
//       res.send("Houve um erro ao tentar cadastrar a modalidade :(");
//     })
// });


////////////////////////////////////////FIM DAS ROTAS DOS EXERCÍCIOS/////////////////////////////////////////// 



////////////////////////////////////////////////////
app.listen(3000, (erro) => {
  if (erro) {
    console.log("Falha ao conectar");
  } else {
    console.log("Conexão estabelecida em 127.0.0.1:3000");
  }
});
const express = require("express");
const route = express.Router();
const SiteController = require("./src/controllers/SiteController");
const ClientController = require("./src/controllers/ClientController");
const TeacherController = require("./src/controllers/TeacherController");
const ExerciseController = require("./src/controllers/ExerciseController");


//  ROTAS REFERENTES AO SITE
route.get("/", SiteController.index);
route.get("/contato", SiteController.contato);
route.get("/notificacoes", SiteController.notificacao);
route.post("/delete-not", SiteController.deleteNot);
route.post("/rec-contato", SiteController.recContato);

//  ROTAS REFERENTES AOS CLIENTES
route.get("/login", ClientController.login);
route.get("/newuser", ClientController.newUser);
route.get("/profile", ClientController.profile);
route.get("/dadosPessoais", ClientController.dadosPessoais);
route.get("/medidas", ClientController.medidas);
route.get("/treinoDoDia", ClientController.treinoDoDia);
route.post("/rec", ClientController.newClient);
route.get("/dadosAntropometricos", ClientController.dadosAntropometricos);
route.post("/recDadosAntropometricos", ClientController.recDadosAntropometricos);
route.post("/delete", ClientController.deleteClient);
route.get("/update/:id", ClientController.updateClient);
route.post("/recUpdate", ClientController.recUpdate);
route.get("/searchClient", ClientController.searchClient);
route.post("/recExerCli", ClientController.recExerCli);
route.get("/exercicios/:id", ClientController.exercicios);
route.get("/result", ClientController.result);
route.post("/recSearch", ClientController.recSearch);
route.post("/authUser", ClientController.authUser);

// ROTAS REFERENTES AOS PROFESSORES
route.get("/admDeslog", TeacherController.admDeslog);
route.get("/admin", TeacherController.admin);
route.get("/clients", TeacherController.clients);
route.get("/adm2", TeacherController.adm2);
route.get("/newAdm", TeacherController.newAdm);
route.post("/deleteAdm", TeacherController.deleteAdm);
route.get("/updateAdm/:id", TeacherController.updateAdm);
route.post("/recUpdateAdm", TeacherController.recUpdateAdm);
route.get("/searchResultAdm", TeacherController.searchResultAdm);
route.post("/recSearchAdm", TeacherController.recSearchAdm);
route.post("/newAdm", TeacherController.newAdm);
route.post("/authenticate", TeacherController.authenticate);

//  ROTAS REFERENTES AOS EXERCICIOS
route.get("/novo-exercicio", ExerciseController.newExercise);
route.post("/recExer", ExerciseController.recExer);
route.get("/nova-modalidade", ExerciseController.newModality);
route.post("/recMod", ExerciseController.recMod);


module.exports = route;
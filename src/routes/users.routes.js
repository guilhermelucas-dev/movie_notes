// Importando a classe Router do módulo Express
const  { Router } = require("express");

const UsersController = require("../controllers/UsersController");

// Criando um objeto intanciando a classe Router
const usersRoutes = new Router();

// Definindo rotas //
// Criando um objeto que é uma instância da classe UserController
const userController = new UsersController();
// Definino rotas
usersRoutes.post("/", userController.create);
usersRoutes.put("/:id", userController.update);

// Exportando o objeto usersRoutes, 
// que é uma instância da classe Router do módulo Express
module.exports = usersRoutes;
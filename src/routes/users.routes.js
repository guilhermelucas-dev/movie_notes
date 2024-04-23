// Importando a classe Router do módulo Express
const  { Router } = require("express");
const multer = require("multer");
const uplaodConfig = require("../configs/upload");
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");



// Criando um objeto intanciando a classe Router
const usersRoutes = new Router();
const upload = multer(uplaodConfig.MULTER);

// Definindo rotas //
// Criando um objeto que é uma instância da classe UserController
const userController = new UsersController();
const userAvatarController = new UserAvatarController();
// Definino rotas
usersRoutes.post("/", userController.create);
usersRoutes.put("/", ensureAuthenticated, userController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

// Exportando o objeto usersRoutes, 
// que é uma instância da classe Router do módulo Express
module.exports = usersRoutes;
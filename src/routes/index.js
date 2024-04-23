// importando a classe Router no módulo Express
const { Router } = require("express");

// Importando o objeto usersRoutes do arquivo users.routes.js,
// onde contem as definições das rotas.
const usersRouter = require("./users.routes");
const movieNotesRouter = require("./movienotes.routes");
const movieTagsRouter = require("./movietags.routes");
const sessionsRouter = require("./sessions.routes");


const routes = Router();

// Usando o método use da classe Router, que passa como argumento a rota /users e o roteador usersRouter
// todas as rotas defininadas no objeto usersRouter serão acessadas através do caminho /users
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/notes", movieNotesRouter);
routes.use("/tags", movieTagsRouter);

module.exports = routes;

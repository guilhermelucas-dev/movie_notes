const  { Router } = require("express");

const MovieTagsController = require("../controllers/MovieTagsController");


const movieTagsRoutes = new Router();


const movieTagsController  = new MovieTagsController();

movieTagsRoutes.get("/:user_id", movieTagsController.index);


module.exports = movieTagsRoutes;
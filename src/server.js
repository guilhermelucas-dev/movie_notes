require("express-async-errors");
const database = require("./database/sqlite");
const AppErro = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");

const app = express();
// permite manipulação dos dados no formato json através das requisições
app.use(express.json());

app.use(routes);

database();

app.use((error, request, response, next) => {
  if (error instanceof AppErro) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})
const port = 3333;
app.listen(port, () => console.log(`server is running on port ${port}`));
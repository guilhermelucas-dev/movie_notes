require("express-async-errors");
require("dotenv/config");
const database = require("./database/sqlite");
const AppErro = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
const express = require("express");
const routes = require("./routes");

const cors = require("cors");
const app = express();
// Compartilhamento de Recursos de origem cruzada
// -> mecanismo que permite que recursos de um servior web sejam acessados por um domínio diferente daquele  de onde o recurso originou.
// estamos dizendo ao servidor para incluir cabeçalhos de resposta HTTP permitindo que clientes de qualquer origem façam solicitações ao servidor
app.use(cors());

// permite manipulação dos dados no formato json através das requisições
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

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
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`server is running on port ${port}`));
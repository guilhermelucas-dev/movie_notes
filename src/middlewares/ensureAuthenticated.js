const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

// função middleware que verifica se o pedido(request) possui um token jwt válido no babeçalho de atorização
function ensureAuthenticated(request, response, next) {
  // extrai o cabeçalho de autorização do pedido
  const authHeader = request.headers.authorization;

  // se não hover um cabeçalho de autorização
  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  // extraindo o token do cabeçalho
  const [, token] = authHeader.split(" ");

  try {
    // o método verify do jwt é usado para verificar o token com a chave secreta fornecida em authConfig
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    // se o token for válido, o ID do usuário(user_id) é extraído do token e adicionado a requisição
    request.user = {
      id: Number(user_id),
    }

    // se o token for verificado com sucesso, a função next é chamada para passar o controle para o próximo da pilha
    return next();
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports =  ensureAuthenticated;
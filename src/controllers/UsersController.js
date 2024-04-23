const {hash, compare} = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError"); // importando a class AppErro para lidar com exessões
class UsersController  //classe criada para controlar as requisições e respostas dos metódos https
{

  async create(request, response) {
    const { name, email, password, avatar } = request.body;

    if (!name) {
      throw new AppError("O nome é obrigatório.");
    } else if (!email) {
      throw new AppError("O email é obritatório.");
    } else if (!password) {
      throw new AppError("A senha é obrigatória.")
    } 

    const checkUserEmailExist = await knex('users').select('*').where('email', email);

    if (checkUserEmailExist.length > 0) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);


    console.log(hashedPassword);

    await knex('users').insert({
      name,
      email,
      password: hashedPassword
   });

    return response.status(201).json();
  }
  
  async update(request, response) {
    const {name, email, password, old_password} = request.body;
    const user_id = request.user.id;

    const user = await knex('users').select('*').where('id', user_id).first();

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await knex('users').select('*').where('email', email).first();
    console.log(userWithUpdateEmail);

    if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ??  user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha.")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    const userUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now()
    };

    await knex('users').where('id', user_id).update(userUpdate);

    return response.status(200).json();
  }

}

module.exports = UsersController;
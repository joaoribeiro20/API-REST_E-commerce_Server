import { Request, Response } from 'express'
import { CreateUserService } from '../../model/user/CreateUserService';
import { TypeormUsersRepository } from '../../repositories/typeorm/TypeormUsersRepository';
import { TypeormRolesRepository } from '../../repositories/typeorm/TypeormRolesRepository';

import { newUserSeller } from '../../modules/nodemailer/template/shoppingSeller';
import enviarEmail from '../../modules/nodemailer/configService';


export class CreateUserController {
  async create(req: Request, res: Response) {
    const { name, email, password, roles } = req.body
    if (!name || !email || !password) {
      return res.status(401).json("Todos os campos devem ser preenchidos.");
    }
    const regexPassword = /^\S+\w$/;
    if (!regexPassword.test(password)) {
      return res.status(401).json("Senha invalida, Formato nao aceito");
    }
    const regexEmail = /^\S+\w+@+\w+.+\W+com|\W+br$/;
    if (!regexEmail.test(email)) {
      return res.status(401).json("Email invalido");
    }


    const usersRepository = new TypeormUsersRepository();
    const roleRepository = new TypeormRolesRepository();
    const createUserService = new CreateUserService(usersRepository, roleRepository);

    const result = await createUserService.execute({ name, email, password, roles })

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    if(result.roles[0].name == "seller"){
   
  await enviarEmail(
    email,
    'Cadastro realizado',
    newUserSeller(name),
    '"Bem-vindo!!! - Loja Cofe" <devribeirotestes@hotmail.com>');

    }
    if(result.roles[0].name == "client"){
      const corpoEmail = `
    <h2>${`Olá, ${name},<br> você realizou seu cadastro com sucesso, como um um nossos Clientes!!.`}</h2>
    <p>Venha conferir nossos produtos, nossos clientes possui sempre preferencia </p>
    <a href="${'https://nodemailer.com/smtp/'}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">${"click aqui"}</a>
  `;
  await enviarEmail(
    email,
    'Cadastro realizado',
    corpoEmail,
    '"Bem-vindo!!! - Loja Cofe" <devribeirotestes@hotmail.com>');

    }

    return res.status(201).json(result);


  }
}
import { Request, Response } from 'express'
import { CreateUserService } from '../../model/user/CreateUserService';
import { TypeormUsersRepository } from '../../repositories/typeorm/TypeormUsersRepository';
import { TypeormRolesRepository } from '../../repositories/typeorm/TypeormRolesRepository';


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

    return res.status(201).json(result);


  }
}
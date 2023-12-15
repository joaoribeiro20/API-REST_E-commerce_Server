import { Request, Response } from 'express'
import { CreateUserService } from '../model/user/CreateUserService';
import { TypeormUsersRepository } from '../repositories/typeorm/TypeormUsersRepository';


export class CreateUserController {
  async create(req: Request, res: Response) {
    const { name, email, password} = req.body

    const usersRepository = new TypeormUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const result = await createUserService.execute({ name, email, password })

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);


  }
}
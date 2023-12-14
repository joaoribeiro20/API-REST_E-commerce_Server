import { Request, Response } from 'express'
import { CreateUserService } from '../model/CreateUserService';
import { TypeormUsersRepository } from '../repositories/typeorm/TypeormUsersRepository';

type userType = {
  name: string;
  email: string
  password: string
  roles: [];
  permissions: [];
  id: string;
  created_at: any;
};

export class CreateUserController {
  async create(req: Request, res: Response) {
    const { name, email, password, roles, permissions, id, created_at }: userType = req.body

    const usersRepository = new TypeormUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const result = await createUserService.execute({ name, email, password, roles, permissions, id, created_at })

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);


  }
}
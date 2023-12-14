import { Request, Response } from 'express'
import { TypeormRolesRepository } from '../repositories/typeorm/TypeormRolesRepository'
import { CreateRoleService } from '../model/CreateRoleService';
import { TypeormUsersRepository } from '../repositories/typeorm/TypeormUsersRepository';
import { CreateUserService } from '../model/CreateUserService';
import { LoginUserService } from '../model/LoginUserService';

export class LoginUserController{
    async login(req: Request, res: Response) {
        
        const { email, password} = req.body

        const userRepository = new TypeormUsersRepository();
        const createUserService = new LoginUserService(userRepository);
        const result = await createUserService.execute({email, password})
        
        if (result instanceof Error) {
            return res.status(400).json(result.message);
          }
      
          return res.json(result);
    }
}
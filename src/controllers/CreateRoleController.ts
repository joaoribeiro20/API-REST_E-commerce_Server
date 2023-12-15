import { Request, Response } from 'express'
import { TypeormRolesRepository } from '../repositories/typeorm/TypeormRolesRepository'
import { CreateRoleService } from '../model/role/CreateRoleService';

export class CreateRoleController{
    async create(req: Request, res: Response) {
        
        const { name, description} = req.body

        const roleRepository = new TypeormRolesRepository();
        const createRoleService = new CreateRoleService(roleRepository);
        const result = await createRoleService.execute({name, description})
        
        if (result instanceof Error) {
            return res.status(400).json(result.message);
          }
      
          return res.json(result);
    }
}
import { Request, Response } from 'express'
import { TypeormPermissionsRepository } from '../repositories/typeorm/TypeormPermissionRepository';
import { CreatePermissionService } from '../model/permission/CreatePermissonService';


export class CreatePermissionController{
    async create(req: Request, res: Response) {
        
        const { name, description} = req.body

        const permissionRepository = new TypeormPermissionsRepository();
        const createPermissionService = new CreatePermissionService(permissionRepository);
        const result = await createPermissionService.execute({name, description})
        
        if (result instanceof Error) {
            return res.status(400).json(result.message);
          }
      
          return res.json(result);
    }
}
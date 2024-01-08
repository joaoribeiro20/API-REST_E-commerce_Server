import { Request, Response } from 'express'
import { TypeormRolesRepository } from '../../repositories/typeorm/TypeormRolesRepository';

import { CreateRolePermissionService } from '../../model/role/CreateRolePermissionService';
import { TypeormPermissionsRepository } from '../../repositories/typeorm/TypeormPermissionRepository';


export class CreateRolePermissionController {
    async create(req: Request, res: Response) {
        
    const { roleId } = req.params;
    const { permissions } = req.body;

    const roleRepository = new TypeormRolesRepository();
    const permissionRepository = new TypeormPermissionsRepository();
    const createRolePermissionService = new CreateRolePermissionService(permissionRepository, roleRepository);

    const result = createRolePermissionService.execute({roleId, permissions})

    console.log(result)
    if (result instanceof Error) {
        return res.status(400).json(result.message);
      }
  
      return res.status(201).json(result);
    }
}
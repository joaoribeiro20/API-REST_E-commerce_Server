import { Request, Response } from 'express'
import { TypeormRolesRepository } from '../repositories/typeorm/TypeormRolesRepository';

import { CreateRolePermissionService } from '../model/role/CreateRolePermissionService';
import { TypeormPermissionsRepository } from '../repositories/typeorm/TypeormPermissionRepository';
import { AddUserAcsessControlListService } from '../model/user/AddUserAccessControlListService';
import { TypeormUsersRepository } from '../repositories/typeorm/TypeormUsersRepository';


export class AddUserAcsessControlListController {
    async addUserRolePermission(req: Request, res: Response) {
        
        const { permissions, roles } = req.body;
        const  userId  = req.user.id;
    

    const roleRepository = new TypeormRolesRepository();
    const permissionRepository = new TypeormPermissionsRepository();
    const userRepository = new TypeormUsersRepository();

    const addRolePermission = new AddUserAcsessControlListService(permissionRepository,roleRepository,userRepository);

    if(!userId){
        return res.status(400).json('id do usuario nao indentificado');
    }
    const result = await addRolePermission.execute({userId, roles, permissions})

    console.log(result)
    if (result instanceof Error) {
        return res.status(400).json(result.message);
      }
  
      return res.status(201).json(result);
    }
}
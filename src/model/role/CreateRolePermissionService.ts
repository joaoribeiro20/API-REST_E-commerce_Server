import { Permission } from "../../entities/user/Permission";
import { Role } from "../../entities/user/Role";
import { IPermissionRepository } from "../../repositories/IPermissionRepositories";
import { IRoleRepository } from "../../repositories/IRoleRepositories";

type RolePermissionRequest = {
    roleId: string;
    permissions: string[];
};

export class CreateRolePermissionService {
    constructor(private permissionRepository: IPermissionRepository, private roleRepository: IRoleRepository) { }

    async execute({ roleId, permissions }: RolePermissionRequest): Promise<Error | Role> {
       
        const permissionsExists = await this.permissionRepository.get(permissions);
        if(!permissionsExists){
            return new Error("error na permission")
        }
     
        const role = await this.roleRepository.createRolePermission({ roleId, permissions: permissionsExists });
     
        if(!role){
            return new Error("error na permission")
        }
        return role;

    }
} 
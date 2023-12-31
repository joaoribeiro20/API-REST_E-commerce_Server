import { AppDataSource } from "../../database/data-source";
import { Permission } from "../../entities/user/Permission";
import { IPermissionRepository } from "../IPermissionRepositories";



class TypeormPermissionsRepository implements IPermissionRepository {
    permissionRepository = AppDataSource.getRepository(Permission)

    async create(permission: Permission): Promise<Permission> {

        const permissions = this.permissionRepository.create(permission)
        const newPermisson = await this.permissionRepository.save(permissions)

        return newPermisson
    }

    async exists(name: string): Promise<boolean> {

        const permissionExist = await this.permissionRepository.findOneBy({name:name})

        return !!permissionExist
    }

    async get(names: string[]): Promise<Permission[]> {
        
        
        const permissionRole: Permission[] = [];
    
        for (const name of names) {
            const permissionsExists = await this.permissionRepository.findOneBy({ name });
    
            if (permissionsExists) {
                permissionRole.push(permissionsExists);
            }
        }
    
        return permissionRole;
    }
}

export { TypeormPermissionsRepository }
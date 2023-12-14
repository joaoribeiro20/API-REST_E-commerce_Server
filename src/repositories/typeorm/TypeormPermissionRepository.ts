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

}

export { TypeormPermissionsRepository }
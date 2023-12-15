import { AppDataSource } from "../../database/data-source";
import { Permission } from "../../entities/user/Permission";
import { Role } from "../../entities/user/Role";
import { IRoleRepository } from "../IRoleRepositories";



class TypeormRolesRepository implements IRoleRepository {
    roleRepository = AppDataSource.getRepository(Role)

    async create(role: Role): Promise<Role> {

        const roles = this.roleRepository.create(role)
        const newRole = await this.roleRepository.save(roles)

        return newRole
    }

    async exists(name: string): Promise<boolean> {

        const roleExist = await this.roleRepository.findOneBy({ name: name })

        return !!roleExist
    }

    async createRolePermission(RolePermissionRequest: { roleId: string; permissions: Permission[]; }): Promise<Role | Error> {
        
        const role = await this.roleRepository.findOneBy({ id: RolePermissionRequest.roleId })
        
        if(!role){
            return new Error('role nao eocnytrada')
        }
       
        role.permissions = RolePermissionRequest.permissions;
      
        return role
    }
}

export { TypeormRolesRepository }
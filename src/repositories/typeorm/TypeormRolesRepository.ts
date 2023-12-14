import { AppDataSource } from "../../database/data-source";
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

        const roleExist = await this.roleRepository.findOneBy({name:name})

        return !!roleExist
    }

}

export { TypeormRolesRepository }
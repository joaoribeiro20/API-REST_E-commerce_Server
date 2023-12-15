import { Role } from "../../entities/user/Role";
import { IRoleRepository } from "../../repositories/IRoleRepositories";

type RoleResquest = {
    name:string;
    description:string;
}

export class CreateRoleService{
    constructor(private roleRepository: IRoleRepository) { }

    async execute({ name, description }: RoleResquest): Promise<Error | Role> {

        const roleAlreadyExists = await this.roleRepository.exists(name)

        if(roleAlreadyExists){
            return new Error("Role already exists!")
        }

        const newRole = await this.roleRepository.create({name, description})

        return newRole
    }
} 
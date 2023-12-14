import { Permission } from "../entities/user/Permission";
import { IPermissionRepository } from "../repositories/IPermissionRepositories";

type PermissionResquest = {
    name:string;
    description:string;
}

export class CreatePermissionService{
    constructor(private permissionRepository: IPermissionRepository) { }

    async execute({ name, description }: PermissionResquest): Promise<Error | Permission> {

        const permissionAlreadyExists = await this.permissionRepository.exists(name)

        if(permissionAlreadyExists){
            return new Error("Permission already exists!")
        }

        const newPermission = await this.permissionRepository.create({name, description})

        return newPermission
    }
} 
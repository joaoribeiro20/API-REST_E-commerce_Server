import { Permission } from "../../entities/user/Permission";
import { Role } from "../../entities/user/Role";
import { User } from "../../entities/user/User";
import { IPermissionRepository } from "../../repositories/IPermissionRepositories";
import { IRoleRepository } from "../../repositories/IRoleRepositories";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

type UserACLRequest = {
    userId: string;
    roles: string[];
    permissions: string[];
  };

export class AddUserAcsessControlListService {
    constructor(private permissionRepository: IPermissionRepository, private roleRepository: IRoleRepository, private userRepository: IUsersRepository) { }

    async execute({ userId, roles, permissions }: UserACLRequest): Promise<Error | User> {

        const roleExists = await this.roleRepository.get(roles);
        if(!roleExists){
            return new Error("error na permission")
        }
       
        const permissionsExists = await this.permissionRepository.get(permissions);
        if(!permissionsExists){
            return new Error("error na permission")
        }
     
        const user = await this.userRepository.addRolePermission(userId, {role: roleExists, permissions: permissionsExists});
      
        if(!user){
            return new Error("error na permission")
        }
        return user;

    }
} 
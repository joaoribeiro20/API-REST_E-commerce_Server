import { Permission } from "../entities/user/Permission";
import { Role } from "../entities/user/Role";
type RoleRequest = {
  name:string;
  description:string;
};
type RolePermissionRequest = {
  roleId: string;
  permissions: Permission[];
};

interface IRoleRepository {
    create(role: RoleRequest): Promise<Role>;
    exists(name: string): Promise<boolean>;
    createRolePermission(RolePermissionRequest:RolePermissionRequest): Promise<Role | Error>;
  }
  
  export { IRoleRepository };
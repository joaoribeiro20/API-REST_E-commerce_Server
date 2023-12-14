import { Permission } from "../entities/user/Permission";
type PermissionRequest = {
  name:string;
  description:string;
};

interface IPermissionRepository {
    create(Permission: PermissionRequest): Promise<Permission>;
    exists(name: string): Promise<boolean>;
  }
  
  export { IPermissionRepository };
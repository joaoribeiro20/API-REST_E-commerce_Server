import { Role } from "../entities/user/Role";
type RoleRequest = {
  name:string;
  description:string;
};

interface IRoleRepository {
    create(role: RoleRequest): Promise<Role>;
    exists(name: string): Promise<boolean>;
  }
  
  export { IRoleRepository };
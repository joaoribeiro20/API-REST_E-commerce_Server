import { Permission } from "../entities/user/Permission";
import { Role } from "../entities/user/Role";
import { User } from "../entities/user/User";
type UserRequest = {
  email: string;
  password: string;
  name:string;
  roles: Role[];
};

type RolePermissionRequest = {
  role: Role[];
  permissions: Permission[];
};

interface IUsersRepository {
  /* ----CRUD---- */
  create(user: UserRequest): Promise<User>;
  get(email: string ): Promise<User | null>
  delete(id:string): Promise<User | Error>
  update(idUser: string, userUpdate: UserRequest): Promise<User | Error>
  /*  ----Funções espeficicas---- */
  addRolePermission(id: string, RolePermissionRequest:RolePermissionRequest ): Promise<User | Error>

  /*  ---- funçoes genericas ---- */
  exists(email: string): Promise<boolean>;
}



export { IUsersRepository };

import { Permission } from "../../entities/user/Permission";
import { Role } from "../../entities/user/Role";
import { User } from "../../entities/user/User";
import { IUsersRepository } from "../IUsersRepositories";
import { v4 as uuid } from "uuid";

class UsersRepositoryInMemory implements IUsersRepository {
  
  private users: User[] = [];

  async create(user: User): Promise<User> {
    Object.assign(user, {
      id: uuid(),
    });

    this.users.push(user);
    return user;
  }

  async exists(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.email === email);
    return user;
  }
  
  
  
  
  get(email: string): Promise<User | null> {
      throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<User | Error> {
      throw new Error("Method not implemented.");
  }
  update(idUser: string, userUpdate: { email: string; password: string; name: string; roles: Role[]; }): Promise<User | Error> {
      throw new Error("Method not implemented.");
  }
  addRolePermission(id: string, RolePermissionRequest: { role: Role[]; permissions: Permission[]; }): Promise<User | Error> {
      throw new Error("Method not implemented.");
  }
}

export { UsersRepositoryInMemory };
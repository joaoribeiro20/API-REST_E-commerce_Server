import { User } from "../entities/user/User";


interface IUsersRepository {
  create(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
}

export { IUsersRepository };
import { User } from "../entities/user/User";
type UserRequest = {
  email: string;
  password: string;
  name:string;
};

interface IUsersRepository {
  create(user: UserRequest): Promise<User>;
  exists(email: string): Promise<boolean>;
}

export { IUsersRepository };
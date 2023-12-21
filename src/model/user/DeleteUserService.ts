import { error } from "console";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { User } from "../../entities/user/User";


type UserRequest = {
    id?: string; // Make the 'id' property optional
  };
  
  class DeleteUserService {
    constructor(private usersRepository: IUsersRepository) {}
  
    async execute({ id }: UserRequest): Promise<User | Error> {
      // Ensure 'id' is not undefined before proceeding
      if (id === undefined) {
        return new Error('Invalid ID');
      }
  
      const deleteUser = await this.usersRepository.delete(id);
  
      if (deleteUser instanceof Error) {
        
        return deleteUser;
      }
  
      return deleteUser;
    }
  }

export { DeleteUserService }

import { AppDataSource } from "../../database/data-source";
import { User } from "../../entities/user/User";
import { IUsersRepository } from "../IUsersRepositories";

class TypeormUsersRepository implements IUsersRepository {
 userRepository = AppDataSource.getRepository(User)
  async exists(email: string): Promise<boolean> {

    const userExist = await this.userRepository.findOneBy({email:email})

    return !!userExist;
  }

  async create({ name, email, password }: User): Promise<User> {
  
    const newUser = this.userRepository.create({ name, email, password })

    await this.userRepository.save(newUser)
    
    return newUser;
  }

  async get(email: string): Promise<User | null> {
    
    const userExist = await this.userRepository.findOne({
      where: { email },
      relations: {
        roles:true,
        permissions:true
      },
    });

    return userExist 
  }
}

export { TypeormUsersRepository };
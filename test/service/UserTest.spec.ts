import { User } from "../../src/entities/user/User";
import { CreateUserService } from "../../src/model/user/CreateUserService"
import { IUsersRepository } from "../../src/repositories/IUsersRepositories";
import { UsersRepositoryInMemory } from '../../src/repositories/typeorm/UsersRepositoryInMemory';
import {beforeAll, describe, expect, it, jest,} from '@jest/globals';
import { AppDataSource } from '../../src/database/data-source'
type u = {
  email: string;
  password: string;
  name:string;

  id:string, 
  
}
/* 
jest.mock('...', () => {
    return {
      UsersRepositoryInMemory: jest.fn().mockImplementation(() => ({
        // Implemente métodos específicos, se necessário
        // Por exemplo:
        save: jest.fn(),
        findByUsername: jest.fn(),
      })),
    };
  });
 */

  
describe("Create user", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
     usersRepository = new UsersRepositoryInMemory();
     createUserService = new CreateUserService(usersRepository);
  }); 
  

  it("should be able to create a new user", async () => {

    const usera: User = {
    name:"teste",
    password:"teste",   
    email:"teste@gmail.com",
    roles:[], permissions:[], id:'', created_at: new Date
    };

    const result = await createUserService.execute(usera);
      // The result is a User
      const user: u = result;
      console.log(user);
      expect(user).toHaveProperty("id");
      expect(user.email).toBe("teste@gmail.com");
    
  });

 it("should not be able to create an existing user", async () => {

    const userData: User = {
        name:"teste",
        password:"teste",
        email:"tesa@gmail.com",
        roles:[], permissions:[], id:'', created_at: new Date
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(new Error("User already exists!") );
  }); 
});
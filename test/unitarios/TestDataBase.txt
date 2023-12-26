import { beforeAll,afterAll, expect, it, describe } from '@jest/globals';
import { AppDataSource } from '../../src/database/data-source';
import { User } from "../../src/entities/user/User";
import { CreateUserService } from "../../src/model/user/CreateUserService"
import { IUsersRepository } from "../../src/repositories/IUsersRepositories";
import { TypeormUsersRepository } from '../../src/repositories/typeorm/TypeormUsersRepository';

describe('Testando configDB', () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;

  beforeAll(async () => {
    await AppDataSource.initialize(); // Ensure that the database connection is successful
    usersRepository = new TypeormUsersRepository();
    createUserService = new CreateUserService(usersRepository);
  });

  it.skip('d', async () => {
    const userData: User = {
      name: "teytytste",
      password: "teyste",
      email: "testtye@gmail.com",
      roles: [],
      permissions: [],
      id: '',
      created_at: new Date(),
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("id");
  });

  afterAll(async () => {
    await AppDataSource.close(); // Close the database connection after all tests
  });
});
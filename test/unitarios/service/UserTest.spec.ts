
import { CreateUserService } from "../../../src/model/user/CreateUserService";
import { LoginUserService } from "../../../src/model/user/LoginUserService";
import { IUsersRepository } from "../../../src/repositories/IUsersRepositories";
import { beforeAll, describe, expect, it, jest } from "@jest/globals";

import {  mockAddAccountParams, mockUserModel } from "../../common/TestUtilUser";
import { hash } from "bcryptjs";
import { User } from "../../../src/entities/user/User";



// Mock the repository
const mockUsersRepository: jest.Mocked<IUsersRepository> = {
  create: jest.fn(),
  exists: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  addRolePermission: jest.fn(),
  // Add any other methods that your repository interface has
};

describe("Create user", () => {
  let createUserService: CreateUserService;
  let loginUserService: LoginUserService;

  beforeAll(() => {
    createUserService = new CreateUserService(mockUsersRepository);
    loginUserService = new LoginUserService(mockUsersRepository);
  });

  it("Criar novo usuario", async () => {
    mockUsersRepository.create.mockResolvedValue(mockUserModel)
    
    const result = await createUserService.execute(mockAddAccountParams);

    if (result instanceof User) {
      // Assertions for successful user creation
      expect(result).toHaveProperty("id");
      expect(result.email).toBe("teste@gmail.com");
    } else {
      // Assertion for error case (if applicable)
    }
  });

/*   it("validar se usuario ja existe", async () => {
    mockUsersRepository.exists.mockResolvedValue(true);
    
    const reuslt = createUserService.execute(mockUserModel)
    expect(reuslt).toBe("User already exists!");

  }); */

 /*  it("buscar usuario pelo email", async () => {
    mockUsersRepository.get.mockResolvedValue(mockUserModel);
    const login = {
      email: "eeee@gmail.com",
      password: "d555aad345",
    }

    const result = await loginUserService.execute(login);
    expect(result).toHaveProperty("token")
  }); */
});


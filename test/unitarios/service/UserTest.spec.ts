
import { CreateUserService } from "../../../src/model/user/CreateUserService";
import { LoginUserService } from "../../../src/model/user/LoginUserService";
import { IUsersRepository } from "../../../src/repositories/IUsersRepositories";
import { beforeAll, describe, expect, it, jest } from "@jest/globals";

import {  mockAddAccountParams, mockUserModel } from "../../common/TestUtilUser";
import { hash } from "bcryptjs";



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

  it.skip("Criar novo usuario", async () => {
/*     mockUsersRepository.create.mockImplementation((async (user: User) => ({
      ...user,
      id: uuidv4(), 
    }))) */

    mockUsersRepository.create.mockResolvedValue(mockUserModel)
    
    const result = await createUserService.execute(mockAddAccountParams);

    expect(result).toHaveProperty("id");
  /*   expect(result.email).toBe("teste@gmail.com"); */
  });

  it.skip("validar se usuario ja existe", async () => {
    mockUsersRepository.exists.mockResolvedValue(true);

    await expect(createUserService.execute(mockUserModel)).rejects.toEqual(new Error("User already exists!"));

  });
/* 
  it("buscar usuario pelo email", async () => {
    mockUsersRepository.get.mockResolvedValue(mockUserModel);
    const login = {
      email: "teste@gmail.com", 
      password: await hash("448fsfsdfcds", 8)
    }

    const result = await loginUserService.execute(login);
    expect(result).toHaveProperty("token")
  }); */
});


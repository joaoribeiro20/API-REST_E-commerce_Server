
import { CreateUserService } from "../../../src/model/user/CreateUserService";
import { LoginUserService } from "../../../src/model/user/LoginUserService";
import { IUsersRepository } from "../../../src/repositories/IUsersRepositories";
import { beforeAll, describe, expect, it, jest } from "@jest/globals";

import jwt from 'jsonwebtoken'
import { mockAddAccountParams, mockUserModel } from "../../common/TestUtilUser";
import { compare, hash } from "bcryptjs";
import { User } from "../../../src/entities/user/User";
import { IRoleRepository } from "../../../src/repositories/IRoleRepositories";



const mockUsersRepository: jest.Mocked<IUsersRepository> = {
  create: jest.fn(),
  exists: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  addRolePermission: jest.fn(),
  updatePassword: jest.fn()
};
const mockRoleRepository: jest.Mocked<IRoleRepository> = {
  create: jest.fn(),
  exists: jest.fn(),
  get: jest.fn(),
  createRolePermission: jest.fn()
  
};

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe("Create user", () => {
  let createUserService: CreateUserService;
  let loginUserService: LoginUserService;

  beforeAll(() => {
    createUserService = new CreateUserService(mockUsersRepository, mockRoleRepository);
    loginUserService = new LoginUserService(mockUsersRepository);
  });

  it("Criar novo usuario", async () => {
    mockUsersRepository.create.mockResolvedValue(mockUserModel)

    const result = await createUserService.execute(mockAddAccountParams);

    if (result instanceof User) {

      expect(result).toHaveProperty("id");
      expect(result.email).toBe("teste@gmail.com");
    } else {
     
    }
  });

  it("validar se usuario ja existe", async () => {
    mockUsersRepository.exists.mockResolvedValue(true);
  
    await expect(createUserService.execute(mockAddAccountParams)).resolves.toEqual(new Error('User already exists!'));

  });

 it("buscar usuario pelo email", async () => {
     mockUsersRepository.get.mockResolvedValue(mockUserModel);

     (compare as jest.Mock).mockReturnValue(true);
     (jwt.sign as jest.Mock).mockReturnValue(true);
     const login = {
       email: "eeee@gmail.com",
       password: "d555aad345",
     }
 
     const result = await loginUserService.execute(login);
     expect(result).toHaveProperty("token")
   }); 

   it("token nao gerado", async () => {
    mockUsersRepository.get.mockResolvedValue(mockUserModel);

    (compare as jest.Mock).mockReturnValue(true);

    (jwt.sign as jest.Mock).mockReturnValue(false);
    
    const login = {
      email: "eeee@gmail.com",
      password: "d555aad345",
    }

    await expect(
      loginUserService.execute(login)
      ).resolves.toEqual(new Error ('token nao foi gerado'));
  }); 
});


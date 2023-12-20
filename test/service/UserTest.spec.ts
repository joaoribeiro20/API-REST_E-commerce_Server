import { User } from "../../src/entities/user/User";
import { CreateUserService } from "../../src/model/user/CreateUserService";
import { IUsersRepository } from "../../src/repositories/IUsersRepositories";
import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { v4 as uuidv4 } from 'uuid';
import { mockAddAccountParams, mockUserModel } from "../common/TestUtilUser";

type u = {
  email: string;
  password: string;
  name: string;
  id: string;
};

// Mock the repository
const mockUsersRepository: jest.Mocked<IUsersRepository> = {
  create: jest.fn(),
  exists: jest.fn(),
  get:jest.fn(),
  update:jest.fn(),
  delete:jest.fn(),
  addRolePermission:jest.fn(),
  // Add any other methods that your repository interface has
};

describe("Create user", () => {
  let createUserService: CreateUserService;

  beforeAll(() => {
    createUserService = new CreateUserService(mockUsersRepository);
  });

  it("should be able to create a new user", async () => {
    mockUsersRepository.create.mockImplementation((async (user: User) => ({
      ...user,
      id: uuidv4(), // Assign a unique identifier
    })))
    const result = await createUserService.execute(mockAddAccountParams);

    // The result is a User
    expect(result).toHaveProperty("id");
    expect(result.email).toBe("teste@gmail.com");
  });

  it("should not be able to create an existing user", async () => {
    const userData: User = {
      name: "teste",
      password: "teste",
      email: "tesaf@gmail.com",
      roles: [],
      permissions: [],
      id: "",
      created_at: new Date(),
    };

    // Mock the behavior of the repository's methods as needed
    mockUsersRepository.exists.mockResolvedValue(true);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new Error("User already exists!")
    );

    // Optionally, you can make assertions on the mock's method calls
   /*  expect(mockUsersRepository.exists).toHaveBeenCalledWith("tesa@gmail.com");
    expect(mockUsersRepository.create).not.toHaveBeenCalled(); */
  });
});
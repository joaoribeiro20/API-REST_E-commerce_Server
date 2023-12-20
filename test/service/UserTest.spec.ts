import { User } from "../../src/entities/user/User";
import { CreateUserService } from "../../src/model/user/CreateUserService";
import { IUsersRepository } from "../../src/repositories/IUsersRepositories";
import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { v4 as uuidv4 } from 'uuid';

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
    // Mock the behavior of the repository's methods as needed
    mockUsersRepository.exists.mockResolvedValue(false);
    mockUsersRepository.create.mockImplementation((async (user: User) => ({
      ...user,
      id: uuidv4(), // Assign a unique identifier
    })))
    const usera: User = {
      name: "teste",
      password: "teste",
      email: "teste@gmail.com",
      roles: [],
      permissions: [],
      id: "",
      created_at: new Date(),
    };

    const result = await createUserService.execute(usera);

    // The result is a User
    const user: u = result;
    console.log(user);
    expect(user).toHaveProperty("id");
    expect(user.email).toBe("teste@gmail.com");

    // Optionally, you can make assertions on the mock's method calls
    /* expect(mockUsersRepository.exists).toHaveBeenCalledWith("teste@gmail.com");
    expect(mockUsersRepository.create).toHaveBeenCalledWith(usera); */
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
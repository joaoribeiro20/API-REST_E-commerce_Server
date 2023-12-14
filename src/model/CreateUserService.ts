import { hash } from "bcryptjs";
import { User } from "../entities/user/User";
import { IUsersRepository } from "../repositories/IUsersRepositories";
import { Console } from "console";

type UserRequest = {
    email: string;
    password: string;
    name: string;
};

export class CreateUserService {
    constructor(private usersRepository: IUsersRepository) { }

    async execute({ name, password, email }: UserRequest): Promise<Error | User> {

        const userAlreadyExists = await this.usersRepository.exists(email);
        
        if (userAlreadyExists) {
            return new Error("User already exists!");
        }

        const passwordHash = await hash(password, 8);


        const user = await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
        })

        return user;
    }
}
import { hash } from "bcryptjs";
import { User } from "../../entities/user/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { BadRequestError } from '../../helpers/api-erros'
import { Role } from "../../entities/user/Role";

type UserRequest = {
    email: string;
    password: string;
    name: string;
    roles: Role[]
};

export class CreateUserService {
    constructor(private usersRepository: IUsersRepository) { }

    async execute({ name, password, email, roles }: UserRequest): Promise<Error | User> {

        const userAlreadyExists = await this.usersRepository.exists(email);
        
        if (userAlreadyExists) {
            /* throw new BadRequestError("User already exists!") */
            return new Error("User already exists!");
        }

        const passwordHash = await hash(password, 8);


        const user = await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            roles: roles
        })

        return user;
    }
}
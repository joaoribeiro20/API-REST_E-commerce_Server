import { hash } from "bcryptjs";
import { User } from "../../entities/user/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { BadRequestError } from '../../helpers/api-erros'
import { Role } from "../../entities/user/Role";
import { error } from "console";

type UserRequest = {
    email: string;
    password: string;
    name: string;
    roles: Role[]
};

export class CreateUserService {
    constructor(private usersRepository: IUsersRepository) { }

    async execute({ name, password, email, roles }: UserRequest): Promise<User | Error> {
        try {
            const userAlreadyExists = await this.usersRepository.exists(email);

            if (userAlreadyExists) {
                
                throw new Error('User already exists!');
            }/* throw new BadRequestError("User already exists!") */

            const passwordHash = await hash(password, 8);

            if (passwordHash == password) {
                throw new Error("Senha nao crptografada!");
            }

            const user = await this.usersRepository.create({
                name,
                password: passwordHash,
                email,
                roles: roles
            })

            return user;
        } catch (error: any) {
            return new Error(error.message);
        }


    }
}
import { hash } from "bcryptjs";
import { User } from "../../entities/user/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { BadRequestError } from '../../helpers/api-erros'
import { Role } from "../../entities/user/Role";
import { error } from "console";
import { IRoleRepository } from "../../repositories/IRoleRepositories";

type UserRequest = {
    email: string;
    password: string;
    name: string;
    roles: string[]
};

export class CreateUserService {
    constructor(private usersRepository: IUsersRepository, private roleRepository: IRoleRepository) { }

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

            const roleUserStart = await this.roleRepository.get(roles)

            if (roleUserStart.length === 0) {
                throw new Error('Role not exist');
            }

            console.log(roleUserStart)

            const user = await this.usersRepository.create({
                name,
                password: passwordHash,
                email,
                roles: roleUserStart
            })

            return user;
        } catch (error: any) {
            return new Error(error.message);
        }


    }
}
import { hash } from "bcryptjs";
import { User } from "../entities/user/User";
import { IUsersRepository } from "../repositories/IUsersRepositories";
import { Console } from "console";

type UserRequest = {
    email: string;
    password: string;
    name:string;
    roles:[];
    permissions:[];
    id:string;
    created_at:any;
};

export class CreateUserService {
    constructor(private usersRepository: IUsersRepository) { }

    async execute({ name, password, email, roles, permissions,id, created_at }: UserRequest): Promise<Error | User> {

        const userAlreadyExists = await this.usersRepository.exists(email);
        console.log(userAlreadyExists)
        if (userAlreadyExists) {
           return new Error("User already exists!");
        }

        const passwordHash = await hash(password, 8);


        const user = await this.usersRepository.create({ 
            name, 
            password:passwordHash, 
            email, 
            roles, 
            permissions,
            id, 
            created_at 
        })

        return user;
    }
}
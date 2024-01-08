import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { User } from "../../entities/user/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { Role } from '../../entities/user/Role';
import { Permission } from '../../entities/user/Permission';

type UserRequest = {
    email: string;
    password: string;
};

type UserData = {
    user: {
        name: string;
        email: string;
        roles: Role[];
        permissions: Permission[];
        id: string;
        created_at: Date;
    };
    token: string;
}



class LoginUserService {
    constructor(private userRepository: IUsersRepository) { }

    async execute({ email, password }: UserRequest): Promise<Error | UserData> {
        try {
            const emailExist = await this.userRepository.get(email, '');

            if (!emailExist) {
                return new Error("Email does not exist!");
            }

            const verifyPass = await compare(password, emailExist.password);

            if (!verifyPass) {
                return new Error('password is invalid');
            }
 
            const jwtSecret = process.env.JWT_PASS;

            if (!jwtSecret) {
                throw new Error('JWT secret key is not defined');
            }

            const token = jwt.sign({ id: emailExist.id, roles: emailExist.roles }, jwtSecret, { expiresIn: '8h' });

            if(!token){
                return new Error('token nao foi gerado');
            }

            const { password: _, ...userLogin } = emailExist;
            const info = { user: userLogin, token: token };

            return info;
        } catch (error) {
            console.error(error);
            return new Error('An error occurred during login');
        }
    }
}
/* 
class LoginUserService {
    constructor(private userRepository: IUsersRepository) { }

    async execute({ email, password }: UserRequest): Promise<Error | UserData> {

        const emailExist= await this.userRepository.get(email)
        console.log(emailExist)
        if (!emailExist) {
            return new Error("Email does not exist!");
        }

        const verifyPass = await compare(password, emailExist.password)

        if (!verifyPass) {
            return new Error('E-mail ou senha inválidos')
        }

        const token = jwt.sign({ id: emailExist.id }, process.env.JWT_PASS ?? '', {expiresIn: '8h',})

        const { password: _, ...userLogin } = emailExist
        const info = ({user: userLogin,token: token
        })

        return info

    }

} */



export { LoginUserService }
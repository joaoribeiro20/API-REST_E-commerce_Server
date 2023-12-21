import { User } from "../../entities/user/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";


class UpdateUserService {
    constructor(private userRepository: IUsersRepository) { }
    
    async execute({ email, password }): Promise<User | Error> {
        try {

        }
    }

} 
export { UpdateUserService }
import { IUsersRepository } from "../../../repositories/IUsersRepositories";


class addInfoUser {
    constructor(private userRepository: IUsersRepository) { }
    
    async execute({ email, password }): Promise<Error | UserData> {
        try {
        }

} 
}
export { addInfoUser }
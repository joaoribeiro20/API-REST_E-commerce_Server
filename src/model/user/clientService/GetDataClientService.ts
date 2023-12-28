import { ClientInfo } from "../../../entities/user/ClientInfo"
import { IUsersRepository } from "../../../repositories/IUsersRepositories"


class GetDataClientService{
    constructor(private usersRepository: IUsersRepository) { }
    async execute(idUserClient:string): Promise<Error | ClientInfo> {
console.log(idUserClient)
             const dataClienr = await this.usersRepository.getDataClient(idUserClient)
             return dataClienr

    }
}

export { GetDataClientService }
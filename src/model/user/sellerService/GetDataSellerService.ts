import { SellerInfo } from "../../../entities/user/SellerInfo";
import { IUsersRepository } from "../../../repositories/IUsersRepositories";



class GetDataSellerService{
    constructor(private usersRepository: IUsersRepository) { }
    async execute(idUserSeller:string): Promise<Error | SellerInfo> {

             const dataSeller = await this.usersRepository.getDataSeller(idUserSeller)
             return dataSeller

    }
}

export {GetDataSellerService}
import { SellerInfo } from "../../../entities/user/SellerInfo";
import { IUsersRepository } from "../../../repositories/IUsersRepositories";
type dataUserSeller = {
    idUserSeller: string, 
    cnpj: number,       
    telefone: number,
    celular: number,
    cep: number,
    cidade: string,      
    bairro: string,
    endereco: string,
    numero: number,
    razaoSocial: string
}

class AddInforSellerService {
    constructor(private usersRepository: IUsersRepository) { }
    async execute({
        idUserSeller,cnpj,telefone,
        celular,cep,cidade,bairro,endereco,
        numero,razaoSocial 
    }: dataUserSeller): Promise<Error | SellerInfo> {
        try {
            const dataInfoUser = await this.usersRepository.addInfoSeller({
                idUserSeller,cnpj,telefone,
                celular,cep,cidade,bairro,endereco,
                numero,razaoSocial 
            })
            console.log(dataInfoUser)

            return dataInfoUser;
        } catch(error) {
            return new Error("error");
        }

    }
}
export { AddInforSellerService }
import { User } from "../../../entities/user/User";
import { IUsersRepository } from "../../../repositories/IUsersRepositories";


type dataUserSeller = {
 
   idUserSeller:string,cnpj:number,telefone:number,celular:number,
    cep:number,cidade:string,bairro:string,
    endereco:string,numero:number,razaoSocial:string
}

class UpdateAllInfoSellerService {
    constructor(private userRepository: IUsersRepository) { }
    
    async execute({ 
        idUserSeller,cnpj, telefone, celular, cep,
        cidade, bairro, endereco,
        numero, razaoSocial }:dataUserSeller): Promise<dataUserSeller | Error> {
        try {
            const result = await this.userRepository.updateInfoSeller({ idUserSeller,cnpj, telefone, celular, cep,
                cidade, bairro, endereco,
                numero, razaoSocial })

                return result
        }catch{
            return new Error('da')
        }
    }

} 
export { UpdateAllInfoSellerService }
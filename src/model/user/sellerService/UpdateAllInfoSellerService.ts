import { User } from "../../../entities/user/User";
import { IUsersRepository } from "../../../repositories/IUsersRepositories";


type dataUserSeller = {
    email:string, password:string,idUserSeller:String,
    cnpj:Number,telefone:Number,celular:Number,
    cep:Number,cidade:String,bairro:String,
    endereco:String,numero:String,razaoSocial:string
}

class UpdateAllInfoSellerService {
    constructor(private userRepository: IUsersRepository) { }
    
    async execute({ 
        email, password, idUserSeller,
        cnpj, telefone, celular, cep,
        cidade, bairro, endereco,
        numero, razaoSocial }:dataUserSeller): Promise<User | Error> {
        try {

        }catch{
            
        }
    }

} 
export { UpdateAllInfoSellerService }
import { IUsersRepository } from "../../../repositories/IUsersRepositories";


type dataUserSeller = {
    idUserSeller:String,
    cnpj:Number,
    telefone:Number,
    celular:Number,
    cep:Number,
    cidade:String,
    bairro:String,
    endereco:String,
    numero:String,
    razaoSocial:string
}

class addInforSeller {
    constructor(private userRepository: IUsersRepository) { }
    
    async execute({ idUserSeller, cnpj, telefone, celular, cep, cidade, bairro, endereco, numero, razaoSocial }: dataUserSeller): Promise<Error | string> {
        try {
        }catch{}

} 
}
export { addInforSeller }
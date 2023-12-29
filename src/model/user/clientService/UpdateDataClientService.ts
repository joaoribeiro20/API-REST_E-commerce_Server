import { IUsersRepository } from "../../../repositories/IUsersRepositories";


type dataClient ={
     idUserClient: string; cpf: number; celular: number; 
    cep: number; cidade: string; bairro: string; endereco: string; numero: number; 
}

class UpdateDataClientService{
    constructor(private userRepository: IUsersRepository) { }

    async execute({ idUserClient, cpf, celular, cep, cidade, bairro, endereco, numero, }:dataClient): Promise<dataClient | Error> {
        try {
            const result = await this.userRepository.updateInfoClient({ 
                 idUserClient, cpf, celular, cep, cidade, bairro, endereco, numero
                })

                return result
        }catch{
            return new Error('da')
        }
    }
}

export { UpdateDataClientService }
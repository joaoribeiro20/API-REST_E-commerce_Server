import { ClientInfo } from "../../../entities/user/ClientInfo";
import { IUsersRepository } from "../../../repositories/IUsersRepositories";

type dataUserClient = {
    idUserClient:string,
    cpf:number,
    celular:number,
    cep:number,
    cidade:string,
    bairro:string,
    endereco:string,
    numero:number
  }

class AddDataClientService {
    constructor(private userRepository: IUsersRepository) { }

    async execute({ idUserClient, cpf, celular, cep, cidade, bairro, endereco, numero, }: dataUserClient): Promise<Error | ClientInfo> {

        const result = await this.userRepository.addDataClient({ idUserClient, cpf, celular, cep, cidade, bairro, endereco, numero, })

        if(result instanceof Error){
            return new Error("error service")
        }
        return result
    }
}

export { AddDataClientService }
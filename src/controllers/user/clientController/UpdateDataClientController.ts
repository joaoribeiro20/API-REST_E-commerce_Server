import { Request, Response } from 'express'
import { TypeormUsersRepository } from "../../../repositories/typeorm/TypeormUsersRepository";
import { UpdateDataClientService } from '../../../model/user/clientService/UpdateDataClientService';

export class UpdateDataClientController{
    async updateDataClient(req: Request, res: Response) {
        const { cpf, celular, cep, cidade, bairro, endereco, numero,  } = req.body
        const idUserClient = req.user.id

        const userRepository = new TypeormUsersRepository()
        const updateDataClient = new UpdateDataClientService(userRepository)

        if (!idUserClient) {
            return res.status(400).json({ error: 'id user nao recuperado' });
        }

        const result = await updateDataClient.execute({idUserClient,cpf, celular, cep, cidade, bairro, endereco, numero})
        if(result instanceof Error){
            return res.status(400).json(result.message)
        }
        
        return res.status(200).json(result);
    }
}
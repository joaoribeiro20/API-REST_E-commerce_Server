import { Request, Response } from 'express'
import { TypeormUsersRepository } from "../../../repositories/typeorm/TypeormUsersRepository";
import { AddDataClientService } from '../../../model/user/clientService/AddDataClientService';




export class AddDataClientController{
    async addDataClient(req: Request, res: Response) {
        const { cpf, celular, cep, cidade, bairro, endereco, numero } = req.body
        const idSeller = req.user.id


        if (!cpf || !celular || !cep || !cidade || !bairro || !endereco || !numero ) {
            return res.status(400).json({ error: 'Dados invalidos' });
        }
        if (!idSeller) {
            return res.status(400).json({ error: 'id user nao recuperado' });
        }

        const usersRepository = new TypeormUsersRepository();
        const addDataClient = new AddDataClientService(usersRepository);

        const result = await addDataClient.execute({ idUserClient:idSeller, cpf, celular, cep, cidade, bairro, endereco, numero, })

        if(result instanceof Error){
            return res.status(400).json(result.message)
        }

        return res.status(201).json(result)
    }
}
import { Request, Response } from 'express'
import { TypeormUsersRepository } from "../../../repositories/typeorm/TypeormUsersRepository";
import { GetDataClientService } from '../../../model/user/clientService/GetDataClientService';




export class GetDataClientController {
    async getData(req: Request, res: Response) {
        const idClient = req.user.id
    
    console.log(idClient)
        const usersRepository = new TypeormUsersRepository();
        const getDataClient = new GetDataClientService(usersRepository);

        if (!idClient) {
            return res.status(400).json({ error: 'id user nao recuperado' });
        }
        console.log(idClient)
        const result = await getDataClient.execute(idClient)

        if(result instanceof Error){
            return res.status(400).json(result.message)
        }
        
        return res.status(200).json(result);
    }
}
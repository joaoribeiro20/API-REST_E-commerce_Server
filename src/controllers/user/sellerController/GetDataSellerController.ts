import { Request, Response } from 'express'
import { TypeormUsersRepository } from "../../../repositories/typeorm/TypeormUsersRepository";
import { GetDataSellerService } from '../../../model/user/sellerService/GetDataSellerService';




export class GetDataSellerController {
    async getData(req: Request, res: Response) {
        const idSeller = req.user.id
        
        const usersRepository = new TypeormUsersRepository();
        const getDataSeller = new GetDataSellerService(usersRepository);

        if (!idSeller) {
            return res.status(400).json({ error: 'id user nao recuperado' });
        }

        const result = await getDataSeller.execute(idSeller)

        if(result instanceof Error){
            return res.status(400).json(result.message)
        }
        
        return res.status(200).json(result);
    }
}
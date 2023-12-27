import { Request, Response } from 'express'
import { TypeormUsersRepository } from "../../../repositories/typeorm/TypeormUsersRepository";
import { UpdateAllInfoSellerService } from '../../../model/user/sellerService/UpdateAllInfoSellerService';

export class UpdateAllInfoSellerController {
    async updateAllInfoSeller(req: Request, res: Response) {
        const { cnpj, telefone, celular, cep, cidade, bairro, endereco, numero, razaoSocial } = req.body
        const idSeller = req.user.id

        const userRepository = new TypeormUsersRepository();
        const updateDataSeller = new UpdateAllInfoSellerService(userRepository);

        if (!idSeller) {
            return res.status(400).json({ error: 'id user nao recuperado' });
        }

        const result = await updateDataSeller.execute({ idUserSeller:idSeller, cnpj, telefone, celular, cep, cidade, bairro, endereco, numero, razaoSocial })

        
        if(result instanceof Error){
            return res.status(400).json(result.message)
        }
        
        return res.status(200).json(result);
    }
}
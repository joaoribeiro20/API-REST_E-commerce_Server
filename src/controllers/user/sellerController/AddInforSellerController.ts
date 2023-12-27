import { Request, Response } from 'express'
import { TypeormUsersRepository } from "../../../repositories/typeorm/TypeormUsersRepository";
import { AddInforSellerService } from '../../../model/user/sellerService/AddInforSellerService';



export class AddInforSellerController {
    async addDataSeller(req: Request, res: Response) {
        const { cnpj, telefone, celular, cep, cidade, bairro, endereco, numero, razaoSocial } = req.body
        const idSeller = req.user.id

        if (!cnpj || !telefone || !celular || !cep || !cidade || !bairro || !endereco || !numero || !razaoSocial) {
            return res.status(400).json({ error: 'Dados invalidos' });
        }
        if (!idSeller) {
            return res.status(400).json({ error: 'id user nao recuperado' });
        }
       
            const usersRepository = new TypeormUsersRepository();
            const addInforSeller = new AddInforSellerService(usersRepository);

            const result = await addInforSeller.execute({ idUserSeller: idSeller, cnpj, telefone, celular, cep, cidade, bairro, endereco, numero, razaoSocial })
            
            if(result instanceof Error){
                return res.status(400).json(result.message)
            }
            
            return res.status(200).json(result);
      

    }

}
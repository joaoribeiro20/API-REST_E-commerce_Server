import { Request, Response } from 'express'
import { addInforSellerService } from "../../../model/user/sellerService/addInforSellerService";
import { TypeormUsersRepository } from "../../../repositories/typeorm/TypeormUsersRepository";



export class AddInforSellerController {
    async addDataSeller(req: Request, res: Response) {
        const { cnpj, telefone, celular, cep, cidade, bairro, endereco, numero, razaoSocial } = req.body
        const idSeller = req.user.id

        if (!cnpj || !telefone || !celular || !cep || !cidade || !bairro || !endereco || !numero || !razaoSocial) {
            return res.status(400).json({ error: 'Missing required fields in request body' });
        }
        if (!idSeller ) {
            return res.status(400).json({ error: 'id user nao recuperado' });
        }

        const usersRepository = new TypeormUsersRepository();
        const addInforSeller = new addInforSellerService(usersRepository);

        const result = await addInforSeller.execute({ idUserSeller: idSeller, cnpj, telefone, celular, cep, cidade, bairro, endereco, numero, razaoSocial })
        return res.status(200).json(result);
    }

}
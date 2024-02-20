import { Request, Response } from 'express'
import { TypeormProductRepository } from '../../repositories/typeorm/TypeormProductRepository';
import { UpdateProductService } from '../../model/product/UpdateProductService';
import { ProductRequest } from '../../repositories/IProductRepositories';


export class UpdateProductController{
    async updateProduct(req: Request, res: Response){

        const { id, name, description, stock, price, weight } = req.body
        const idSeller = req.user.id

        const productRepository = new TypeormProductRepository();
        const updateProductservice = new UpdateProductService(productRepository)


        if (!idSeller) {
            return res.status(400).json("ID do vendedor nao foi localizado, token invalido");
        }
        const dados:ProductRequest = {id, name, description, stock, price, weight,  id_userSeller:idSeller}

        if (!dados.id) {
            return res.status(400).json("ID do vendedor nao foi localizado, token invalido");
        }
        
        const update = await updateProductservice.execute(dados)

        if(update instanceof Error){
            return res.status(400).json(update.message)
        }
        return res.status(200).json(update);
    }
}
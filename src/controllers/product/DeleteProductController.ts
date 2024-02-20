import { Request, Response } from 'express'
import { TypeormProductRepository } from '../../repositories/typeorm/TypeormProductRepository';
import { DeleteProductService } from '../../model/product/DeleteProductService';


export class DeleteProductController {
    async deleteProduct(req: Request, res: Response) {

        const { id } = req.params
        const idSeller = req.user.id


        const productRepository = new TypeormProductRepository();
        const deleteProduct = new DeleteProductService(productRepository);

        if (!idSeller) {
            return res.status(400).json("ID do vendedor nao foi localizado, token invalido");
        }
        const result = await deleteProduct.execute(id, idSeller)

        if (result instanceof Error) {
            return res.status(401).json(result.message)
        }

        return res.status(200).json({
            message: 'Produto foi excluído com sucesso',
            dadosDeletados: {
                name: result.name,
                description: result.description,
                stock: result.stock,
                price: result.price,
                weight: result.weight,
                id_userSeller: result.id_userSeller,
                created_at: result.created_at
            }
        });
        

    }
}
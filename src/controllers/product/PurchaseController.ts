import { PurchaseService } from "../../model/product/PurchaseService";
import { TypeormProductRepository } from "../../repositories/typeorm/TypeormProductRepository";
import { Request, Response } from 'express'
import { TypeormUsersRepository } from "../../repositories/typeorm/TypeormUsersRepository";


type teste = [{
    idProduct: string;
    amount: number;
}]

export class PurchaseController{
    async new(req: Request, res: Response) {
        const { products, idClient } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json("Invalid 'products' array in the request body");
        }

        const productRepository = new TypeormProductRepository();
        const userRepository = new TypeormUsersRepository();
        const purchaseService = new PurchaseService(productRepository,userRepository);

        const formattedProducts = products.map(product => ({
            idProduct: String(product.idProduct),
            amount: Number(product.amount)
        }));
console.log()
        const result = await purchaseService.execute({ products: formattedProducts, idClient, })
        
        if (result instanceof Error) {
            return res.status(400).json(result.message);
          }
          
      
          return res.json(result);
    }
}
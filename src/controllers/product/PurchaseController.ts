import { PurchaseService } from "../../model/product/PurchaseService";
import { TypeormProductRepository } from "../../repositories/typeorm/TypeormProductRepository";
import { Request, Response } from 'express'


export class PurchaseController{
    async new(req: Request, res: Response) {
        const {products, idClient} = req.body

        const productRepository = new TypeormProductRepository();
        const purchaseService = new PurchaseService(productRepository);

        const result = await purchaseService.execute({idProducts:products, idClient})
        
        if (result instanceof Error) {
            return res.status(400).json(result.message);
          }
      
          return res.json(result);
    }
}
import { GetStoreProductsService } from "../../model/product/GetStoreProductsService";
import { TypeormProductRepository } from "../../repositories/typeorm/TypeormProductRepository";
import { Request, Response } from 'express'


export class GetStoreProductsController{
    async get(req: Request, res: Response) {
        const productRepository = new TypeormProductRepository();
        const getStoreProducts = new GetStoreProductsService(productRepository);
        const result = await getStoreProducts.execute()
        
        if (result instanceof Error) {
            return res.status(400).json(result.message);
          }
      
          return res.json(result);
    }
}
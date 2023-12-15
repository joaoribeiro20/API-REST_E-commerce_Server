import { Request, Response } from 'express'
import { TypeormProductRepository } from '../../repositories/typeorm/product/TypeormProductRepository';
import { CreateProductService } from '../../model/product/CreateProductService';
import { GetProductService } from '../../model/product/GetProductService';



export class GetProductController{
    async get(req: Request, res: Response) {
        const { id_userSeller } = req.params
    
        const productRepository = new TypeormProductRepository();
        const getProductService = new GetProductService(productRepository);
      /*   if(!idSeller){
            return res.status(400).json("id null");
        }
        if(!name){
            return res.status(400).json("name");
        } */
        const result = await getProductService.execute(id_userSeller)
        
        if (result instanceof Error) {
            return res.status(400).json(result.message);
          }
      
          return res.json(result);
    }
    }

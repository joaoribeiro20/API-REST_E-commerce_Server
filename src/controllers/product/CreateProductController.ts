import { Request, Response } from 'express'
import { TypeormProductRepository } from '../../repositories/typeorm/product/TypeormProductRepository';
import { CreateProductService } from '../../model/product/CreateProductService';



export class CreateProductController{
    async create(req: Request, res: Response) {
        
        const { name, description, stock, price, weight } = req.body
        const  idSeller  = req.user.id
        console.log(req.user.id)
        console.log( name )
        const productRepository = new TypeormProductRepository();
        const createProductService = new CreateProductService(productRepository);
        if(!idSeller){
            return res.status(400).json("id null");
        }
        if(!name){
            return res.status(400).json("name");
        }
        const result = await createProductService.execute({
            name:name, 
            description:description, 
            stock:stock, 
            price:price, 
            weight:weight, 
            id_userSeller:idSeller
            })
        
        if (result instanceof Error) {
            return res.status(400).json(result.message);
          }
      
          return res.json(result);
    }
}
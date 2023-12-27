import { Request, Response } from 'express'
import { TypeormProductRepository } from '../../repositories/typeorm/TypeormProductRepository';
import { CreateProductService } from '../../model/product/CreateProductService';



export class CreateProductController{
    async create(req: Request, res: Response) {
        
        const { name, description, stock, price, weight } = req.body
        const  idSeller  = req.user.id
    
        const productRepository = new TypeormProductRepository();
        const createProductService = new CreateProductService(productRepository);
        
        if(!idSeller){
            return res.status(400).json("id null");
        }
        if (!name || !description || !stock || !price || !weight || !idSeller) {
            return res.status(400).json("Todos os campos devem ser preenchidos.");
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
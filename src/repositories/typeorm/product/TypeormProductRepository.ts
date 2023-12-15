import { Product } from "../../../entities/store/Product";
import { IProductRepository } from "../../IProductRepositories";
import { AppDataSource } from "../../../database/data-source";



class TypeormProductRepository implements IProductRepository {
    productRepository = AppDataSource.getRepository(Product)

    async create(product: {
        name: string;
        description: string;
        stock: number;
        price: number;
        weight: number;
        id_userSeller: string;
    }): Promise<Product> {

        const newProduct = this.productRepository.create(product);

        await this.productRepository.save(newProduct);

        return newProduct;
    }

    async get(id_userSeller: string): Promise<Product[] | null> {
        const productExist = await this.productRepository.find({
            where: { id_userSeller: id_userSeller }
        });

        return productExist
    }
}

/* async update(product: { name: string; description: string; stock: number; price: number; weight: number; idUserSeller: string; }): Promise<Product> {
    
} */

/*  async delete(email: string): Promise<Product | null> {
     
 } */

/*   async exists(email: string): Promise<boolean> {
      
  } */


export { TypeormProductRepository }
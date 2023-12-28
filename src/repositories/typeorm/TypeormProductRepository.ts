import { Product } from "../../entities/store/Product";
import { IProductRepository } from "../IProductRepositories";
import { AppDataSource } from "../../database/data-source";



class TypeormProductRepository implements IProductRepository {
    productRepository = AppDataSource.getRepository(Product)

    async create(product: {
        name: string;
        description: string;
        stock: number;
        price: number;
        weight: number;
        id_userSeller: string;
    }): Promise<Product | Error> {

        try {
            const newProduct = this.productRepository.create(product);

            await this.productRepository.save(newProduct);

            return newProduct;
        } catch(error) {
            return new Error('Ja existe Produto seu com esse mesmo nome');
        }
    }

    async getAllProductOneSeller(id_userSeller: string): Promise<Product[] | null> {
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
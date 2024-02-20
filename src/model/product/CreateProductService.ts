import { error } from "console";
import { Product } from "../../entities/store/Product";
import { IProductRepository, ProductRequest } from "../../repositories/IProductRepositories";

export class CreateProductService{
    constructor(private productRepository: IProductRepository) { }

    async execute({ name, description, stock, price, weight, id_userSeller }: ProductRequest): Promise<Error | Product> {
        
        const newProduct = await this.productRepository.create({name, description, stock, price, weight, id_userSeller})

        return newProduct
    }
} 
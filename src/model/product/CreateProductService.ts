import { Product } from "../../entities/store/Product";
import { IProductRepository } from "../../repositories/IProductRepositories";


type ProductRequest = {
    name:string,
    description:string,
    stock:number,
    price:number,
    weight:number,
    id_userSeller:string
   };

export class CreateProductService{
    constructor(private productRepository: IProductRepository) { }

    async execute({ name, description, stock, price, weight, id_userSeller }: ProductRequest): Promise<Error | Product> {
        
        const newProduct = await this.productRepository.create({name, description, stock, price, weight, id_userSeller})

        return newProduct
    }
} 
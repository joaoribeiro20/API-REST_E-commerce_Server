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

export class GetProductService{
    constructor(private productRepository: IProductRepository) { }

    async execute(id_userSeller: string): Promise<Error | Product[]> {
        
        const getProduct = await this.productRepository.get(id_userSeller)

        if(!getProduct){
            return new Error("produtos nao encontrados")
        }

        return getProduct
    }
} 
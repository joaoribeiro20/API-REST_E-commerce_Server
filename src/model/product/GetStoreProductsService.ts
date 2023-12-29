import { IProductRepository } from "../../repositories/IProductRepositories";



export class GetStoreProductsService{
    constructor(private productRepository: IProductRepository) { }

    async execute(){
        const result =  await this.productRepository.getStoreProducts()
        return result
    }
}
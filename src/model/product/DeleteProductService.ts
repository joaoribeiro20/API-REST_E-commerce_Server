import { Product } from "../../entities/store/Product";
import { IProductRepository } from "../../repositories/IProductRepositories";


class DeleteProductService{
    constructor(private productRepository: IProductRepository){}

    async execute(id:string, idUser:string): Promise<Product | Error>{
        if(!id){
            return new Error ("Id invalido")
        }

        const deleteProduct =  this.productRepository.delete(id,idUser)

        if(deleteProduct instanceof Error){
            return deleteProduct
        }
       
        return deleteProduct
    }
}

export { DeleteProductService }
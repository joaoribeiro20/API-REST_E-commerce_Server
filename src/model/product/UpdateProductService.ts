import { error } from "console";
import { Product } from "../../entities/store/Product";
import { IProductRepository, ProductRequest } from "../../repositories/IProductRepositories";


class UpdateProductService {
    constructor(private productRepository: IProductRepository) { }

    async execute(product: ProductRequest): Promise<ProductRequest | Error> {

        if (product.id) {
            const buscarProductoSeller = await this.productRepository.get(product.id);
            if(buscarProductoSeller == null){
                return new Error('produto nao encontrado')
            }
            if (buscarProductoSeller?.id_userSeller != product.id_userSeller) {
                return new Error('Apenas o vendedor desse produto pode alterar as infromações')
            }
        }


        const updateProdutc = await this.productRepository.update(product)

        return updateProdutc
    }
}

export { UpdateProductService }
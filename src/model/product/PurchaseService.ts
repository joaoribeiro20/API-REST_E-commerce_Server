import { Product } from "../../entities/store/Product";
import { IProductRepository, ProductRequest } from "../../repositories/IProductRepositories";
import { IUsersRepository } from "../../repositories/IUsersRepositories";




export class PurchaseService {
    constructor(private productRepository: IProductRepository, private usersRepository: IUsersRepository) { }


    async execute(shopping: { products: { idProduct: string, amount: number; }[]; idClient: string; }) {
        const productsA: Product[] = [];
        for (const productInfo of shopping.products) {
            /*  console.log(productInfo); */
            const getProduct = await this.productRepository.get(productInfo.idProduct);

            if (getProduct) {
                if (!validadorCompra(getProduct.stock, productInfo.amount)) {
                    /* enviar email ao vendedor informando que o produto dele ta sem estoque
                     ou com baixa de estoque que é necessario remover ou atualizar o produto */
                    return new Error(`Insufficient stock for product with ID: ${getProduct.id}`);
                }

                /* console.log(product); */
                const updatedStockValue = getProduct.stock - productInfo.amount;
                console.log(updatedStockValue);

                const updatedProductStock = {
                    name: getProduct.name, description: getProduct.description, stock: updatedStockValue,
                    price: getProduct.price, weight: getProduct.weight, id_userSeller: getProduct.id_userSeller
                }

                const updatedProduct = await this.productRepository.update(
                    updatedProductStock, getProduct.id
                )
                if (updatedProduct instanceof Error) {
                    return new Error(`Failed to update stock for product with ID: ${getProduct.id}`);
                }
                if (updatedProduct instanceof Error) {
                    // A atualização do estoque não afetou exatamente um item (pode indicar um problema)
                    /*  return new Error(`Failed to update stock for product with ID: ${getProduct.id}`); */
                    return new Error(`Failed to update stock for product with ID: ${getProduct.id}`)
                }
                productsA.push(getProduct); // Adicione ao array apenas se a atualização for bem-sucedida
            } else {
                return new Error(`Product not found with ID: ${productInfo.idProduct}`);
            }

        }
   
        const dataClienr = await this.usersRepository.getDataClient(shopping.idClient)
        if(dataClienr instanceof Error){
            return new Error(`Product not found with ID:`);
        }else{
           /*  console.log(dataClienr.idUserClient) */
            const userClient = await this.usersRepository.get('', dataClienr.idUserClient)

            /* console.log(userClient?.email) */
        }
   
        const newShopping = await this.productRepository.purchase(productsA, dataClienr)
        if (newShopping instanceof Error) {
        }else{
             const dataClienr = await this.usersRepository.getDataClient(shopping.idClient)
            if(dataClienr instanceof Error){
                return new Error(`Product not found with ID:`);
            }else{
               /*  console.log(dataClienr.idUserClient) */
                const userClient = await this.usersRepository.get('', dataClienr.idUserClient)
                /* console.log(userClient?.email) */
                const sellerId:string[] = []
                for (const productInfo of productsA) {
                    const id_userSeller = productInfo.id_userSeller
                
                    // Verifica se o id_userSeller já está no array sellerId
                    if (sellerId.includes(id_userSeller)) {
                        // Pula para a próxima iteração do loop
                        continue
                    }
                
                    // Adiciona o id_userSeller ao array sellerId
                    sellerId.push(id_userSeller)
                
                    /* Restante do seu código para o caso em que o id_userSeller não existe no array */
                    /* console.log(id_userSeller) */
                   
                } 
               /*  console.log("id nao existente"+sellerId) */
                for(let i = 0; i < sellerId.length; i++){
                    console.log("email enviado para "+sellerId[i])
                    const products = productsA.filter((ProductsA)=> ProductsA.id_userSeller == sellerId[i])
                    console.log("Os produtos vendidos foram:");
                    products.forEach((product) => {
                        console.log("   - " + product.name);
                    });
            }
        }
    }
        return newShopping
  }      
}

function validadorCompra(stock: number, quatidade: number) {
    if (stock == 0) {
        return false
    }
    if (quatidade > stock) {
        return false
    }
    return true
}

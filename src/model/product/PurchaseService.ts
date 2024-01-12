import { Product } from "../../entities/store/Product";
import enviarEmail from "../../modules/nodemailer/configService";
import { endOfStock } from "../../modules/nodemailer/template/endOfStock";
import { shoppingClient } from "../../modules/nodemailer/template/shoppingClient";
import { IProductRepository, ProductRequest } from "../../repositories/IProductRepositories";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

export class PurchaseService {
    constructor(private productRepository: IProductRepository, private usersRepository: IUsersRepository) { }


    async execute(shopping: { products: { idProduct: string, amount: number; }[]; idClient: string; }) {
        const productsA: Product[] = [];
        for (const productInfo of shopping.products) {

            //busca os dados do produto atraves do id informado no body
            const getProduct = await this.productRepository.get(productInfo.idProduct);

            if (getProduct) {

                //informa o vendedor que seu estoque esta com pouca quantidade ou zerado
                if (!validadorCompra(getProduct.stock, productInfo.amount)) {
                    const userSeller = await this.usersRepository.get('', getProduct.id_userSeller);
                    if (userSeller) {
                        await enviarEmail(
                            userSeller.email, /* email */
                            'Estoque de produto baixo!!', /* titulo */
                            endOfStock(userSeller.name, getProduct.name, getProduct.stock), /* corpo do email */
                            '"Olá!!! - Loja Cofe" <devribeirotestes@hotmail.com>'
                        );
                    } else {
                        // Handle the case where userClient is null (if needed)
                    }
                    return new Error(`Insufficient stock for product with ID: ${getProduct.id}`);
                }

                //subitrair o valor atual do estoque com o valor vendido
                const updatedStockValue = getProduct.stock - productInfo.amount;
                console.log(updatedStockValue);
                //atualizar no banco de dados o valor atual do estoque do produto
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
                //se der sucesso em tudo ele atualiza e adiciona o produto em um array 
                productsA.push(getProduct); // Adicione ao array apenas se a atualização for bem-sucedida
            } else {
                return new Error(`Product not found with ID: ${productInfo.idProduct}`);
            }

        }
        //busca os dados do cliente para informa que a compra foi realizada com sucesso
        
        const dataClienr = await this.usersRepository.getDataClient(shopping.idClient)
        if (dataClienr instanceof Error) {
            return new Error(`Product not found with ID:a`);
        }
        const newShopping = await this.productRepository.purchase(productsA, dataClienr)
        if (newShopping instanceof Error) {
            return new Error('problema com o salvamento no banco de dados da compra realizazda')
        } else {
            const userClient = await this.usersRepository.get('', dataClienr.idUserClient)
            console.log(dataClienr.idUserClient)
            console.log(userClient?.email)
            console.log(productsA)
            //enviar email de confirmação da compra para o CLIENTE
            //userClient &&
            //await enviarEmail(
              //  userClient?.email, /* email */
              //  'Compra realizada com Sucesso!!', /* titulo */
              //  shoppingClient(userClient.name,productsA), /* corpo do email */
              //  '"Olá!!! - Loja Cofe" <devribeirotestes@hotmail.com>'
            //);
           
            const sellerId: string[] = []
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
            for (let i = 0; i < sellerId.length; i++) {

                const userSeller = await this.usersRepository.get('', sellerId[i])
                console.log("email enviado para " + userSeller?.name)
                const products = productsA.filter((ProductsA) => ProductsA.id_userSeller == sellerId[i])
                console.log("Os produtos vendidos foram:");
                products.forEach((product) => {
                    console.log("   - " + product.name);
                });
                
                userSeller&&
                console.log(shoppingClient(userSeller?.name,products))
                //await enviarEmail(
                 //   userSeller?.email, /* email */
                  //  'Mais um produto vendido!!', /* titulo */
                  //  shoppingClient(userSeller?.name,products), /* corpo do email */
                  //  '"Olá!!! - Loja Cofe" <devribeirotestes@hotmail.com>'
                //);
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

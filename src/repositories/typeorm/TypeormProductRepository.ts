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
        } catch (error) {
            return new Error('Ja existe Produto seu com esse mesmo nome');
        }
    }
    update(product: { name: string; description: string; stock: number; price: number; weight: number; id_userSeller: string; }): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    delete(idProduct: string): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }


    async getAllProductOneSeller(id_userSeller: string): Promise<Product[] | null> {
        const productExist = await this.productRepository.find({
            where: { id_userSeller: id_userSeller }
        });

        return productExist
    }

    async getStoreProducts(): Promise<{ name: string; description: string; price: number; id_userSeller: string; }[] | Error> {
        const allProducs = await this.productRepository.find({
            select: {
                name: true,
                description: true,
                price: true,
                id_userSeller: true,
            },
        })
        return allProducs
    }
    exists(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async purchase(shopping: { idProducts: []; idClient: string; }): 
    Promise<Error | { idProducts: []; idClient: string; }> {
       
        const products = shopping.idProducts
       
        for(const ids in products){
            const result = products.filter((product) =>  product == products[ids])
            
           
             const allProducs = await this.productRepository.findOneBy({id:products[ids]})
         
             if(allProducs != null){
                 
                console.log(result.length)
                if(!validadorCompra(allProducs.stock, result.length)){
                    return new Error("problema stoque");
                }
             }else{
                return new Error("dados vazio");
             }
                
        }

        return shopping
    }
   
}



function validadorCompra(stock:number, quatidade:number){
    if(stock == 0){
        return false
    }
    if(quatidade > stock){
        return false
    }
  return true
}

export { TypeormProductRepository }
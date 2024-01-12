import { Product } from "../../entities/store/Product";
import { IProductRepository, ProductRequest } from "../IProductRepositories";
import { AppDataSource } from "../../database/data-source";
import { Shopping } from "../../entities/store/Shopping";
import { ClientInfo } from "../../entities/user/ClientInfo";
import { error } from "console";

class TypeormProductRepository implements IProductRepository {
  productRepository = AppDataSource.getRepository(Product)
  shoppingRepository = AppDataSource.getRepository(Shopping)
  userClientRepository = AppDataSource.getRepository(ClientInfo)
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
  async update(product:
    {
      name: string; description: string; stock: number;
      price: number; weight: number; id_userSeller: string;
    }, idProduct: string): Promise<ProductRequest | Error> {

    const valueUpdateProduct = {
      name: product.name, description: product.description, stock: product.stock,
      price: product.price, weight: product.weight, id_userSeller: product.id_userSeller
    }

    const updatedProduct = await this.productRepository.update(idProduct, valueUpdateProduct);

    if (updatedProduct.affected !== 1) {
      // A atualização do estoque não afetou exatamente um item (pode indicar um problema)
      return new Error(`Failed to update stock for product with ID: ${idProduct}`);
    } /* else {
      return new Error(`Product not found with ID: ${idProduct}`);
    } */
    return valueUpdateProduct
  }
  async delete(idProduct: string): Promise<Boolean | null> {
    
    const deleteProduct = await this.productRepository.delete(idProduct)

    if(deleteProduct == null){
      return null
    }

    return true
  }
  async get(idProduct: string): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id: idProduct });

    if (!product) {
      return product
    }
    return product
  }


  /* ------------------------------------------------------------------------------------------------- */
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
  async exists(email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
/* --------------------------------------------------------------------------------------- */
  async  purchase(products: { name: string; description: string; price: number; id_userSeller: string; }[], client: ClientInfo): Promise<String | Error>{


      try {
        const createNewPurchase = this.shoppingRepository.create({
          client,
          products
        });
  
  
        await this.shoppingRepository.save(createNewPurchase);
  
        return "Sucesso";
      } catch (error) {
        return new Error('Ja existe Produto seu com esse mesmo nome');
      }
  }

}





export { TypeormProductRepository }
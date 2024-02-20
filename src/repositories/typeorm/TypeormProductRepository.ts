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
  async update(product: ProductRequest): Promise<ProductRequest | Error> {
    if (product.id == undefined) {
      return new Error('id do produto incorreto ou nao informado')
    }

    const updatedProduct = await this.productRepository.update(product.id, product);

    if (updatedProduct.affected !== 1) {

      return new Error(`Failed to update stock for product with ID: ${product}`);
    }
    return product
  }
  async delete(idProduct: string, idUser: string): Promise<Product | Error> {
    const product = await this.productRepository.findOneBy({ id: idProduct });

    if (idUser == product?.id_userSeller) {
      const deleteProduct = await this.productRepository.delete(idProduct)
      console.log("🚀 ~ TypeormProductRepository ~ delete ~ deleteProduct:", deleteProduct)

      if (deleteProduct == null) {
        return new Error('eRROR NO DELETE ')
      }
      if (product == null) {
        return new Error('Error ao buscar produto')
      }
      return product
    } else {
      return new Error('Error ao buscar produto')
    }

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
  async getStoreProducts(): Promise<Product[] | Error> {
    const allProducs = await this.productRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        id_userSeller: true,
      },
    })
    console.log("🚀 ~ TypeormProductRepository ~ getStoreProducts ~ allProducs:", allProducs)
    return allProducs
  }
  async exists(email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  /* --------------------------------------------------------------------------------------- */
  async purchase(products: { name: string; description: string; price: number; id_userSeller: string; }[], client: ClientInfo): Promise<String | Error> {


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
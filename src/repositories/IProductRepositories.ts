import { Product } from "../entities/store/Product";
import { ClientInfo } from "../entities/user/ClientInfo";
export type ProductRequest = {
  id?: string,
  name: string,
  description: string,
  stock: number,
  price: number,
  weight: number,
  id_userSeller: string
};
type ProductRequestStore = {
  name: string,
  description: string,
  price: number,
  id_userSeller: string
};

interface IProductRepository {
  create(product: ProductRequest): Promise<Product | Error>;
  get(idProduct: string): Promise<Product | null>
  update(product: ProductRequest, idProduct?: string): Promise<ProductRequest | Error>;
  delete(idProduct: string,idUser: string): Promise<Product | Error>

  exists(email: string): Promise<boolean>;
  getAllProductOneSeller(id_userSeller: string): Promise<Product[] | null>
  getStoreProducts(): Promise<Product[] | Error>

  purchase(products: ProductRequestStore[],
    client: ClientInfo): Promise<String | Error>

}




export { IProductRepository };
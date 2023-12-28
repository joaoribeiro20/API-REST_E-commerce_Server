import { Product } from "../entities/store/Product";
type ProductRequest = {
 name:string,
 description:string,
 stock:number,
 price:number,
 weight:number,
 id_userSeller:string
};

interface IProductRepository {
  create(product: ProductRequest):  Promise<Product | Error>;
  getAllProductOneSeller(id_userSeller: string ):   Promise<Product[] | null>
  /* update(product: ProductRequest):  Promise<Product>;
  delete(email: string ):           Promise<Product | null>
  exists(email: string):            Promise<boolean>; */
}



export { IProductRepository };
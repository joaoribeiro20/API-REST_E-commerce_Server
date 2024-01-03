import { Product } from "../entities/store/Product";
type ProductRequest = {
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
  getAllProductOneSeller(id_userSeller: string): Promise<Product[] | null>
  update(product: ProductRequest):  Promise<Product | null>;
  delete(idProduct: string ):           Promise<Product | null>
  exists(email: string):            Promise<boolean>; 


  /* store */

  /*  
  purchase comprar
  shopping compras
  */

  getStoreProducts(): Promise<ProductRequestStore[] | Error>
  purchase(shopping:shopping):Promise<shopping | Error> 

}

type shopping = {
  idProducts:[],
   idClient:string
};



export { IProductRepository };
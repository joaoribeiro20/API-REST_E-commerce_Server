import { IProductRepository } from "../../repositories/IProductRepositories";




export class PurchaseService{
    constructor(private productRepository: IProductRepository) { }


    async execute(shopping: { idProducts: []; idClient: string; }){
        
        const newShopping = await this.productRepository.purchase(shopping)

        return newShopping
    }
}

/* 

function validadorCompra(stock:number, quatidade:number){
    if(stock == 0){
        return false
    }
    if(quatidade > stock){
        return false
    }
  return true
} */
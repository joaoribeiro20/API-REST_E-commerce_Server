import {
  Column,
  Entity,
  getRepository,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { ClientInfo } from "../user/ClientInfo";
import { Product } from "./Product";

@Entity("shopping")
export class Shopping extends BaseEntity {

  /* 
      @Column()
      idClient:string */

  @ManyToOne(() => ClientInfo,
  (client) => client.shopping)
  client: ClientInfo
  
  @ManyToMany(() => Product)
  @JoinTable({
    name: "shopping_product",
    joinColumns: [{ name: "shopping_id" }],
    inverseJoinColumns: [{ name: "product_id" }],
  })
  products: Product[]

}
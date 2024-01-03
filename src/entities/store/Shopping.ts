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

    @ManyToOne(() => ClientInfo,
    (client) => client.shopping)
    client: ClientInfo
/* 
    @Column()
    idClient:string */

    @ManyToMany(() => Product, 
    (product) => product.id)
    products: Product[]
  }
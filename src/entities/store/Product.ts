import { Column, Entity } from "typeorm";
import { BaseEntity } from "../BaseEntity";

@Entity("products")
export class Product extends BaseEntity {
  @Column({unique:true})
  name: string;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  @Column()
  weight: number;

  @Column()
  id_userSeller: string;

}
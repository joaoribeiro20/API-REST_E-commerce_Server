import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Shopping } from "./Shopping";

@Entity("products")
export class Product extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  weight: number;

  @Column({ nullable: false })
  id_userSeller: string;

 /*  @ManyToMany(() => Shopping, (shopping) => shopping.products)
  shopping */

}
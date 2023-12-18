import { Column, Entity } from "typeorm";
import { BaseEntity } from "../BaseEntity";

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

}
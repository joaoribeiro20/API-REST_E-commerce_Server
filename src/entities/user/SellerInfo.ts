
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sellerinfo")
export class SellerInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({unique:true})
  idUserSeller:string;

  @Column({unique:true})
  cnpj:number;

  @Column({unique:true})
  telefone:number;

  @Column({unique:true})
  celular:number;

  @Column()
  cep:number;

  @Column()
  cidade:string;

  @Column()
  bairro:string;

  @Column()
  endereco:string;

  @Column()
  numero:number;

  @Column({unique:true})
  razaoSocial:string;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shopping } from "../store/Shopping";

@Entity("clientinfo")
export class ClientInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique:true})
  idUserClient:string;

  @Column({unique:true})
  cpf:number;

  @Column({unique:true})
  celular:number;

  @Column({unique:true})
  cep:number;

  @Column()
  cidade:string;

  @Column()
  bairro:string;

  @Column()
  endereco:string;

  @Column()
  numero:number;
  
  @OneToMany(() => Shopping, (shopping) => shopping.client)
  shopping: Shopping[]

}
import { ClientInfo } from "../entities/user/ClientInfo";
import { Permission } from "../entities/user/Permission";
import { Role } from "../entities/user/Role";
import { SellerInfo } from "../entities/user/SellerInfo";
import { User } from "../entities/user/User";
type UserRequest = {
  email: string;
  password: string;
  name:string;
  roles: Role[];
};
type dataUserSeller = {
  idUserSeller:string,
  cnpj:number,
  telefone:number,
  celular:number,
  cep:number,
  cidade:string,
  bairro:string,
  endereco:string,
  numero:number,
  razaoSocial:string
}
type RolePermissionRequest = {
  role: Role[];
  permissions: Permission[];
};



interface IUsersRepository {
  /* ----CRUD---- */
  create(user: UserRequest): Promise<User>;
  get(email: string ): Promise<User | null>
  delete(id:string): Promise<User | Error>
  update(idUser: string, userUpdate: UserRequest): Promise<User | Error>

  /*  ----Funções espeficicas---- */
  addRolePermission(id: string, RolePermissionRequest:RolePermissionRequest ): Promise<User | Error>
  updatePassword(email:string, password:string): Promise<User | Error>
  
  /*  ---- funçoes genericas ---- */
  exists(email: string): Promise<boolean>;

   /*  ---- funçoes dados a mais tipo seller e client ---- */
  addInfoSeller(info:dataUserSeller): Promise<SellerInfo | Error>;
  /* updateInfoSeller():Promise<SellerInfo | Error>; */

  /* addInfoClient(): Promise<ClientInfo | Error>; 
   updateInfoClient():Promise<ClientInfo | Error>; */
}



export { IUsersRepository };
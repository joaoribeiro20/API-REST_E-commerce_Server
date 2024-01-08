import { AppDataSource } from "../../database/data-source";
import { Permission } from "../../entities/user/Permission";
import { Role } from "../../entities/user/Role";
import { User } from "../../entities/user/User";
import { IUsersRepository } from "../IUsersRepositories";
import { SellerInfo } from "../../entities/user/SellerInfo";
import { error } from "console";
import { ClientInfo } from "../../entities/user/ClientInfo";

type dataUserSeller = {
  idUserSeller: string,
  cnpj: number,
  telefone: number,
  celular: number,
  cep: number,
  cidade: string,
  bairro: string,
  endereco: string,
  numero: number,
  razaoSocial: string
}



class TypeormUsersRepository implements IUsersRepository {

  userRepository = AppDataSource.getRepository(User)
  userSellerRepository = AppDataSource.getRepository(SellerInfo)
  userClientRepository = AppDataSource.getRepository(ClientInfo)
  
  async exists(email: string): Promise<boolean> {

    const userExist = await this.userRepository.findOneBy({ email: email })

    return !!userExist;
  }
  async create({ name, email, password, roles }: User): Promise<User> {

    const newUser = this.userRepository.create({ name, email, password, roles })

    await this.userRepository.save(newUser)

    return newUser;
  }
  async get(email: string, id:string): Promise<User | null> {

    if(email != ''){
      const userExist = await this.userRepository.findOne({
      where: { email },
      relations: {
        roles: true,
        permissions: true
      },
    }); 
     return userExist
    }else if(id != ''){
      const userExist = await this.userRepository.findOne({
        where: { id },
        relations: {
          roles: true,
          permissions: true
        },
      }); 
       return userExist
    }else{
      return null
    }
    
    

  
  }
  async addRolePermission(
    id: string,
    RolePermissionRequest: { role: Role[]; permissions: Permission[]; }): Promise<User | Error> {
    const userExist = await this.userRepository.findOne({
      where: { id },
      relations: {
        roles: true,
        permissions: true
      },
    });

    if (!userExist) {
      return new Error('role nao encontrada')
    }

    userExist.permissions = RolePermissionRequest.permissions
    userExist.roles = RolePermissionRequest.role

    const user = await this.userRepository.save(userExist)

    return user
  }
  async delete(id: string): Promise<User | Error> {


    const userExist = await this.userRepository.findOne({
      where: { id },
      relations: {
        roles: true,
        permissions: true
      },
    });

    if (!userExist) {
      return new Error('role nao encontrada')
    }
    const user = await this.userRepository.delete(id);
    console.log(user.affected)
    if (user.affected != 1) {

      return new Error('Error ao excluir')
    }

    return userExist
  }
  async updatePassword(email: string, password: string): Promise<User | Error> {
    throw new Error("Method not implemented.");
  }

  /* -------------------------------- ------------------------------------ */
  async addInfoSeller({
    idUserSeller, cnpj, telefone,
    celular, cep, cidade, bairro,
    endereco, numero, razaoSocial
  }: dataUserSeller): Promise<Error | SellerInfo> {

    if (!idUserSeller) {
      return new Error("Id user not exist");
    }
    try {
      const infoSeller = this.userSellerRepository.create({
        idUserSeller, cnpj, telefone, celular, cep, cidade, bairro, endereco, numero, razaoSocial
      })

      await this.userSellerRepository.save(infoSeller)

      return infoSeller;
    } catch (error) {
      return new Error('error ao salvar dados')
    }

  }
  async getDataSeller(idUserSeller: string): Promise<SellerInfo | Error> {
    const result = await this.userSellerRepository.findOneBy({ idUserSeller })

    if (!result) {
      return new Error('dados nao encontrados')
    }
    return result
  }
  async updateInfoSeller({
    idUserSeller, cnpj, telefone,
    celular, cep, cidade, bairro,
    endereco, numero, razaoSocial
  }: dataUserSeller): Promise<Error | SellerInfo> {

    if (!idUserSeller) {
      return new Error("Id user not exist");
    }
    try {

      const existingSeller = await this.userSellerRepository.findOneBy({ idUserSeller })

      if (!existingSeller) {
        return new Error("Seller not found");
      }

      const infoSeller = await this.userSellerRepository.update(existingSeller, {
        cnpj, telefone, celular, cep, cidade, bairro, endereco, numero, razaoSocial
      });

      if (!infoSeller) {
        return new Error("Seller not found");
      }

      const result = await this.userSellerRepository.findOneBy({ idUserSeller })
      if (!result) {
        return new Error("Seller not found");
      }

      return result

    } catch (error) {
      return new Error('error ao salvar dados')
    }

  }


  /* ----------------------------------------------------------------- */
  async addDataClient(info: {
    idUserClient: string; cpf: number; celular: number;
    cep: number; cidade: string; bairro: string; endereco: string; numero: number;
  }
  ): Promise<Error | ClientInfo> {

    if (!info.idUserClient) {
      return new Error("Id user not exist");
    }
    try {
      const infoClient = this.userClientRepository.create(info)

      await this.userClientRepository.save(infoClient)

      return infoClient;
    } catch (error) {
      return new Error('error ao salvar dados')
    }
  }

  async getDataClient(idUserClient: string): Promise<ClientInfo | Error> {
    const result = await this.userClientRepository.findOneBy({ idUserClient })

    if (!result) {
      return new Error('dados nao encontrados')
    }
    return result
  }
  async updateInfoClient(info: { idUserClient: string; cpf: number; celular: number; cep: number; cidade: string; bairro: string; endereco: string; numero: number; }): Promise<ClientInfo | Error> {
    if (!info.idUserClient) {
      return new Error("Id user not exist");
    }
    try {

      const existingClient = await this.userClientRepository.findOneBy({ idUserClient: info.idUserClient })

      if (!existingClient) {
        return new Error("Seller not found");
      }

      const dataUpdateClient = await this.userClientRepository.update(existingClient, {
        cpf: info.celular, celular: info.celular, cep: info.cep, cidade: info.cidade, bairro: info.bairro, endereco: info.endereco, numero: info.numero
      })


      if (!dataUpdateClient) {
        return new Error("Seller not found");
      }

      const result = await this.userClientRepository.findOneBy({ idUserClient: info.idUserClient })
      if (!result) {
        return new Error("Seller not found");
      }

      return result


    } catch (error) {
      return new Error('error ao salvar dados')
    }
  }













}
export { TypeormUsersRepository };
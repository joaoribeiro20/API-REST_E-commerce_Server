import { AppDataSource } from "../../database/data-source";
import { Permission } from "../../entities/user/Permission";
import { Role } from "../../entities/user/Role";
import { User } from "../../entities/user/User";
import { IUsersRepository } from "../IUsersRepositories";
import { SellerInfo } from "../../entities/user/SellerInfo";
import { error } from "console";

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

  async exists(email: string): Promise<boolean> {

    const userExist = await this.userRepository.findOneBy({ email: email })

    return !!userExist;
  }
  async create({ name, email, password, roles }: User): Promise<User> {

    const newUser = this.userRepository.create({ name, email, password, roles })

    await this.userRepository.save(newUser)

    return newUser;
  }
  async get(email: string): Promise<User | null> {

    const userExist = await this.userRepository.findOne({
      where: { email },
      relations: {
        roles: true,
        permissions: true
      },
    });

    return userExist
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
  async update(
    idUser: string,
    userUpdate: { email: string; password: string; name: string; roles: Role[] }
  ): Promise<User | Error> {
    try {
      // Passo 1: Recuperar a entidade existente pelo ID
      const userToUpdate = await this.userRepository.findOne({ where: { id: idUser } });

      if (!userToUpdate) {
        return new Error('Usuário não encontrado');
      }

      // Passo 2: Modificar os dados
      userToUpdate.email = userUpdate.email;
      userToUpdate.password = userUpdate.password;
      userToUpdate.name = userUpdate.name;
      userToUpdate.roles = userUpdate.roles;

      // Passo 3: Salvar no Banco de Dados
      const updatedUser = await this.userRepository.save(userToUpdate);

      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return new Error('Erro ao atualizar usuário');
    }
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
}

export { TypeormUsersRepository };
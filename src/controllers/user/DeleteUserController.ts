
import { error } from "console";
import { DeleteUserService } from "../../model/user/DeleteUserService";
import { TypeormUsersRepository } from "../../repositories/typeorm/TypeormUsersRepository";
import { Request, Response } from 'express'



export class DeleteUserController {
    async delete(req: Request, res: Response) {
        const  idSeller  = req.user.id
    

        const usersRepository = new TypeormUsersRepository();
        const deleteUserService = new DeleteUserService(usersRepository);

        if(!idSeller){
            res.status(401).json("usuario nao autenticado")
        }

        const result = await deleteUserService.execute({ id:idSeller })
    

    if (result instanceof Error) {
        console.log(result)
        return res.status(400).json(result);
      }
  
      return res.status(201).json(result);
    }
}
import { Router } from 'express'
import { CreateUserController } from '../controllers/user/CreateUserController'
import { CreateRoleController } from '../controllers/CreateRoleController'
import { CreatePermissionController } from '../controllers/CreatePermissonController'
import { LoginUserController } from '../controllers/user/LoginUserController'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { GetProductController } from '../controllers/product/GetProductController'
import { CreateRolePermissionController } from '../controllers/CreateRolePermissionController'
import { AddUserAcsessControlListController } from '../controllers/AddUserAccessControlListController'
import { can, is } from '../middlewares/AuthPermissions'
import { DeleteUserController } from '../controllers/user/DeleteUserController'
import { AddInforSellerController } from '../controllers/user/sellerController/addInforSellerController'

const routes = Router()

routes.get("/", function (req, res) {
    res.send("Olá Mundo!");
  });

/* ---------- POSTS --------------- */
routes.post('/createUser',new CreateUserController().create)
routes.post('/login', new LoginUserController().login) 

routes.post('/addUserRolePermission', authMiddleware, new AddUserAcsessControlListController().addUserRolePermission) 

/* ---------- GET ---------------- */
routes.get('/getAllProductOneSeller/:id_userSeller', new GetProductController().get) 

/* ---------- DELETE ---------------- */
routes.delete('/deleteUser', authMiddleware, new DeleteUserController().delete) 

/* ---------- Funções apenas para nivel admin ------------ */
routes.post('/createRole', authMiddleware, is(["admin"]),new CreateRoleController().create )
routes.post('/createPermisson', is(["admin"]),new CreatePermissionController().create)
routes.post("/roles/:roleId", is(["admin"]), can([""]), new CreateRolePermissionController().create)

/* ----------  Funções apenas para vendedor logado ------------ */
routes.post('/createProduct', authMiddleware, is(["seller"]), new CreateProductController().create) 


routes.post('/addDataUserSeller', authMiddleware, is(["seller"]), new AddInforSellerController().addDataSeller) 




export default routes
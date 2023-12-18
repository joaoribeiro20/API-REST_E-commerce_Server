import { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'
import { CreateRoleController } from '../controllers/CreateRoleController'
import { CreatePermissionController } from '../controllers/CreatePermissonController'
import { LoginUserController } from '../controllers/LoginUserController'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { GetProductController } from '../controllers/product/GetProductController'
import { CreateRolePermissionController } from '../controllers/CreateRolePermissionController'
import { AddUserAcsessControlListController } from '../controllers/AddUserAccessControlListController'
import { can, is } from '../middlewares/AuthPermissions'

const routes = Router()

/* ---------- POSTS --------------- */
routes.post('/createUser',new CreateUserController().create)
routes.post('/login', new LoginUserController().login) 

routes.post('/addUserRolePermission', authMiddleware, new AddUserAcsessControlListController().addUserRolePermission) 

/* ---------- GET ---------------- */
routes.get('/getAllProductOneSeller/:id_userSeller', new GetProductController().get) 

/* ---------- Funções apenas para nivel admin ------------ */
routes.post('/createRole', authMiddleware, is(["admin"]),new CreateRoleController().create )
routes.post('/createPermisson', is(["admin"]),new CreatePermissionController().create)
routes.post("/roles/:roleId", is(["admin"]), can([""]), new CreateRolePermissionController().create)

/* ----------  Funções apenas para vendedor logado ------------ */
routes.post('/createProduct', authMiddleware, is(["seller"]), new CreateProductController().create) 



export default routes
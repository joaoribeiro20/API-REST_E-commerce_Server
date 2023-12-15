import { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'
import { CreateRoleController } from '../controllers/CreateRoleController'
import { CreatePermissionController } from '../controllers/CreatePermissonController'
import { LoginUserController } from '../controllers/LoginUserController'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { GetProductController } from '../controllers/product/GetProductController'

/* import { authMiddleware } from './middlewares/authMiddleware'  */

const routes = Router()

/* ---------- POSTS --------------- */
routes.post('/createUser', new CreateUserController().create)
routes.post('/createRole', new CreateRoleController().create)
routes.post('/createPermisson', new CreatePermissionController().create)
routes.post('/login', new LoginUserController().login) 

/* ---------- GET --------------- */
routes.get('/getAllProductOneSeller/:id_userSeller', new GetProductController().get) 

/* ---------- product area apenas para vendedor logado ------------ */
routes.use(authMiddleware)
routes.post('/createProduct', authMiddleware, new CreateProductController().create) 

export default routes
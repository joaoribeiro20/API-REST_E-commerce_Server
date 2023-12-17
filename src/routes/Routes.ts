import { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'
import { CreateRoleController } from '../controllers/CreateRoleController'
import { CreatePermissionController } from '../controllers/CreatePermissonController'
import { LoginUserController } from '../controllers/LoginUserController'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { GetProductController } from '../controllers/product/GetProductController'
import { CreateRolePermissionController } from '../controllers/CreateRolePermissionController'

/* import { authMiddleware } from './middlewares/authMiddleware'  */

const routes = Router()

/* ---------- POSTS --------------- */
routes.post(
    '/createUser',
     new CreateUserController().create
     )

routes.post(
    '/login', 
    new LoginUserController().login
    ) 

routes.post(
    '/createRole',
    /* authMiddleware, */
    new CreateRoleController().create
    )

routes.post(
    '/createPermisson',
   /*  authMiddleware, */
     new CreatePermissionController().create
     )

routes.post(
    "/roles/:roleId", 
    new CreateRolePermissionController().create
    )

/* ---------- GET --------------- */
routes.get('/getAllProductOneSeller/:id_userSeller', new GetProductController().get) 

/* ---------- product area apenas para vendedor logado ------------ */
routes.use(authMiddleware)
routes.post('/createProduct', authMiddleware, new CreateProductController().create) 

export default routes
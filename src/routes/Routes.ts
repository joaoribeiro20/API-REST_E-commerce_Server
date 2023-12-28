import { Router } from 'express'
import { CreateUserController } from '../controllers/user/CreateUserController'
import { CreateRoleController } from '../controllers/CreateRoleController'
import { CreatePermissionController } from '../controllers/CreatePermissonController'
import { LoginUserController } from '../controllers/user/LoginUserController'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { GetAllProductOneSellerController } from '../controllers/product/GetAllProductOneSellerController'
import { CreateRolePermissionController } from '../controllers/CreateRolePermissionController'
import { AddUserAcsessControlListController } from '../controllers/AddUserAccessControlListController'
import { can, is } from '../middlewares/AuthPermissions'
import { DeleteUserController } from '../controllers/user/DeleteUserController'
import { AddInforSellerController } from '../controllers/user/sellerController/AddInforSellerController'
import { GetDataSellerController } from '../controllers/user/sellerController/GetDataSellerController'
import { UpdateAllInfoSellerController } from '../controllers/user/sellerController/UpdateAllInfoSellerController'
import { AddDataClientController } from '../controllers/user/clientController/AddDataClientController'
import { GetDataClientController } from '../controllers/user/clientController/GetDataClientController'

const routes = Router()

routes.get("/", function (req, res) {
    res.send("Olá Mundo!");
  });

/* ---------- POSTS --------------- */
routes.post('/createUser',new CreateUserController().create)
routes.post('/login', new LoginUserController().login) 

routes.post('/addUserRolePermission', authMiddleware, new AddUserAcsessControlListController().addUserRolePermission) 

/* ---------- GET ---------------- */
routes.get('/getAllProductOneSeller/:id_userSeller', new GetAllProductOneSellerController().get) 

/* ---------- DELETE ---------------- */
routes.delete('/deleteUser', authMiddleware, new DeleteUserController().delete) 

/* ---------- Funções apenas para nivel admin ------------ */
routes.post('/createRole', authMiddleware, is(["admin"]),new CreateRoleController().create )
routes.post('/createPermisson', is(["admin"]),new CreatePermissionController().create)
routes.post("/roles/:roleId", is(["admin"]), can([""]), new CreateRolePermissionController().create)

/* ----------  Funções apenas para vendedor logado ------------ */
routes.post('/createProduct', authMiddleware, is(["seller"]), new CreateProductController().create) 


routes.post('/addDataUserSeller', authMiddleware, is(["seller"]), new AddInforSellerController().addDataSeller) 
routes.get('/getDataSeller', authMiddleware, is(["seller"]), new GetDataSellerController().getData) 
routes.put('/updateDataSeller',  authMiddleware, is(["seller"]), new UpdateAllInfoSellerController().updateAllInfoSeller) 


routes.post('/addDataClient', authMiddleware, is(["client"]), new AddDataClientController().addDataClient) 
routes.get('/getDataClient', authMiddleware, is(["client"]), new GetDataClientController().getData) 
/*routes.put('/',  authMiddleware, is(["client"]), new ().) */ 




export default routes



/* http://localhost:8088/ */
import { Router } from 'express'
import { can, is } from '../middlewares/AuthPermissions'
import { authMiddleware } from '../middlewares/AuthMiddleware'

import { CreateUserController } from '../controllers/user/CreateUserController'
import { CreateRoleController } from '../controllers/CreateRoleController'
import { CreatePermissionController } from '../controllers/CreatePermissonController'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { CreateRolePermissionController } from '../controllers/CreateRolePermissionController'

import { AddInforSellerController } from '../controllers/user/sellerController/AddInforSellerController'
import { AddUserAcsessControlListController } from '../controllers/AddUserAccessControlListController'
import { AddDataClientController } from '../controllers/user/clientController/AddDataClientController'

import { LoginUserController } from '../controllers/user/LoginUserController'

import { GetAllProductOneSellerController } from '../controllers/product/GetAllProductOneSellerController'
import { GetDataSellerController } from '../controllers/user/sellerController/GetDataSellerController'
import { GetDataClientController } from '../controllers/user/clientController/GetDataClientController'

import { DeleteUserController } from '../controllers/user/DeleteUserController'

import { UpdateAllInfoSellerController } from '../controllers/user/sellerController/UpdateAllInfoSellerController'
import { UpdateDataClientController } from '../controllers/user/clientController/UpdateDataClientController'
import { GetStoreProductsController } from '../controllers/product/GetStoreProductsController'

const routes = Router()

routes.get("/", function (req, res) {
    res.send("Olá Mundo!");
  });

/* 
*
*  Functions for User generic
*
*/
routes.post('/createUser',new CreateUserController().create)
routes.post('/login', new LoginUserController().login) 
routes.delete('/deleteUser', authMiddleware, new DeleteUserController().delete) 

/* 
*
*  Functions Seller
*
*/
routes.post('/addDataUserSeller', authMiddleware, is(["seller"]), new AddInforSellerController().addDataSeller) 
routes.get('/getDataSeller', authMiddleware, is(["seller"]), new GetDataSellerController().getData) 
routes.put('/updateDataSeller',  authMiddleware, is(["seller"]), new UpdateAllInfoSellerController().updateAllInfoSeller) 
/* Seller Products */
routes.get('/getAllProductOneSeller/:id_userSeller', new GetAllProductOneSellerController().get) 
routes.post('/createProduct', authMiddleware, is(["seller"]), new CreateProductController().create)

/* 
*
*  Functions Client
*
*/
routes.post('/addDataClient', authMiddleware, is(["client"]), new AddDataClientController().addDataClient) 
routes.get('/getDataClient', authMiddleware, is(["client"]), new GetDataClientController().getData) 
routes.put('/updateDataClient',  authMiddleware, is(["client"]), new UpdateDataClientController().updateDataClient)  

/* 
*
*  Functions Store
*
*/
routes.get('/storeProducts', new GetStoreProductsController().get) 
/* 
*
*  Functions for ADMIN
*
*/
routes.post('/addUserRolePermission', authMiddleware, new AddUserAcsessControlListController().addUserRolePermission) 
routes.post('/createRole', authMiddleware, is(["admin"]),new CreateRoleController().create )
routes.post('/createPermisson', is(["admin"]),new CreatePermissionController().create)
routes.post("/roles/:roleId", is(["admin"]), can([""]), new CreateRolePermissionController().create)

export default routes



/* http://localhost:8088/updateDataClient */
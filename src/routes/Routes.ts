import { Router } from 'express'
import { can, is } from '../middlewares/AuthPermissions'
import { authMiddleware } from '../middlewares/AuthMiddleware'

import { CreateUserController } from '../controllers/user/CreateUserController'
import { CreateRoleController } from '../controllers/adminFunctions/CreateRoleController'
import { CreatePermissionController } from '../controllers/adminFunctions/CreatePermissonController'
import { CreateProductController } from '../controllers/product/CreateProductController'
import { CreateRolePermissionController } from '../controllers/adminFunctions/CreateRolePermissionController'

import { AddInforSellerController } from '../controllers/user/sellerController/AddInforSellerController'
import { AddUserAcsessControlListController } from '../controllers/adminFunctions/AddUserAccessControlListController'
import { AddDataClientController } from '../controllers/user/clientController/AddDataClientController'

import { LoginUserController } from '../controllers/user/LoginUserController'

import { GetAllProductOneSellerController } from '../controllers/product/GetAllProductOneSellerController'
import { GetDataSellerController } from '../controllers/user/sellerController/GetDataSellerController'
import { GetDataClientController } from '../controllers/user/clientController/GetDataClientController'

import { DeleteUserController } from '../controllers/user/DeleteUserController'

import { UpdateAllInfoSellerController } from '../controllers/user/sellerController/UpdateAllInfoSellerController'
import { UpdateDataClientController } from '../controllers/user/clientController/UpdateDataClientController'
import { GetStoreProductsController } from '../controllers/product/GetStoreProductsController'
import { PurchaseController } from '../controllers/product/PurchaseController'
import { DeleteProductController } from '../controllers/product/DeleteProductController'
import { UpdateProductController } from '../controllers/product/UpdateProductController'

const routes = Router()

routes.get("/v1/", function (req, res) {
    res.send("Olá Mundo!");
  });
/* 

authMiddleware: faz a validação do token
is: faz a validaçãio da role
can: faz a validação da permission

*/
/* 
*
*  Functions for User generic
*
*/
routes.post('/v1/createUser',new CreateUserController().create)
routes.post('/v1/login', new LoginUserController().login) 
routes.delete('/v1/deleteUser', authMiddleware, new DeleteUserController().delete) 

/* 
*
*  Functions Seller
*
*/
routes.post('/v1/addDataUserSeller', authMiddleware, is(["seller"]), new AddInforSellerController().addDataSeller) 
routes.get('/v1/getDataSeller', authMiddleware, is(["seller"]), new GetDataSellerController().getData) 
routes.put('/v1/updateDataSeller',  authMiddleware, is(["seller"]), new UpdateAllInfoSellerController().updateAllInfoSeller) 
/* Seller Products */
routes.get('/v1/getAllProductOneSeller/:id_userSeller', new GetAllProductOneSellerController().get) 
routes.post('/v1/createProduct', authMiddleware, is(["seller"]), new CreateProductController().create)
routes.delete('/v1/delete/:id', authMiddleware, is(["seller"]), new DeleteProductController().deleteProduct)
routes.put('/v1/updateProduct', authMiddleware, is(["seller"]), new UpdateProductController().updateProduct)
/* 
*
*  Functions Client
*
*/
routes.post('/v1/addDataClient', authMiddleware, is(["client"]), new AddDataClientController().addDataClient) 
routes.get('/v1/getDataClient', authMiddleware, is(["client"]), new GetDataClientController().getData) 
routes.put('/v1/updateDataClient',  authMiddleware, is(["client"]), new UpdateDataClientController().updateDataClient)  

/* 
*
*  Functions Store
*
*/
routes.get('/v1/storeProducts', new GetStoreProductsController().get) 
/* 
*
*  Functions for ADMIN
*
*/
routes.post('/v1/addUserRolePermission', authMiddleware, is(["admin"]),new AddUserAcsessControlListController().addUserRolePermission) 
routes.post('/v1/createRole', new CreateRoleController().create )
routes.post('/v1/createPermisson',new CreatePermissionController().create)
routes.post("/v1/roles/:roleId",authMiddleware, is(["admin"]), new CreateRolePermissionController().create)







routes.post("/v1/purchase", authMiddleware, is(["client"]), new PurchaseController().new)



export default routes



/* http://localhost:8088/v1/purchase */
import { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'
/* import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware' */

const routes = Router()

routes.post('/createUser', new CreateUserController().create)
/* routes.post('/login', new UserController().login) */
/* 
routes.use(authMiddleware)

routes.get('/profile', new UserController().getProfile) */

export default routes
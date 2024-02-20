import express from 'express'
import routes from './routes/Routes'
import { AppDataSource } from './database/data-source'
import { errorMiddleware } from './middlewares/ErrorMiddlewares'

import swaggerDocs from "./swagger.json"
import swaggerUi from "swagger-ui-express"


export default AppDataSource.initialize().then(() => {

 	/* const swaggerUi = require('swagger-ui-express'); 
 	const swaggerDocument = require('./swagger.json'); */ 

	const app = express()

    app.use(express.json())

	app.use(routes)


	console.log("Rodando em : http://localhost:8088/")

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

	app.use(errorMiddleware)
	return app.listen(process.env.PORT)

})


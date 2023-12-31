import express from 'express'
import { AppDataSource } from './database/data-source'
import routes from './routes/Routes'
import { errorMiddleware } from './middlewares/ErrorMiddlewares'

export default AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

	app.use(routes)

	console.log("Rodando em : http://localhost:8088/")	

	app.use(errorMiddleware)
	return app.listen(process.env.PORT)
   
})	


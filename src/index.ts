import express from 'express'
import { AppDataSource } from './database/data-source'
import routes from './routes/Routes'
import { errorMiddleware } from './middlewares/ErrorMiddlewares'

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

	app.use(routes)

	app.use(errorMiddleware)
	console.log("Rodando em : http://localhost:8088/")
	return app.listen(process.env.PORT)
})
import 'dotenv/config'
import 'reflect-metadata'
import { BaseEntity, DataSource } from 'typeorm'
import { Permission } from '../entities/user/Permission'
import { Role } from '../entities/user/Role'
import { User } from '../entities/user/User'
import { Product } from '../entities/store/Product'

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: port,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	/* synchronize: true,
	logging: true, */
	entities: [
		BaseEntity,Permission,Role,User,
		Product
	],

	migrations: [`${__dirname}/**/**/migrations/*.{ts,js}`],
	
})
import { User } from '../entities/user/User'

declare global {
	namespace Express {
		export interface Request {
			user: Partial<User>
		}
	}
} 
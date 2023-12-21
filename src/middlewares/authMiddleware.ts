import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../helpers/api-erros';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import 'dotenv/config';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/user/User';

const userRepository = AppDataSource.getRepository(User);

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
console.log( authorization )
  if (!authorization) {
    throw new UnauthorizedError('Não autorizado');
  }

  const token = authorization.split(' ')[0];

  if (!token) {
    // Handle the case where the token is not provided
	console.log(token)
    throw new UnauthorizedError('Não autorizado');
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
    
      throw new UnauthorizedError('Não autorizado');
     
    }

    const { password: _, ...loggedUser } = user;

    req.user = loggedUser;

    next();
  } catch (err) {
    // Handle other JWT verification errors
    if (err instanceof JsonWebTokenError) {
      // You might want to handle the error differently, for example, send a 401 response
      res.status(401).json({ error: 'Token malformed or expired' });
    } else {
      // For other unexpected errors, you may want to log or handle them accordingly
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
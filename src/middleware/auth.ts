import { Request, Response, NextFunction } from 'express';
import { JwtPayload, Secret } from 'jsonwebtoken';
import Jwt from '../auth/jwtConfig';

const secret: Secret = process.env.JWT_SECRET || 'segredo';
const jwt = new Jwt(secret);

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  const result = jwt.validateToken(token) as JwtPayload;

  if (result.isError) return res.status(401).json({ message: result.message });

  req.body.user = result;
  return next();
};

export default auth;
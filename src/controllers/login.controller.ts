import { Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import Jwt from '../auth/jwtConfig';
import User from '../interfaces/user.interface';
import LoginService from '../services/login.service';

const secret: Secret = process.env.JWT_SECRET || 'segredo';

export default class LoginController {
  public service;

  constructor() {
    this.service = new LoginService();
  }

  public async getAll(req:Request, res:Response):Promise<Response> {
    const userData: User = req.body; 
    const user = await this.service.userLogin(userData);

    if (!user) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    const { id, username } = user;
    
    const jwt = new Jwt(secret);

    const token = jwt.createToken({ id, username });

    return res.status(200).json({ token });
  }
}
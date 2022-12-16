import { Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import User from '../interfaces/user.interface';
import UserService from '../services/user.service';
import Jwt from '../auth/jwtConfig';

const secret: Secret = process.env.JWT_SECRET || 'segredo';

export default class UserController {
  public service:UserService;

  constructor() {
    this.service = new UserService();
  }

  public async createUser(req:Request, res:Response) {
    const user:User = req.body;
    const payload = await this.service.createUser(user);

    const { id, username } = payload;
    
    const jwt = new Jwt(secret);

    const token = jwt.createToken({ id, username });

    return res.status(201).json({ token });
  }
}
import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  public service:OrderService;

  constructor() {
    this.service = new OrderService();
  }

  public async getAll(_req:Request, res:Response):Promise<Response> {
    const orders = await this.service.getAll();
  
    return res.status(200).json(orders);
  }

  public async createOrder(req:Request, res:Response):Promise<Response> {
    const { user, productsIds } = req.body;
    const { id } = user;
    
    const result = await this.service.createOrder(id, productsIds);
  
    return res.status(201).json(result);
  }
}
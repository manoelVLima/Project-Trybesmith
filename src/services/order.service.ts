import OrderModel from '../models/order.model';
import connection from '../models/connection';
import Order from '../interfaces/order.interface';

export default class OrderService {
  public model;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async createOrder(userId:number, productsIds: number[]):Promise<object> {
    const result = await this.model.createOrder(userId, productsIds);

    return result;
  }
}
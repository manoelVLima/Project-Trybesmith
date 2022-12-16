import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection;
  
  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [orders] = await this.connection.execute(
      `SELECT o.id, o.user_id AS userId,JSON_ARRAYAGG(p.id) as productsIds
      FROM Trybesmith.orders AS o INNER JOIN Trybesmith.products AS p
      WHERE o.id = p.order_id GROUP BY o.id;`,
    );    
    return orders as Order[];
  }

  public async createOrder(userId:number, productsIds:number[]):Promise<object> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.orders (user_id) VALUES (?)`, [userId]);

    await Promise.all(productsIds.map((product) => 
      this.connection
        .execute(`UPDATE Trybesmith.products SET 
        order_id = ? WHERE id = ?`, [insertId, product])));

    return ({ userId, productsIds });
  }
}
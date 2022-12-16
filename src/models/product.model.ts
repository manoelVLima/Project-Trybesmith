import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool; 

  constructor(connection: Pool) {
    this.connection = connection;
  }
  
  public async getAll():Promise<Product[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.products');
    const [rows] = result;
    
    return rows as Product[];
  }

  public async createProduct(book: Product):Promise<Product> {
    const { name, amount } = book;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)`, [name, amount]);
    return { id: insertId, ...book };
  }
}

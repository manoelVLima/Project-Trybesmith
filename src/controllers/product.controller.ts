import { Request, Response } from 'express';
import Product from '../interfaces/product.interface';
import ProductService from '../services/product.service';

export default class ProductController {
  public service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public async getAll(_req: Request, res: Response) {
    const products = await this.service.getAll();

    res.status(200).json(products);
  }

  public async createNewProduct(req: Request, res: Response) {
    const product: Product = req.body;
    const payload = await this.service.createProduct(product);

    return res.status(201).json(payload);
  }
}

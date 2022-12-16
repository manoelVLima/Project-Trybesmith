import { Router } from 'express';

import ProductController from '../controllers/product.controller';
import { validateProduct } from '../middleware/validators';

const router = Router();

const productController = new ProductController();

router.get('/', productController.getAll.bind(productController));
router.post('/', validateProduct, productController.createNewProduct.bind(productController));

export default router;
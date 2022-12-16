import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import auth from '../middleware/auth';
import { validateOrder } from '../middleware/validators';

const router = Router();

const orderController = new OrderController();

router.get('/', orderController.getAll.bind(orderController));
router.post('/', auth, validateOrder, orderController.createOrder.bind(orderController));
export default router;
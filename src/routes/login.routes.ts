import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import { validateLogin } from '../middleware/validators';

const router = Router();
const loginController = new LoginController();

router.post('/', validateLogin, loginController.getAll.bind(loginController));

export default router;
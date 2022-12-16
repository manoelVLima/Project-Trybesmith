import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateUser, validateUserWithJoi } from '../middleware/validators';

const router = Router();
const userController = new UserController();

router.post('/', validateUser, validateUserWithJoi, userController.createUser.bind(userController));

export default router;
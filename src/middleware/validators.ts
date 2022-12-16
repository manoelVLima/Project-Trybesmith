import { NextFunction, Response, Request } from 'express';
import Product from '../interfaces/product.interface';
import User from '../interfaces/user.interface';
import Order from '../interfaces/order.interface';

import loginSchema from '../validators/login.validator';
import productSchema from '../validators/product.validator';
import userSchema from '../validators/user.validator';
import orderSchema from '../validators/order.validator';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body;
  const { error } = loginSchema.validate(userData);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return next();
};

const validateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productData:Product = req.body;
  const { error } = productSchema.validate(productData);

  if (!productData.amount) return res.status(400).json({ message: '"amount" is required' });

  if (!productData.name) return res.status(400).json({ message: '"name" is required' });

  if (error) {
    console.log(error.isJoi);
    
    return res.status(422).json({ message: error.message });
  }
  return next();
};

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userData:User = req.body;

  if (!userData.password) return res.status(400).json({ message: '"password" is required' });

  if (userData.level === undefined) return res.status(400).json({ message: '"level" is required' });

  if (!userData.vocation) return res.status(400).json({ message: '"vocation" is required' });

  if (!userData.username) return res.status(400).json({ message: '"username" is required' });

  return next();
};

const validateUserWithJoi = async (req: Request, res: Response, next: NextFunction) => {
  const userData:User = req.body;
  const { error } = userSchema.validate(userData);

  if (error) {
    console.log(error.isJoi);
    
    return res.status(422).json({ message: error.message });
  }
  return next();
};

const validateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { productsIds }: Order = req.body;
  const { error } = orderSchema.validate(productsIds);
  
  if (error?.details[0].type === 'any.required') {    
    return res.status(400).json({ message: error.message });
  }

  if (error?.details[0].type === 'array.base') {    
    return res.status(422).json({ message: error.message });
  }

  if (error?.details[0].type === 'array.includesRequiredUnknowns') {    
    return res.status(422).json({ message: error.message });
  }
  return next();
};

export {
  validateLogin,
  validateProduct,
  validateUserWithJoi,
  validateUser,
  validateOrder,
};

// type Keys = keyof typeof validators;

// export default (validator: Keys) => 
//   // if (!(validator in validators)) throw new Error(`${validator} validator does not exist`);
//   async (req: Request, _res: Response, next: NextFunction) => {
//     try {
//       const validated = await validators[validator].validateAsync(req.body);
//       req.body = validated;
//       next();
//     } catch (error: any | unknown) {
//       return next(createHttpError(422, { message: error.message }));
//       // next(createHttpError(500));
//     }
//   };

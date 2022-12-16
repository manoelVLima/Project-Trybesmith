import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  password: Joi.string().min(5).max(15).required(),
}).required();

export default loginSchema;

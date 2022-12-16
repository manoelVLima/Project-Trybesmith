import Joi from 'joi';

const orderSchema = Joi.array().items(Joi.number().required()).required().messages({
  'array.includesRequiredUnknowns': '"productsIds" must include only numbers',
  'any.required': '"productsIds" is required',
  'array.base': '"productsIds" must be an array',
});

export default orderSchema;

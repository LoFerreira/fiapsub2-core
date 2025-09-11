import { Joi } from "celebrate";

export const vehicleCreateSchema = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().integer().required(),
  color: Joi.string().required(),
  price: Joi.number().required(),
  sold: Joi.boolean().default(false),
  buyerCpf: Joi.string().optional(),
  saleDate: Joi.string().optional(),
});

export const vehicleUpdateSchema = Joi.object({
  brand: Joi.string().optional(),
  model: Joi.string().optional(),
  year: Joi.number().integer().optional(),
  color: Joi.string().optional(),
  price: Joi.number().optional(),
}).options({ stripUnknown: true });

export const vehicleIdParamSchema = Joi.object({
  id: Joi.string().required(),
});

export const vehicleSellBodySchema = Joi.object({
  buyerCpf: Joi.string().required(),
});

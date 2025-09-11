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

export const vehicleUpdateSchema = vehicleCreateSchema; // For now same as create

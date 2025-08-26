import express from "express";
import expressAsyncHandler from "express-async-handler";
import { celebrate, Joi, Segments } from "celebrate";
import { vehicleSchema } from "../../domain/entities/vehicle.entity";
import { VehicleController } from "../controllers/vehicle.controller";

const vehicleRoutes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - brand
 *         - model
 *         - year
 *         - color
 *         - price
 *       properties:
 *         brand:
 *           type: string
 *           description: Marca do veículo
 *         model:
 *           type: string
 *           description: Modelo do veículo
 *         year:
 *           type: number
 *           description: Ano do veículo
 *         color:
 *           type: string
 *           description: Cor do veículo
 *         price:
 *           type: number
 *           description: Preço do veículo
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Cria um novo veículo
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Dados inválidos
 */
vehicleRoutes.post(
  "/vehicles",
  celebrate({ [Segments.BODY]: vehicleSchema }),
  expressAsyncHandler(VehicleController.create)
);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Exclui um veículo existente
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do veículo a ser excluído
 *     responses:
 *       200:
 *         description: Veículo excluído com sucesso
 */
vehicleRoutes.delete(
  "/vehicles/:id",
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
  expressAsyncHandler(VehicleController.delete)
);

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Atualiza um veículo existente
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do veículo a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 */
vehicleRoutes.put(
  "/vehicles/:id",
  celebrate({ [Segments.BODY]: vehicleSchema }),
  expressAsyncHandler(VehicleController.update)
);

export default vehicleRoutes;

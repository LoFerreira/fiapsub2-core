import { Request, Response } from "express";
import { vehicle } from "../../domain/entities/vehicle.entity";
import { CreateVehicleUseCase } from "../../useCases/vehicle/createVehicle.useCase";
import { UpdateVehicleUseCase } from "../../useCases/vehicle/updateVehicle.useCase";
import { DeleteVehicleUseCase } from "../../useCases/vehicle/deleteVehicle.useCase";

export class VehicleController {
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const vehicleData: vehicle = req.body;

    const updateVehicleUseCase = new UpdateVehicleUseCase();
    const updatedVehicle = await updateVehicleUseCase.execute(id, vehicleData);

    res.status(200).send({
      message: `Vehicle with id ${id} updated successfully`,
      vehicle: updatedVehicle,
    });
  }

  static async create(req: Request, res: Response) {
    const vehicleData: vehicle = req.body;

    const createVehicleUseCase = new CreateVehicleUseCase();
    const vehicle = await createVehicleUseCase.execute(vehicleData);

    res.status(201).send({ message: "Vehicle created successfully", vehicle });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteVehicleUseCase = new DeleteVehicleUseCase();
    await deleteVehicleUseCase.execute(id);

    res
      .status(200)
      .send({ message: `Vehicle with id ${id} deleted successfully` });
  }
}

import { Request, Response } from "express";
import { GetAllVehiclesUseCase } from "../../useCases/vehicle/getAllVehicles.useCase";
import { CreateVehicleUseCase } from "../../useCases/vehicle/createVehicle.useCase";
import { UpdateVehicleUseCase } from "../../useCases/vehicle/updateVehicle.useCase";
import { VehiclePresenter } from "../../application/presenters/vehicle.presenter";
import {
  VehicleCreateDTO,
  VehicleUpdateDTO,
} from "../../application/dto/vehicle.dto";
import { VehicleRepository } from "../repositories/vehicle.repository";

export class VehicleController {
  static async getAll(req: Request, res: Response) {
    const { filter } = req.query;

    const getAllVehiclesUseCase = new GetAllVehiclesUseCase(
      new VehicleRepository()
    );
    const vehicles = await getAllVehiclesUseCase.execute(filter as string);
    res.status(200).send(VehiclePresenter.list(vehicles));
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const vehicleData: VehicleUpdateDTO = req.body;

    const updateVehicleUseCase = new UpdateVehicleUseCase(
      new VehicleRepository()
    );
    const updatedVehicle = await updateVehicleUseCase.execute(
      id,
      vehicleData as any
    );

    res.status(200).send({
      message: `Vehicle with id ${id} updated successfully`,
      vehicle: VehiclePresenter.toResponse(updatedVehicle),
    });
  }

  static async create(req: Request, res: Response) {
    const vehicleData: VehicleCreateDTO = req.body;

    const createVehicleUseCase = new CreateVehicleUseCase(
      new VehicleRepository()
    );
    const vehicle = await createVehicleUseCase.execute(vehicleData as any);
    res.status(201).send({
      message: "Vehicle created successfully",
      vehicle: VehiclePresenter.toResponse(vehicle),
    });
  }
}

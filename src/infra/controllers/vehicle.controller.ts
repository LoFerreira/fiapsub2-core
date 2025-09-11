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
import { DeleteVehicleUseCase } from "../../useCases/vehicle/deleteVehicle.useCase";
import { MarkVehicleAsSoldUseCase } from "../../useCases/vehicle/markVehicleAsSold.useCase";

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

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteVehicleUseCase = new DeleteVehicleUseCase(
      new VehicleRepository()
    );
    await deleteVehicleUseCase.execute(id);

    res.status(200).send({
      message: `Vehicle with id ${id} deleted successfully`,
    });
  }

  static async sell(req: Request, res: Response) {
    const { id } = req.params;
    const { buyerCpf } = req.body as { buyerCpf: string };

    const markVehicleAsSoldUseCase = new MarkVehicleAsSoldUseCase(
      new VehicleRepository()
    );
    const soldVehicle = await markVehicleAsSoldUseCase.execute(id, buyerCpf);

    res.status(200).send({
      message: `Vehicle with id ${id} marked as sold`,
      vehicle: VehiclePresenter.toResponse(soldVehicle as any),
    });
  }
}

import { vehicle } from "../../domain/entities/vehicle.entity";
import { VehicleGateway } from "../../application/ports/vehicle.gateway";
import { VehicleRepository } from "../../infra/repositories/vehicle.repository";
import { NotFoundError } from "../../domain/errors/not-found.error";
import { AlreadySoldError } from "../../domain/errors/already-sold.error";

export class MarkVehicleAsSoldUseCase {
  constructor(
    private vehicleRepository: VehicleGateway = new VehicleRepository()
  ) {}

  async execute(vehicleId: string, buyerCpf: string): Promise<vehicle | null> {
    const existingVehicle = await this.vehicleRepository.getById(vehicleId);

    if (!existingVehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    if (existingVehicle.sold) {
      throw new AlreadySoldError("Vehicle already sold");
    }

    const soldVehicle = await this.vehicleRepository.sell(vehicleId, buyerCpf);

    return soldVehicle;
  }
}

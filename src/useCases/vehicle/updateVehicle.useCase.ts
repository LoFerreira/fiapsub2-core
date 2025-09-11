import { vehicle } from "../../domain/entities/vehicle.entity";
import { VehicleGateway } from "../../application/ports/vehicle.gateway";
import { VehicleRepository } from "../../infra/repositories/vehicle.repository";
import { NotFoundError } from "../../domain/errors/not-found.error";

export class UpdateVehicleUseCase {
  constructor(
    private vehicleRepository: VehicleGateway = new VehicleRepository()
  ) {}

  async execute(id: string, vehicleData: Partial<vehicle>): Promise<vehicle> {
    const vehicle = await this.vehicleRepository.update(id, vehicleData);
    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }
    return vehicle;
  }
}

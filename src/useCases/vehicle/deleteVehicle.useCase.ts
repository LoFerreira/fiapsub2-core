import { VehicleGateway } from "../../application/ports/vehicle.gateway";
import { VehicleRepository } from "../../infra/repositories/vehicle.repository";
import { NotFoundError } from "../../domain/errors/not-found.error";

export class DeleteVehicleUseCase {
  constructor(
    private vehicleRepository: VehicleGateway = new VehicleRepository()
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.vehicleRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError("Vehicle not found");
    }
  }
}

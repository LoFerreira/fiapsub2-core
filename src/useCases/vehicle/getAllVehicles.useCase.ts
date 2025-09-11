import { vehicle } from "../../domain/entities/vehicle.entity";
import { VehicleGateway } from "../../application/ports/vehicle.gateway";
import { VehicleRepository } from "../../infra/repositories/vehicle.repository";

export class GetAllVehiclesUseCase {
  constructor(
    private vehicleRepository: VehicleGateway = new VehicleRepository()
  ) {}

  async execute(filter: string): Promise<vehicle[]> {
    return this.vehicleRepository.getAll(filter);
  }
}

import { VehicleRepository } from "../../infra/repositories/vehicle.repository";

export class DeleteVehicleUseCase {
  private vehicleRepository: VehicleRepository;

  constructor() {
    this.vehicleRepository = new VehicleRepository();
  }

  async execute(id: string): Promise<boolean> {
    return this.vehicleRepository.delete(id);
  }
}

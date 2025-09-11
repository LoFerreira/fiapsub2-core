import { VehicleGateway } from "../ports/vehicle.gateway";
import { CreateVehicleUseCase } from "../../useCases/vehicle/createVehicle.useCase";
import { GetAllVehiclesUseCase } from "../../useCases/vehicle/getAllVehicles.useCase";
import { UpdateVehicleUseCase } from "../../useCases/vehicle/updateVehicle.useCase";
import { VehiclePresenter } from "../presenters/vehicle.presenter";
import { VehicleCreateDTO, VehicleUpdateDTO } from "../dto/vehicle.dto";

export class VehicleAppController {
  constructor(private gateway: VehicleGateway) {}

  async list(filter: string) {
    const useCase = new GetAllVehiclesUseCase(this.gateway);
    const result = await useCase.execute(filter);
    return VehiclePresenter.list(result);
  }

  async create(data: VehicleCreateDTO) {
    const useCase = new CreateVehicleUseCase(this.gateway);
    const vehicle = await useCase.execute(data);
    return VehiclePresenter.toResponse(vehicle);
  }

  async update(id: string, data: VehicleUpdateDTO) {
    const useCase = new UpdateVehicleUseCase(this.gateway);
    const vehicle = await useCase.execute(id, data);
    return VehiclePresenter.toResponse(vehicle);
  }
}

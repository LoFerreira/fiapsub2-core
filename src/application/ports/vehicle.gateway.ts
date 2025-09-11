import { vehicle } from "../../domain/entities/vehicle.entity";

// Port/Gateway for vehicle persistence. Implemented in infra layer.
export interface VehicleGateway {
  getAll(filter: string): Promise<vehicle[]>;
  getById(id: string): Promise<vehicle | null>;
  create(vehicleData: Partial<vehicle>): Promise<vehicle>;
  update(id: string, vehicleData: Partial<vehicle>): Promise<vehicle | null>;
  sell(id: string, buyerCpf: string): Promise<vehicle | null>;
  delete(id: string): Promise<boolean>;
}

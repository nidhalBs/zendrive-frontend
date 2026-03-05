export interface Vehicle {
  id: number;
  name: string;
  brand: string;
  model: string;
  imageUrl?: string;
  passengerCapacity: number;
  baggageCapacity: number;
  comfortLevel: 'STANDARD' | 'PREMIUM' | 'VIP' | 'LUXURY';
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'RETIRED';
  pricePerKm: number;
  pricePerHour?: number;
  baseFare?: number;
  licensePlate?: string;
  description?: string;
  active: boolean;
}

export interface CreateVehicleRequest {
  name: string;
  brand: string;
  model: string;
  imageUrl?: string;
  passengerCapacity: number;
  baggageCapacity: number;
  comfortLevel: 'STANDARD' | 'PREMIUM' | 'VIP' | 'LUXURY';
  pricePerKm: number;
  pricePerHour?: number;
  baseFare?: number;
  licensePlate?: string;
  description?: string;
}

export interface Excursion {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  type: 'PACKAGED' | 'CUSTOM';
  basePrice: number;
  estimatedDurationHours?: number;
  zone?: string;
  active: boolean;
  minPassengers: number;
  maxPassengers: number;
  highlights?: string[];
  lunchIncluded?: boolean;
  guideIncluded?: boolean;
  steps?: ExcursionStep[];
}

export interface ExcursionStep {
  id?: number;
  stepOrder: number;
  locationName: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  durationMinutes?: number;
  imageUrl?: string;
}

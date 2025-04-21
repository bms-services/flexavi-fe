
export type RoofMaterialType = 
  | "tiles" 
  | "slate" 
  | "metal" 
  | "flat" 
  | "shingles" 
  | "unknown";

export type RoofCondition = 
  | "excellent" 
  | "good" 
  | "fair" 
  | "poor" 
  | "critical";

export interface RoofMeasurement {
  id: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  area: number; // in square meters
  pitch: number; // in degrees
  materialType: RoofMaterialType;
  condition: RoofCondition;
  notes?: string;
  imageUrl?: string;
  leadId?: string;
  latitude?: number;
  longitude?: number;
}

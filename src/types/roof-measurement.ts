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

export interface RoofPhotoAnalysis {
  estimatedArea: number;
  estimatedMaterial: RoofMaterialType;
  estimatedCondition: RoofCondition;
  confidence: number;
  notes: string;
}

export interface RoofMeasurement {
  id: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  area: number;
  pitch: number;
  materialType: RoofMaterialType;
  condition: RoofCondition;
  notes?: string;
  imageUrl?: string;
  leadId?: string;
  latitude?: number;
  longitude?: number;
  photoAnalysis?: RoofPhotoAnalysis;
}

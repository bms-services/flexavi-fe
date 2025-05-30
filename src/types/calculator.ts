
export interface CalculationMaterial {
  id: string;
  name: string;
  unit: 'm²' | 'm' | 'stuk' | 'liter' | 'kg' | 'uur';
  unitPrice: number;
  quantity: number;
}

export interface CalculationLabor {
  id: string;
  description: string;
  hourlyRate: number;
  hours: number;
}

export interface CalculationEquipment {
  id: string;
  name: string;
  rentalRate: number;
  days: number;
}

export interface CalculationMisc {
  id: string;
  description: string;
  cost: number;
}

export interface MaterialEstimateItem {
  name: string;
  unit: 'm²' | 'm' | 'stuk' | 'liter' | 'kg' | 'uur';
  quantity: number;
  unitPrice: number;
}

export interface MaterialEstimate {
  mainMaterial: MaterialEstimateItem;
  additionalMaterials: MaterialEstimateItem[];
}

export interface RoofParams {
  roofType: 'plat' | 'schuin' | 'anders';
  roofArea: number; // in square meters
  roofPitch?: number; // in degrees, for pitched roofs
  complexity: 'eenvoudig' | 'gemiddeld' | 'complex';
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  leadId?: string;
  projectId?: string;
  roofParams: RoofParams;
  materials: CalculationMaterial[];
  labor: CalculationLabor[];
  equipment: CalculationEquipment[];
  miscellaneous: CalculationMisc[];
  marginPercentage: number;
  taxRate: number;
}

export interface CalculationSummary {
  materialsCost: number;
  laborCost: number;
  equipmentCost: number;
  miscCost: number;
  subtotal: number;
  margin: number;
  subtotalWithMargin: number;
  tax: number;
  total: number;
  pricePerSquareMeter: number;
}

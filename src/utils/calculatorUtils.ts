
import { Calculator, CalculationSummary, MaterialEstimate } from "@/types/calculator";
import { v4 as uuidv4 } from "uuid";

export const calculateSummary = (calculator: Calculator): CalculationSummary => {
  // Calculate material costs
  const materialsCost = calculator.materials.reduce(
    (total, material) => total + material.unitPrice * material.quantity,
    0
  );

  // Calculate labor costs
  const laborCost = calculator.labor.reduce(
    (total, labor) => total + labor.hourlyRate * labor.hours,
    0
  );

  // Calculate equipment costs
  const equipmentCost = calculator.equipment.reduce(
    (total, equipment) => total + equipment.rentalRate * equipment.days,
    0
  );

  // Calculate miscellaneous costs
  const miscCost = calculator.miscellaneous.reduce(
    (total, misc) => total + misc.cost,
    0
  );

  // Calculate subtotal
  const subtotal = materialsCost + laborCost + equipmentCost + miscCost;

  // Calculate margin
  const margin = subtotal * (calculator.marginPercentage / 100);

  // Calculate subtotal with margin
  const subtotalWithMargin = subtotal + margin;

  // Calculate tax
  const tax = subtotalWithMargin * (calculator.taxRate / 100);

  // Calculate total
  const total = subtotalWithMargin + tax;

  // Calculate price per square meter
  const pricePerSquareMeter = calculator.roofParams.roofArea > 0 
    ? total / calculator.roofParams.roofArea
    : 0;

  return {
    materialsCost,
    laborCost,
    equipmentCost,
    miscCost,
    subtotal,
    margin,
    subtotalWithMargin,
    tax,
    total,
    pricePerSquareMeter
  };
};

export const createNewCalculator = (): Calculator => {
  return {
    id: uuidv4(),
    name: "Nieuwe berekening",
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    roofParams: {
      roofType: "plat",
      roofArea: 0,
      complexity: "gemiddeld"
    },
    materials: [],
    labor: [],
    equipment: [],
    miscellaneous: [],
    marginPercentage: 20,
    taxRate: 21
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

export const estimateMaterialNeeds = (
  roofArea: number,
  roofType: 'plat' | 'schuin' | 'anders',
  complexity: 'eenvoudig' | 'gemiddeld' | 'complex'
): MaterialEstimate => {
  // Wastage factor based on complexity
  const wastageFactor = 
    complexity === 'eenvoudig' ? 1.05 : 
    complexity === 'gemiddeld' ? 1.10 : 1.15;
    
  // For flat roofs
  if (roofType === 'plat') {
    return {
      mainMaterial: {
        name: 'EPDM rubber folie 1,14mm',
        unit: 'm²' as const,
        quantity: Math.ceil(roofArea * wastageFactor),
        unitPrice: 12.50
      },
      additionalMaterials: [
        {
          name: 'Polyurethaan lijm',
          unit: 'liter' as const,
          // Approximately 0.2 liter per m²
          quantity: Math.ceil((roofArea * 0.2) * wastageFactor),
          unitPrice: 8.75
        },
        {
          name: 'Aluminium daktrim',
          unit: 'm' as const,
          // Estimate perimeter as sqrt(area) * 4
          quantity: Math.ceil(Math.sqrt(roofArea) * 4 * wastageFactor),
          unitPrice: 12.35
        }
      ]
    };
  }
  
  // For pitched roofs
  if (roofType === 'schuin') {
    return {
      mainMaterial: {
        name: 'Keramische dakpannen',
        unit: 'm²' as const,
        quantity: Math.ceil(roofArea * wastageFactor),
        unitPrice: 32.50
      },
      additionalMaterials: [
        {
          name: 'Tengels & panlatten',
          unit: 'm' as const,
          // Approximately 3m per m²
          quantity: Math.ceil((roofArea * 3) * wastageFactor),
          unitPrice: 2.25
        },
        {
          name: 'Dakfolie',
          unit: 'm²' as const,
          quantity: Math.ceil(roofArea * wastageFactor),
          unitPrice: 3.75
        }
      ]
    };
  }
  
  // Default for other types
  return {
    mainMaterial: {
      name: 'Dakbedekking',
      unit: 'm²' as const,
      quantity: Math.ceil(roofArea * wastageFactor),
      unitPrice: 25.00
    },
    additionalMaterials: []
  };
};

export const estimateLaborHours = (roofArea: number, roofType: 'plat' | 'schuin' | 'anders', complexity: 'eenvoudig' | 'gemiddeld' | 'complex'): number => {
  // Base hours per square meter
  const baseHoursPerSqm =
    roofType === 'plat' ? 0.25 :
    roofType === 'schuin' ? 0.35 : 0.3;
    
  // Complexity multiplier
  const complexityMultiplier = 
    complexity === 'eenvoudig' ? 1 : 
    complexity === 'gemiddeld' ? 1.3 : 1.6;
    
  return roofArea * baseHoursPerSqm * complexityMultiplier;
};

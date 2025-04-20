
import { Calculator } from "@/types/calculator";
import { v4 as uuidv4 } from "uuid";

export const mockCalculators: Calculator[] = [
  {
    id: "calc-1",
    name: "Dakbedekking renovatie Willemstraat",
    description: "Renovatie van plat dak met nieuwe EPDM bedekking",
    createdAt: "2025-04-15T10:30:00Z",
    updatedAt: "2025-04-15T14:45:00Z",
    leadId: "lead-1",
    roofParams: {
      roofType: "plat",
      roofArea: 120,
      complexity: "gemiddeld"
    },
    materials: [
      {
        id: uuidv4(),
        name: "EPDM rubber folie 1,14mm",
        unit: "m²",
        unitPrice: 12.50,
        quantity: 132
      },
      {
        id: uuidv4(),
        name: "Polyurethaan lijm",
        unit: "liter",
        unitPrice: 8.75,
        quantity: 25
      },
      {
        id: uuidv4(),
        name: "Isolatieplaten PIR 100mm",
        unit: "m²",
        unitPrice: 28.90,
        quantity: 120
      },
      {
        id: uuidv4(),
        name: "Aluminium daktrim",
        unit: "m",
        unitPrice: 12.35,
        quantity: 45
      }
    ],
    labor: [
      {
        id: uuidv4(),
        description: "Dakdekker",
        hourlyRate: 45,
        hours: 32
      },
      {
        id: uuidv4(),
        description: "Assistent dakdekker",
        hourlyRate: 35,
        hours: 32
      }
    ],
    equipment: [
      {
        id: uuidv4(),
        name: "Hoogwerker",
        rentalRate: 180,
        days: 2
      },
      {
        id: uuidv4(),
        name: "Bouwlift",
        rentalRate: 85,
        days: 4
      }
    ],
    miscellaneous: [
      {
        id: uuidv4(),
        description: "Afvoer oud materiaal",
        cost: 450
      },
      {
        id: uuidv4(),
        description: "Transport",
        cost: 250
      }
    ],
    marginPercentage: 20,
    taxRate: 21
  },
  {
    id: "calc-2",
    name: "Pannendak vervanging Oranjelaan",
    description: "Vervangen van dakpannen bij vrijstaand woonhuis",
    createdAt: "2025-04-12T08:15:00Z",
    updatedAt: "2025-04-12T16:30:00Z",
    leadId: "lead-3",
    projectId: "proj-2",
    roofParams: {
      roofType: "schuin",
      roofArea: 180,
      roofPitch: 35,
      complexity: "complex"
    },
    materials: [
      {
        id: uuidv4(),
        name: "Keramische dakpannen",
        unit: "m²",
        unitPrice: 32.50,
        quantity: 198
      },
      {
        id: uuidv4(),
        name: "Tengels & panlatten",
        unit: "m",
        unitPrice: 2.25,
        quantity: 580
      },
      {
        id: uuidv4(),
        name: "Dakfolie",
        unit: "m²",
        unitPrice: 3.75,
        quantity: 198
      },
      {
        id: uuidv4(),
        name: "Nokvorsten",
        unit: "stuk",
        unitPrice: 8.95,
        quantity: 35
      }
    ],
    labor: [
      {
        id: uuidv4(),
        description: "Dakdekker",
        hourlyRate: 45,
        hours: 56
      },
      {
        id: uuidv4(),
        description: "Assistent dakdekker",
        hourlyRate: 35,
        hours: 56
      },
      {
        id: uuidv4(),
        description: "Timmerman",
        hourlyRate: 42,
        hours: 16
      }
    ],
    equipment: [
      {
        id: uuidv4(),
        name: "Steigerwerk rondom",
        rentalRate: 320,
        days: 7
      },
      {
        id: uuidv4(),
        name: "Bouwlift",
        rentalRate: 85,
        days: 7
      }
    ],
    miscellaneous: [
      {
        id: uuidv4(),
        description: "Afvoer oude pannen",
        cost: 750
      },
      {
        id: uuidv4(),
        description: "Transport",
        cost: 350
      },
      {
        id: uuidv4(),
        description: "Veiligheidsvoorzieningen",
        cost: 275
      }
    ],
    marginPercentage: 18,
    taxRate: 21
  },
  {
    id: "calc-3",
    name: "Dakkapel plaatsing Beatrixstraat",
    description: "Nieuwe dakkapel inclusief dakbedekking",
    createdAt: "2025-04-08T11:20:00Z",
    updatedAt: "2025-04-09T09:15:00Z",
    leadId: "lead-5",
    roofParams: {
      roofType: "schuin",
      roofArea: 8,
      roofPitch: 40,
      complexity: "complex"
    },
    materials: [
      {
        id: uuidv4(),
        name: "Prefab dakkapel 4m",
        unit: "stuk",
        unitPrice: 4250,
        quantity: 1
      },
      {
        id: uuidv4(),
        name: "EPDM dakbedekking",
        unit: "m²",
        unitPrice: 12.50,
        quantity: 10
      },
      {
        id: uuidv4(),
        name: "Afwerkmaterialen",
        unit: "stuk",
        unitPrice: 450,
        quantity: 1
      }
    ],
    labor: [
      {
        id: uuidv4(),
        description: "Dakdekker",
        hourlyRate: 45,
        hours: 16
      },
      {
        id: uuidv4(),
        description: "Timmerman",
        hourlyRate: 42,
        hours: 24
      }
    ],
    equipment: [
      {
        id: uuidv4(),
        name: "Kraan voor plaatsing",
        rentalRate: 750,
        days: 1
      },
      {
        id: uuidv4(),
        name: "Steiger voorzijde",
        rentalRate: 120,
        days: 3
      }
    ],
    miscellaneous: [
      {
        id: uuidv4(),
        description: "Transport dakkapel",
        cost: 350
      },
      {
        id: uuidv4(),
        description: "Vergunningskosten",
        cost: 275
      }
    ],
    marginPercentage: 22,
    taxRate: 21
  }
];

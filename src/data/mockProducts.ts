
import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    title: "Zonnepanelen installatie",
    description: "Complete installatie van zonnepanelen inclusief montage",
    unit: "stuk",
    pricePerUnit: 450,
    vat: 21,
    category: "Installatie"
  },
  {
    id: "prod-2",
    title: "Airconditioning",
    description: "Split-unit airconditioning inclusief montage",
    unit: "stuk",
    pricePerUnit: 1200,
    vat: 21,
    category: "Installatie"
  },
  {
    id: "prod-3",
    title: "Onderhoud CV ketel",
    description: "Jaarlijks onderhoud van CV installatie",
    unit: "stuk",
    pricePerUnit: 95,
    vat: 21,
    category: "Onderhoud"
  },
  {
    id: "prod-4",
    title: "Elektra aanleg",
    description: "Aanleg van elektra per m²",
    unit: "m²",
    pricePerUnit: 45,
    vat: 21,
    category: "Installatie"
  },
  {
    id: "prod-5",
    title: "Warmtepomp installatie",
    description: "Complete installatie van een warmtepomp",
    unit: "stuk",
    pricePerUnit: 2500,
    vat: 21,
    category: "Installatie"
  }
];

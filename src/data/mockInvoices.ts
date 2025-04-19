
import { Invoice } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const mockInvoices: Invoice[] = [
  {
    id: "inv-1",
    leadId: "1",
    quoteId: "quote-1",
    amount: 3500.00,
    status: "sent",
    description: "Dakrenovatie en isolatie werkzaamheden",
    createdAt: "2025-04-05T10:00:00Z",
    dueDate: "2025-05-05T00:00:00Z",
    updatedAt: "2025-04-05T14:30:00Z",
    lineItems: [
      {
        id: uuidv4(),
        description: "Dakrenovatie",
        quantity: 1,
        unit: "project",
        pricePerUnit: 2500.00,
        total: 2500.00,
        vatRate: 21
      },
      {
        id: uuidv4(),
        description: "Isolatiemateriaal",
        quantity: 50,
        unit: "m²",
        pricePerUnit: 20.00,
        total: 1000.00,
        vatRate: 21
      }
    ]
  },
  {
    id: "inv-2",
    leadId: "2",
    quoteId: "quote-2",
    amount: 2800.50,
    status: "paid",
    description: "Installatie van zonnepanelen inclusief omvormer",
    createdAt: "2025-04-10T09:15:00Z",
    dueDate: "2025-05-10T00:00:00Z",
    updatedAt: "2025-04-15T11:20:00Z",
    paymentDate: "2025-04-25T00:00:00Z",
    lineItems: [
      {
        id: uuidv4(),
        description: "Zonnepanelen (320W)",
        quantity: 10,
        unit: "stuk",
        pricePerUnit: 200.00,
        total: 2000.00,
        vatRate: 21
      },
      {
        id: uuidv4(),
        description: "Omvormer",
        quantity: 1,
        unit: "stuk",
        pricePerUnit: 800.50,
        total: 800.50,
        vatRate: 21
      }
    ]
  },
  {
    id: "inv-3",
    leadId: "4",
    quoteId: "quote-4",
    amount: 4750.25,
    status: "overdue",
    description: "Volledige dakrenovatie inclusief materiaalkosten",
    createdAt: "2025-03-15T13:45:00Z",
    dueDate: "2025-04-15T00:00:00Z",
    updatedAt: "2025-03-20T16:30:00Z",
    lineItems: [
      {
        id: uuidv4(),
        description: "Verwijderen oude dakbedekking",
        quantity: 1,
        unit: "project",
        pricePerUnit: 1200.00,
        total: 1200.00,
        vatRate: 21
      },
      {
        id: uuidv4(),
        description: "Nieuwe dakpannen",
        quantity: 250,
        unit: "m²",
        pricePerUnit: 12.50,
        total: 3125.00,
        vatRate: 21
      },
      {
        id: uuidv4(),
        description: "Arbeid dakleggers",
        quantity: 16,
        unit: "uur",
        pricePerUnit: 45.00,
        total: 720.00,
        vatRate: 21
      }
    ]
  },
  {
    id: "inv-4",
    leadId: "5",
    quoteId: "quote-5",
    amount: 1850.00,
    status: "sent",
    description: "Plaatsing van nieuwe dakgoten en regenpijpen",
    createdAt: "2025-04-12T08:30:00Z",
    dueDate: "2025-05-12T00:00:00Z",
    updatedAt: "2025-04-12T10:15:00Z",
    lineItems: [
      {
        id: uuidv4(),
        description: "Dakgoten (aluminium)",
        quantity: 25,
        unit: "m",
        pricePerUnit: 45.00,
        total: 1125.00,
        vatRate: 21
      },
      {
        id: uuidv4(),
        description: "Regenpijpen",
        quantity: 4,
        unit: "stuk",
        pricePerUnit: 75.00,
        total: 300.00,
        vatRate: 21
      },
      {
        id: uuidv4(),
        description: "Installatie",
        quantity: 8,
        unit: "uur",
        pricePerUnit: 55.00,
        total: 440.00,
        vatRate: 21
      }
    ]
  },
  {
    id: "inv-5",
    leadId: "6",
    quoteId: "quote-6",
    amount: 6250.50,
    status: "draft",
    description: "Totaalpakket: isolatie, zonnepanelen en dakrenovatie",
    createdAt: "2025-04-15T14:00:00Z",
    dueDate: "2025-05-15T00:00:00Z",
    updatedAt: "2025-04-15T09:45:00Z",
    lineItems: [
      {
        id: uuidv4(),
        description: "Dakrenovatie",
        quantity: 1,
        unit: "project",
        pricePerUnit: 3200.00,
        total: 3200.00,
        vatRate: 21
      },
      {
        id: uuidv4(),
        description: "Dakisolatie",
        quantity: 120,
        unit: "m²",
        pricePerUnit: 15.00,
        total: 1800.00,
        vatRate: 21
      },
      {
        id: uuidv4(),
        description: "Zonnepanelen installatie",
        quantity: 1,
        unit: "project",
        pricePerUnit: 1250.50,
        total: 1250.50,
        vatRate: 21
      }
    ]
  },
];

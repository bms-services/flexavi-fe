import { Quote } from "@/types";

export const mockQuotes: Quote[] = [
  {
    id: "quote-1",
    leadId: "1",
    amount: 3500.00,
    description: "Dakrenovatie en isolatie werkzaamheden",
    status: "sent",
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-04-02T14:30:00Z",
    location: "Amsterdam, Prinsengracht 123",
    plannedStartDate: "2025-05-15T08:00:00Z",
    notes: "Klant heeft aangegeven dat ze graag hoogwaardige isolatiematerialen willen gebruiken. Hebben budget voor extra werkzaamheden indien nodig.",
    lineItems: [
      {
        id: "item-1",
        description: "Verwijderen oude dakbedekking",
        quantity: 85,
        unit: "m²",
        pricePerUnit: 12.50,
        total: 1062.50
      },
      {
        id: "item-2",
        description: "Hoogwaardige isolatieplaten (RC-waarde 6.0)",
        quantity: 85,
        unit: "m²",
        pricePerUnit: 18.75,
        total: 1593.75
      },
      {
        id: "item-3",
        description: "Nieuwe EPDM dakbedekking leggen",
        quantity: 85,
        unit: "m²",
        pricePerUnit: 22.50,
        total: 1912.50
      },
      {
        id: "item-4",
        description: "Arbeid dakdekker",
        quantity: 24,
        unit: "uur",
        pricePerUnit: 65.00,
        total: 1560.00
      },
      {
        id: "item-5",
        description: "Afvoer oud materiaal",
        quantity: 1,
        unit: "complete service",
        pricePerUnit: 275.00,
        total: 275.00
      }
    ]
  },
  {
    id: "quote-2",
    leadId: "2",
    amount: 2800.50,
    description: "Installatie van zonnepanelen inclusief omvormer",
    status: "accepted",
    createdAt: "2025-04-03T09:15:00Z",
    updatedAt: "2025-04-04T11:20:00Z",
    location: "Rotterdam, Coolsingel 42",
    plannedStartDate: "2025-04-28T09:00:00Z",
    notes: "Klant wil 12 zonnepanelen op het zuidelijke dak. Opstelling is besproken tijdens het eerste bezoek.",
    lineItems: [
      {
        id: "item-6",
        description: "12 x Zonnepaneel Jinko Solar 415 Wp",
        quantity: 12,
        unit: "stuks",
        pricePerUnit: 250.00,
        total: 3000.00
      },
      {
        id: "item-7",
        description: "Omvormer Growatt 3000W",
        quantity: 1,
        unit: "stuk",
        pricePerUnit: 850.00,
        total: 850.00
      },
      {
        id: "item-8",
        description: "Montagemateriaal schuin dak",
        quantity: 1,
        unit: "set",
        pricePerUnit: 325.00,
        total: 325.00
      },
      {
        id: "item-9",
        description: "Bekabeling en aansluitmateriaal",
        quantity: 1,
        unit: "set",
        pricePerUnit: 150.00,
        total: 150.00
      },
      {
        id: "item-10",
        description: "Installatie en aansluiten",
        quantity: 8,
        unit: "uur",
        pricePerUnit: 65.00,
        total: 520.00
      }
    ]
  },
  {
    id: "quote-3",
    leadId: "3",
    amount: 1250.75,
    description: "Reparatie van daklekkage en vervanging dakpannen",
    status: "draft",
    createdAt: "2025-04-05T13:45:00Z",
    updatedAt: "2025-04-06T16:30:00Z",
    location: "Utrecht, Oudegracht 15",
    plannedStartDate: "2025-05-10T08:30:00Z",
    lineItems: [
      {
        id: "item-11",
        description: "Opsporen lekkage",
        quantity: 1,
        unit: "onderzoek",
        pricePerUnit: 125.00,
        total: 125.00
      },
      {
        id: "item-12",
        description: "Vervangen dakpannen",
        quantity: 25,
        unit: "stuks",
        pricePerUnit: 8.50,
        total: 212.50
      },
      {
        id: "item-13",
        description: "Reparatie tengels en panlatten",
        quantity: 3,
        unit: "meter",
        pricePerUnit: 35.00,
        total: 105.00
      },
      {
        id: "item-14",
        description: "Aanbrengen waterdichte folie",
        quantity: 5,
        unit: "m²",
        pricePerUnit: 15.00,
        total: 75.00
      },
      {
        id: "item-15",
        description: "Arbeid reparatie",
        quantity: 12,
        unit: "uur",
        pricePerUnit: 60.00,
        total: 720.00
      }
    ]
  },
  {
    id: "quote-4",
    leadId: "4",
    amount: 4750.25,
    description: "Volledige dakrenovatie inclusief materiaalkosten",
    status: "rejected",
    createdAt: "2025-04-07T08:30:00Z",
    updatedAt: "2025-04-08T10:15:00Z",
    location: "Den Haag, Binnenhof 3",
    notes: "Klant vond de prijs te hoog. Misschien later opnieuw contact opnemen met een aangepaste offerte.",
    lineItems: [
      {
        id: "item-16",
        description: "Verwijderen oude dakbedekking",
        quantity: 100,
        unit: "m²",
        pricePerUnit: 15.00,
        total: 1500.00
      },
      {
        id: "item-17",
        description: "Aanbrengen isolatiemateriaal",
        quantity: 100,
        unit: "m²",
        pricePerUnit: 20.50,
        total: 2050.00
      },
      {
        id: "item-18",
        description: "Nieuwe dakpannen leggen",
        quantity: 100,
        unit: "m²",
        pricePerUnit: 10.00,
        total: 1000.00
      },
      {
        id: "item-19",
        description: "Afvoeren oud materiaal",
        quantity: 1,
        unit: "klus",
        pricePerUnit: 200.00,
        total: 200.00
      }
    ]
  },
  {
    id: "quote-5",
    leadId: "5",
    amount: 1850.00,
    description: "Plaatsing van nieuwe dakgoten en regenpijpen",
    status: "revised",
    createdAt: "2025-04-09T14:00:00Z",
    updatedAt: "2025-04-10T09:45:00Z",
    location: "Groningen, Grote Markt 29",
    plannedStartDate: "2025-05-05T10:00:00Z",
    notes: "Herziene offerte met aangepaste prijzen voor hoogwaardige materialen op verzoek van de klant.",
    lineItems: [
      {
        id: "item-20",
        description: "Leveren en plaatsen dakgoten",
        quantity: 12,
        unit: "meter",
        pricePerUnit: 75.00,
        total: 900.00
      },
      {
        id: "item-21",
        description: "Leveren en plaatsen regenpijpen",
        quantity: 2,
        unit: "stuks",
        pricePerUnit: 250.00,
        total: 500.00
      },
      {
        id: "item-22",
        description: "Aansluitmateriaal en bevestiging",
        quantity: 1,
        unit: "set",
        pricePerUnit: 150.00,
        total: 150.00
      },
      {
        id: "item-23",
        description: "Arbeid installatie",
        quantity: 5,
        unit: "uur",
        pricePerUnit: 60.00,
        total: 300.00
      }
    ]
  },
  {
    id: "quote-6",
    leadId: "6",
    amount: 6250.50,
    description: "Totaalpakket: isolatie, zonnepanelen en dakrenovatie",
    status: "sent",
    createdAt: "2025-04-11T11:30:00Z",
    updatedAt: "2025-04-12T13:20:00Z",
    location: "Eindhoven, Stratumseind 8",
    plannedStartDate: "2025-06-01T08:00:00Z",
    notes: "Uitgebreid renovatieproject. Klant wil gefaseerde aanpak, eerst isolatie dan zonnepanelen. Totale doorlooptijd ongeveer 3 weken.",
    lineItems: [
      {
        id: "item-24",
        description: "Dakrenovatie (100 m²)",
        quantity: 1,
        unit: "project",
        pricePerUnit: 2500.00,
        total: 2500.00
      },
      {
        id: "item-25",
        description: "Isolatie (100 m²)",
        quantity: 1,
        unit: "project",
        pricePerUnit: 1750.50,
        total: 1750.50
      },
      {
        id: "item-26",
        description: "Zonnepanelen installatie (12 panelen)",
        quantity: 1,
        unit: "project",
        pricePerUnit: 2000.00,
        total: 2000.00
      }
    ]
  },
];

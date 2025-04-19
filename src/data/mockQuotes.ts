
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
    notes: "Klant heeft aangegeven dat ze graag hoogwaardige isolatiematerialen willen gebruiken. Hebben budget voor extra werkzaamheden indien nodig."
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
    notes: "Klant wil 12 zonnepanelen op het zuidelijke dak. Opstelling is besproken tijdens het eerste bezoek."
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
    plannedStartDate: "2025-05-10T08:30:00Z"
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
    notes: "Klant vond de prijs te hoog. Misschien later opnieuw contact opnemen met een aangepaste offerte."
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
    notes: "Herziene offerte met aangepaste prijzen voor hoogwaardige materialen op verzoek van de klant."
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
    notes: "Uitgebreid renovatieproject. Klant wil gefaseerde aanpak, eerst isolatie dan zonnepanelen. Totale doorlooptijd ongeveer 3 weken."
  },
];

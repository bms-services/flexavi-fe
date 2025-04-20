import { Lead } from "@/types";

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Jan de Vries",
    phone: "06-12345678",
    email: "jan@example.com",
    address: "Hoofdstraat 1, 3011 Rotterdam",
    status: "new_lead",
    source: "Website",
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-04-02T14:30:00Z",
  },
  {
    id: "2",
    name: "Marieke Jansen",
    phone: "06-87654321",
    email: "marieke@example.com",
    address: "Kerkstraat 23, 1012 Amsterdam",
    status: "appointment_scheduled",
    source: "Referral",
    createdAt: "2025-04-03T09:15:00Z",
    updatedAt: "2025-04-04T11:20:00Z",
  },
  {
    id: "3",
    name: "Pieter Bakker",
    phone: "06-11223344",
    email: "pieter@example.com",
    address: "Dorpstraat 5, 3572 Utrecht",
    status: "legal_case",
    source: "Google",
    createdAt: "2025-04-05T13:45:00Z",
    updatedAt: "2025-04-06T16:30:00Z",
  },
  {
    id: "4",
    name: "Sophie van Dijk",
    phone: "06-55667788",
    email: "sophie@example.com",
    address: "Nieuwe Gracht 12, 2011 Haarlem",
    status: "satisfied",
    source: "Facebook",
    createdAt: "2025-04-07T08:30:00Z",
    updatedAt: "2025-04-08T10:15:00Z",
  },
  {
    id: "5",
    name: "Thomas Visser",
    phone: "06-99887766",
    email: "thomas@example.com",
    address: "Marktplein 8, 4461 Eindhoven",
    status: "payment_pending",
    source: "Direct",
    createdAt: "2025-04-09T14:00:00Z",
    updatedAt: "2025-04-10T09:45:00Z",
  },
  {
    id: "6",
    name: "Femke Smit",
    phone: "06-44332211",
    email: "femke@example.com",
    address: "Lange Laan 19, 9712 Groningen",
    status: "in_collection",
    source: "Trade Show",
    createdAt: "2025-04-11T11:30:00Z",
    updatedAt: "2025-04-12T13:20:00Z",
  },
  {
    id: "7",
    name: "Bram van der Meer",
    phone: "06-22446688",
    email: "bram@example.com",
    address: "Buurtweg 3, 6534 Nijmegen",
    status: "warranty_visit",
    source: "Website",
    createdAt: "2025-04-13T15:45:00Z",
    updatedAt: "2025-04-14T12:30:00Z",
  },
  {
    id: "8",
    name: "Lotte Peters",
    phone: "06-77553311",
    email: "lotte@example.com",
    address: "Zonnestraat 7, 7311 Apeldoorn",
    status: "appointment_scheduled",
    source: "Referral",
    createdAt: "2025-04-15T09:00:00Z",
    updatedAt: "2025-04-16T14:15:00Z",
  }
];

export const getRecentLeads = () => {
  return [...mockLeads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
};

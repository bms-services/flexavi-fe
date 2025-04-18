
import { Lead, Appointment, Note, Quote, Invoice, LeadDetail } from "../types";
import { format, addDays, subDays } from "date-fns";

// Generate a UUID (simplified version)
const generateId = () => Math.random().toString(36).substring(2, 15);

// Generate dates relative to today
const today = new Date();
const formatDate = (date: Date) => format(date, "yyyy-MM-dd");
const formatDateTime = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss");

// Create mock leads
export const mockLeads: Lead[] = [
  {
    id: "lead-001",
    name: "Jan Jansen",
    phone: "06-12345678",
    email: "jan.jansen@email.nl",
    address: "Kerkstraat 10, Amsterdam",
    status: "new",
    source: "Website",
    createdAt: formatDateTime(subDays(today, 2)),
    updatedAt: formatDateTime(subDays(today, 2)),
  },
  {
    id: "lead-002",
    name: "Petra de Vries",
    phone: "06-87654321",
    email: "petra.devries@email.nl",
    address: "Hoofdweg 25, Rotterdam",
    status: "contacted",
    source: "Referral",
    createdAt: formatDateTime(subDays(today, 5)),
    updatedAt: formatDateTime(subDays(today, 3)),
  },
  {
    id: "lead-003",
    name: "Bart van den Berg",
    phone: "06-23456789",
    email: "bart.berg@email.nl",
    address: "Dorpsstraat 15, Utrecht",
    status: "qualified",
    source: "Google",
    createdAt: formatDateTime(subDays(today, 10)),
    updatedAt: formatDateTime(subDays(today, 7)),
  },
  {
    id: "lead-004",
    name: "Sophie Bakker",
    phone: "06-34567890",
    email: "sophie.bakker@email.nl",
    address: "Stationsweg 8, Groningen",
    status: "proposal",
    source: "Facebook",
    createdAt: formatDateTime(subDays(today, 15)),
    updatedAt: formatDateTime(subDays(today, 12)),
  },
  {
    id: "lead-005",
    name: "Tim Visser",
    phone: "06-45678901",
    email: "tim.visser@email.nl",
    address: "Marktplein 3, Eindhoven",
    status: "won",
    source: "Website",
    createdAt: formatDateTime(subDays(today, 30)),
    updatedAt: formatDateTime(subDays(today, 18)),
  },
];

// Create mock appointments
export const mockAppointments: Appointment[] = [
  {
    id: "app-001",
    leadId: "lead-001",
    title: "Initiële inspectie",
    description: "Eerste bezoek om dakschade te beoordelen",
    date: formatDate(today),
    startTime: "09:00",
    endTime: "10:30",
    status: "scheduled",
    createdAt: formatDateTime(subDays(today, 2)),
    updatedAt: formatDateTime(subDays(today, 2)),
  },
  {
    id: "app-002",
    leadId: "lead-002",
    title: "Opvolggesprek",
    description: "Bespreken van offerte en planning",
    date: formatDate(addDays(today, 1)),
    startTime: "13:00",
    endTime: "14:00",
    status: "scheduled",
    createdAt: formatDateTime(subDays(today, 3)),
    updatedAt: formatDateTime(subDays(today, 3)),
  },
  {
    id: "app-003",
    leadId: "lead-003",
    title: "Dakrenovatie planning",
    description: "Detailplanning voor renovatieproject",
    date: formatDate(addDays(today, 2)),
    startTime: "10:00",
    endTime: "11:30",
    status: "scheduled",
    createdAt: formatDateTime(subDays(today, 7)),
    updatedAt: formatDateTime(subDays(today, 7)),
  },
  {
    id: "app-004",
    leadId: "lead-004",
    title: "Materiaalbespreking",
    description: "Selectie van dakpannen en isolatiemateriaal",
    date: formatDate(addDays(today, 3)),
    startTime: "15:00",
    endTime: "16:00",
    status: "scheduled",
    createdAt: formatDateTime(subDays(today, 10)),
    updatedAt: formatDateTime(subDays(today, 10)),
  },
  {
    id: "app-005",
    leadId: "lead-005",
    title: "Eindcontrole",
    description: "Inspectie van afgerond dakwerk",
    date: formatDate(subDays(today, 2)),
    startTime: "11:00",
    endTime: "12:30",
    status: "completed",
    createdAt: formatDateTime(subDays(today, 20)),
    updatedAt: formatDateTime(subDays(today, 18)),
  },
];

// Create mock notes
export const mockNotes: Note[] = [
  {
    id: "note-001",
    leadId: "lead-001",
    content: "Klant heeft interesse in dakisolatie en nieuwe dakpannen. Heeft last van lekkage aan de noordzijde.",
    createdAt: formatDateTime(subDays(today, 2)),
    updatedAt: formatDateTime(subDays(today, 2)),
  },
  {
    id: "note-002",
    leadId: "lead-002",
    content: "Telefonisch contact gehad. Klant wil een offerte voor het vervangen van de dakgoot. Planning voor bezoek gemaakt.",
    createdAt: formatDateTime(subDays(today, 4)),
    updatedAt: formatDateTime(subDays(today, 4)),
  },
  {
    id: "note-003",
    leadId: "lead-002",
    content: "Bezoek afgelegd. Metingen gedaan voor nieuwe dakgoot. Klant overweegt ook zonnepanelen.",
    createdAt: formatDateTime(subDays(today, 3)),
    updatedAt: formatDateTime(subDays(today, 3)),
  },
  {
    id: "note-004",
    leadId: "lead-003",
    content: "Volledige dakrenovatie besproken. Klant heeft een budget van €15.000. Wil graag voor eind volgende maand werk uitgevoerd hebben.",
    createdAt: formatDateTime(subDays(today, 7)),
    updatedAt: formatDateTime(subDays(today, 7)),
  },
  {
    id: "note-005",
    leadId: "lead-004",
    content: "Offerte verstuurd voor dakisolatie en nieuwe dakbedekking. Klant wil ook informatie over garanties.",
    createdAt: formatDateTime(subDays(today, 12)),
    updatedAt: formatDateTime(subDays(today, 12)),
  },
];

// Create mock quotes
export const mockQuotes: Quote[] = [
  {
    id: "quote-001",
    leadId: "lead-002",
    amount: 2500,
    description: "Vervanging van dakgoot, inclusief materiaal en arbeid",
    status: "sent",
    createdAt: formatDateTime(subDays(today, 3)),
    updatedAt: formatDateTime(subDays(today, 3)),
  },
  {
    id: "quote-002",
    leadId: "lead-003",
    amount: 15000,
    description: "Volledige dakrenovatie met nieuwe isolatie en dakpannen",
    status: "accepted",
    createdAt: formatDateTime(subDays(today, 7)),
    updatedAt: formatDateTime(subDays(today, 5)),
  },
  {
    id: "quote-003",
    leadId: "lead-004",
    amount: 8500,
    description: "Dakisolatie en nieuwe dakbedekking voor plat dak",
    status: "sent",
    createdAt: formatDateTime(subDays(today, 12)),
    updatedAt: formatDateTime(subDays(today, 12)),
  },
  {
    id: "quote-004",
    leadId: "lead-005",
    amount: 12000,
    description: "Dakrenovatie en plaatsen van dakkapel",
    status: "accepted",
    createdAt: formatDateTime(subDays(today, 25)),
    updatedAt: formatDateTime(subDays(today, 22)),
  },
];

// Create mock invoices
export const mockInvoices: Invoice[] = [
  {
    id: "inv-001",
    leadId: "lead-003",
    quoteId: "quote-002",
    amount: 15000,
    description: "Factuur voor dakrenovatie",
    status: "sent",
    dueDate: formatDate(addDays(today, 14)),
    createdAt: formatDateTime(subDays(today, 5)),
    updatedAt: formatDateTime(subDays(today, 5)),
  },
  {
    id: "inv-002",
    leadId: "lead-005",
    quoteId: "quote-004",
    amount: 12000,
    description: "Factuur voor dakrenovatie en dakkapel",
    status: "paid",
    dueDate: formatDate(subDays(today, 7)),
    createdAt: formatDateTime(subDays(today, 20)),
    updatedAt: formatDateTime(subDays(today, 15)),
  },
];

// Function to get lead details including related data
export const getLeadDetail = (leadId: string): LeadDetail | undefined => {
  const lead = mockLeads.find((l) => l.id === leadId);
  if (!lead) return undefined;

  return {
    ...lead,
    notes: mockNotes.filter((n) => n.leadId === leadId),
    appointments: mockAppointments.filter((a) => a.leadId === leadId),
    quotes: mockQuotes.filter((q) => q.leadId === leadId),
    invoices: mockInvoices.filter((i) => i.leadId === leadId),
  };
};

// Function to get appointments for a specific date
export const getAppointmentsByDate = (date: string): Appointment[] => {
  return mockAppointments.filter((a) => a.date === date);
};

// Function to get lead status count
export const getLeadStatusCount = () => {
  const counts = {
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal: 0,
    negotiation: 0,
    won: 0,
    lost: 0,
  };

  mockLeads.forEach((lead) => {
    counts[lead.status]++;
  });

  return counts;
};

// Function to get upcoming appointments (next 7 days)
export const getUpcomingAppointments = (): Appointment[] => {
  const nextWeek = addDays(today, 7);
  return mockAppointments
    .filter((a) => {
      const appDate = new Date(a.date);
      return appDate >= today && appDate <= nextWeek && a.status !== "canceled";
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Function to get recently added leads (last 7 days)
export const getRecentLeads = (): Lead[] => {
  const lastWeek = subDays(today, 7);
  return mockLeads
    .filter((l) => {
      const createdDate = new Date(l.createdAt);
      return createdDate >= lastWeek;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

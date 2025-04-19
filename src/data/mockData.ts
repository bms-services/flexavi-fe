
import { Lead, Appointment, AppointmentStatus, TeamType, Quote, Invoice } from "@/types";

// Mock leads data
export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Jan de Vries",
    phone: "06-12345678",
    email: "jan@example.com",
    address: "Hoofdstraat 1, 3011 Rotterdam",
    status: "qualified",
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
    status: "proposal",
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
    status: "negotiation",
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
    status: "won",
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
    status: "new",
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
    status: "contacted",
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
    status: "lost",
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
    status: "proposal",
    source: "Referral",
    createdAt: "2025-04-15T09:00:00Z",
    updatedAt: "2025-04-16T14:15:00Z",
  }
];

// Helper function to create appointment status
const getRandomStatus = (): AppointmentStatus => {
  const statuses: AppointmentStatus[] = [
    "scheduled", "completed", "quote_request", "warranty", 
    "new_assignment", "extra_assignment"
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to create team type
const getRandomTeamType = (): TeamType => {
  const types: TeamType[] = ["sales", "installation"];
  return types[Math.floor(Math.random() * types.length)];
};

// Generate appointments for the next two weeks
const generateAppointments = () => {
  const appointments: Appointment[] = [];
  const today = new Date();
  
  // Create 30 appointments spanning across 14 days
  for (let i = 0; i < 40; i++) {
    // Randomly distribute appointments across 14 days
    const dayOffset = Math.floor(Math.random() * 14);
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + dayOffset);
    
    const date = appointmentDate.toISOString().split('T')[0];
    
    // Generate random time slots
    const hours = [9, 10, 11, 13, 14, 15, 16, 17];
    const startHour = hours[Math.floor(Math.random() * hours.length)];
    const startTime = `${startHour}:00`;
    const endTime = `${startHour + 1}:30`;
    
    // Assign to random team (or leave unassigned)
    const teamAssignment = Math.random();
    let teamId = "";
    if (teamAssignment > 0.3) {
      // 70% chance of being assigned to a team
      teamId = Math.random() > 0.5 ? "1" : "2";  // 50% team 1, 50% team 2
      if (i % 3 === 0) {
        teamId = Math.random() > 0.5 ? "3" : "4"; // Some to installation teams
      }
    }
    
    // Random lead
    const leadId = mockLeads[Math.floor(Math.random() * mockLeads.length)].id;
    const leadInfo = mockLeads.find(lead => lead.id === leadId);
    
    const teamType = getRandomTeamType();
    const status = getRandomStatus();
    
    const appointment: Appointment = {
      id: `app-${i + 1}`,
      leadId,
      title: teamType === "sales" ? "Verkoopgesprek" : "Dak installatie",
      description: status === "warranty" 
        ? "Garantie inspectie na eerdere installatie" 
        : "Bespreking van mogelijkheden en prijsopgave",
      date,
      startTime,
      endTime,
      status,
      teamId,
      teamType,
      location: leadInfo?.address || "Onbekend adres",
      createdAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 10).toISOString(),
      updatedAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 5).toISOString()
    };
    
    appointments.push(appointment);
  }
  
  // Add specific appointments for today and tomorrow to ensure some data is visible
  const todayString = today.toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];
  
  // Unassigned appointments for today
  for (let i = 0; i < 5; i++) {
    appointments.push({
      id: `today-unassigned-${i}`,
      leadId: mockLeads[i % mockLeads.length].id,
      title: "Nieuwe offerte aanvraag",
      description: "Klant heeft interesse in zonnepanelen installatie op hun dak",
      date: todayString,
      startTime: `${10 + i}:00`,
      endTime: `${11 + i}:00`,
      status: "quote_request",
      teamId: "",
      teamType: "sales",
      location: mockLeads[i % mockLeads.length].address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  // Assigned appointments for tomorrow
  for (let i = 0; i < 3; i++) {
    appointments.push({
      id: `tomorrow-assigned-${i}`,
      leadId: mockLeads[(i + 3) % mockLeads.length].id,
      title: "Geplande installatie",
      description: "Installatie van dakisolatie en nieuwe dakbedekking",
      date: tomorrowString,
      startTime: `${9 + i * 2}:00`,
      endTime: `${11 + i * 2}:00`,
      status: "scheduled",
      teamId: `${i + 1}`,
      teamType: "installation",
      location: mockLeads[(i + 3) % mockLeads.length].address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return appointments;
};

// Export the appointments data
export const mockAppointments: Appointment[] = generateAppointments();

// Generate mock quotes data
export const mockQuotes: Quote[] = [
  {
    id: "quote-1",
    leadId: "1",
    amount: 3500.00,
    description: "Dakrenovatie en isolatie werkzaamheden",
    status: "sent",
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-04-02T14:30:00Z",
  },
  {
    id: "quote-2",
    leadId: "2",
    amount: 2800.50,
    description: "Installatie van zonnepanelen inclusief omvormer",
    status: "accepted",
    createdAt: "2025-04-03T09:15:00Z",
    updatedAt: "2025-04-04T11:20:00Z",
  },
  {
    id: "quote-3",
    leadId: "3",
    amount: 1250.75,
    description: "Reparatie van daklekkage en vervanging dakpannen",
    status: "draft",
    createdAt: "2025-04-05T13:45:00Z",
    updatedAt: "2025-04-06T16:30:00Z",
  },
  {
    id: "quote-4",
    leadId: "4",
    amount: 4750.25,
    description: "Volledige dakrenovatie inclusief materiaalkosten",
    status: "rejected",
    createdAt: "2025-04-07T08:30:00Z",
    updatedAt: "2025-04-08T10:15:00Z",
  },
  {
    id: "quote-5",
    leadId: "5",
    amount: 1850.00,
    description: "Plaatsing van nieuwe dakgoten en regenpijpen",
    status: "revised",
    createdAt: "2025-04-09T14:00:00Z",
    updatedAt: "2025-04-10T09:45:00Z",
  },
  {
    id: "quote-6",
    leadId: "6",
    amount: 6250.50,
    description: "Totaalpakket: isolatie, zonnepanelen en dakrenovatie",
    status: "sent",
    createdAt: "2025-04-11T11:30:00Z",
    updatedAt: "2025-04-12T13:20:00Z",
  },
];

// Generate mock invoices data
export const mockInvoices: Invoice[] = [
  {
    id: "inv-1",
    leadId: "1",
    quoteId: "quote-1",
    amount: 3500.00,
    status: "sent",
    createdAt: "2025-04-05T10:00:00Z",
    dueDate: "2025-05-05T00:00:00Z",
    updatedAt: "2025-04-05T14:30:00Z",
  },
  {
    id: "inv-2",
    leadId: "2",
    quoteId: "quote-2",
    amount: 2800.50,
    status: "paid",
    createdAt: "2025-04-10T09:15:00Z",
    dueDate: "2025-05-10T00:00:00Z",
    updatedAt: "2025-04-15T11:20:00Z",
    paidAt: "2025-04-15T11:20:00Z",
  },
  {
    id: "inv-3",
    leadId: "4",
    quoteId: "quote-4",
    amount: 4750.25,
    status: "overdue",
    createdAt: "2025-03-15T13:45:00Z",
    dueDate: "2025-04-15T00:00:00Z",
    updatedAt: "2025-03-20T16:30:00Z",
  },
  {
    id: "inv-4",
    leadId: "5",
    quoteId: "quote-5",
    amount: 1850.00,
    status: "sent",
    createdAt: "2025-04-12T08:30:00Z",
    dueDate: "2025-05-12T00:00:00Z",
    updatedAt: "2025-04-12T10:15:00Z",
  },
  {
    id: "inv-5",
    leadId: "6",
    quoteId: "quote-6",
    amount: 6250.50,
    status: "draft",
    createdAt: "2025-04-15T14:00:00Z",
    dueDate: "2025-05-15T00:00:00Z",
    updatedAt: "2025-04-15T09:45:00Z",
  },
];

// Helper functions for Dashboard
export const getUpcomingAppointments = () => {
  const today = new Date();
  const next7Days = new Date();
  next7Days.setDate(today.getDate() + 7);
  
  return mockAppointments
    .filter(appointment => {
      const appDate = new Date(appointment.date);
      return appDate >= today && appDate <= next7Days;
    })
    .slice(0, 5);
};

export const getRecentLeads = () => {
  return [...mockLeads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
};

// Helper function for Lead Details
export const getLeadDetail = (id: string) => {
  const lead = mockLeads.find(lead => lead.id === id);
  
  if (!lead) return undefined;
  
  const leadAppointments = mockAppointments.filter(app => app.leadId === id);
  const leadQuotes = mockQuotes.filter(quote => quote.leadId === id);
  const leadInvoices = mockInvoices.filter(invoice => invoice.leadId === id);
  
  return {
    ...lead,
    appointments: leadAppointments,
    quotes: leadQuotes,
    invoices: leadInvoices,
  };
};

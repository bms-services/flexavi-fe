
import { SupportTicket, SupportTicketMessage } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Helper function to create dates in the past
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// Helper function to create dates in the future
const daysAhead = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// Sample staff members
const staff = [
  {
    id: "staff-1",
    name: "Jessica van der Berg",
    email: "jessica@solarinstall.nl",
    avatar: "/avatars/jessica.jpg",
    role: "staff"
  },
  {
    id: "staff-2",
    name: "Martijn de Vries",
    email: "martijn@solarinstall.nl",
    avatar: "/avatars/martijn.jpg",
    role: "staff"
  },
  {
    id: "admin-1",
    name: "Sander Janssen",
    email: "sander@solarinstall.nl",
    avatar: "/avatars/sander.jpg",
    role: "admin"
  }
];

// Sample customers
const customers = [
  {
    id: "customer-1",
    name: "Pieter Bakker",
    email: "pieter.bakker@example.com",
    avatar: "/avatars/customer1.jpg",
    role: "customer"
  },
  {
    id: "customer-2",
    name: "Anna de Jong",
    email: "anna.dejong@example.com",
    avatar: "/avatars/customer2.jpg",
    role: "customer"
  },
  {
    id: "customer-3",
    name: "Willem van Dijk",
    email: "willem.vandijk@example.com",
    avatar: "/avatars/customer3.jpg",
    role: "customer"
  },
  {
    id: "customer-4",
    name: "Eva Smit",
    email: "eva.smit@example.com",
    avatar: "/avatars/customer4.jpg",
    role: "customer"
  },
  {
    id: "customer-5",
    name: "Jeroen Visser",
    email: "jeroen.visser@example.com",
    avatar: "/avatars/customer5.jpg",
    role: "customer"
  }
];

// Create mock support ticket messages
const createMessages = (
  ticketId: string, 
  count: number, 
  status: string, 
  createdAt: string
): SupportTicketMessage[] => {
  const messages: SupportTicketMessage[] = [];
  
  // Initial customer message
  messages.push({
    id: uuidv4(),
    ticketId,
    content: "Ik heb een vraag over mijn recente installatie. Kunnen jullie me helpen?",
    createdAt,
    createdBy: { ...customers[Math.floor(Math.random() * customers.length)], role: "customer" }
  });
  
  // Add varying numbers of replies based on status
  if (status !== "open") {
    // Staff response
    messages.push({
      id: uuidv4(),
      ticketId,
      content: "Dank voor uw bericht. Wat is uw vraag precies? Kunt u meer details geven?",
      createdAt: new Date(new Date(createdAt).getTime() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours later
      createdBy: { ...staff[Math.floor(Math.random() * staff.length)], role: "staff" }
    });
    
    // If there's a back-and-forth
    if (count > 2 && status !== "waiting-for-customer") {
      // Customer reply
      messages.push({
        id: uuidv4(),
        ticketId,
        content: "De zonnepanelen lijken niet volledig te werken. Ik zie in de app dat de opbrengst lager is dan verwacht.",
        createdAt: new Date(new Date(createdAt).getTime() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours later
        createdBy: messages[0].createdBy
      });
      
      // Final staff reply if resolved or in progress
      if (status === "resolved" || status === "in-progress" || status === "waiting-for-staff") {
        messages.push({
          id: uuidv4(),
          ticketId,
          content: "Bedankt voor de extra informatie. We zullen dit onderzoeken en komen zo snel mogelijk bij u terug.",
          createdAt: new Date(new Date(createdAt).getTime() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours later
          createdBy: { ...staff[Math.floor(Math.random() * staff.length)], role: "staff" }
        });
        
        // Internal note
        messages.push({
          id: uuidv4(),
          ticketId,
          content: "Interne notitie: Controleer de installatie en plan zo nodig een bezoek in.",
          createdAt: new Date(new Date(createdAt).getTime() + 12.5 * 60 * 60 * 1000).toISOString(), // 12.5 hours later
          createdBy: { ...staff[Math.floor(Math.random() * staff.length)], role: "staff" },
          isInternal: true
        });
      }
      
      // If resolved, add resolution message
      if (status === "resolved") {
        messages.push({
          id: uuidv4(),
          ticketId,
          content: "We hebben het probleem opgelost. Er was een configuratiefout in de omvormer. Dit hebben we op afstand kunnen herstellen. Controleert u of de opbrengst nu weer normaal is?",
          createdAt: new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours later
          createdBy: { ...staff[Math.floor(Math.random() * staff.length)], role: "staff" }
        });
        
        // Customer acknowledgment
        messages.push({
          id: uuidv4(),
          ticketId,
          content: "Ja, alles werkt nu prima! Bedankt voor de snelle service.",
          createdAt: new Date(new Date(createdAt).getTime() + 30 * 60 * 60 * 1000).toISOString(), // 30 hours later
          createdBy: messages[0].createdBy
        });
      }
    }
  }
  
  return messages;
};

// Create mock support tickets with varying statuses, priorities, and categories
export const mockSupportTickets: SupportTicket[] = [
  // Open tickets
  {
    id: "ticket-001",
    title: "Vraag over zonnepaneel installatie",
    customerId: customers[0].id,
    customerName: customers[0].name,
    customerEmail: customers[0].email,
    status: "open",
    priority: "medium",
    category: "technical",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
    messages: createMessages("ticket-001", 1, "open", daysAgo(2)),
    tags: ["installatie", "nieuw"]
  },
  {
    id: "ticket-002",
    title: "Facturatie probleem",
    customerId: customers[1].id,
    customerName: customers[1].name,
    customerEmail: customers[1].email,
    status: "open",
    priority: "high",
    category: "billing",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    messages: createMessages("ticket-002", 1, "open", daysAgo(1)),
    tags: ["facturatie", "urgent"]
  },
  
  // In-progress tickets
  {
    id: "ticket-003",
    title: "App toont verkeerde gegevens",
    customerId: customers[2].id,
    customerName: customers[2].name,
    customerEmail: customers[2].email,
    status: "in-progress",
    priority: "medium",
    category: "technical",
    assignedTo: {
      id: staff[0].id,
      name: staff[0].name,
      avatar: staff[0].avatar
    },
    createdAt: daysAgo(5),
    updatedAt: daysAgo(3),
    lastReplyAt: daysAgo(3),
    lastReplyBy: staff[0].id,
    messages: createMessages("ticket-003", 3, "in-progress", daysAgo(5)),
    tags: ["app", "bug"]
  },
  
  // Waiting for customer
  {
    id: "ticket-004",
    title: "Verzoek om meer informatie over garantie",
    customerId: customers[3].id,
    customerName: customers[3].name,
    customerEmail: customers[3].email,
    status: "waiting-for-customer",
    priority: "low",
    category: "general",
    assignedTo: {
      id: staff[1].id,
      name: staff[1].name,
      avatar: staff[1].avatar
    },
    createdAt: daysAgo(7),
    updatedAt: daysAgo(4),
    lastReplyAt: daysAgo(4),
    lastReplyBy: staff[1].id,
    messages: createMessages("ticket-004", 2, "waiting-for-customer", daysAgo(7)),
    tags: ["garantie", "info"]
  },
  
  // Resolved tickets
  {
    id: "ticket-005",
    title: "Zonnepanelen werken niet optimaal",
    customerId: customers[4].id,
    customerName: customers[4].name,
    customerEmail: customers[4].email,
    status: "resolved",
    priority: "high",
    category: "technical",
    assignedTo: {
      id: staff[0].id,
      name: staff[0].name,
      avatar: staff[0].avatar
    },
    createdAt: daysAgo(14),
    updatedAt: daysAgo(10),
    lastReplyAt: daysAgo(10),
    lastReplyBy: customers[4].id,
    messages: createMessages("ticket-005", 5, "resolved", daysAgo(14)),
    tags: ["opgelost", "technisch"]
  },
  
  // Waiting for staff
  {
    id: "ticket-006",
    title: "Verzoek om speciale offerte",
    customerId: customers[0].id,
    customerName: customers[0].name,
    customerEmail: customers[0].email,
    status: "waiting-for-staff",
    priority: "medium",
    category: "feature-request",
    assignedTo: {
      id: staff[2].id,
      name: staff[2].name,
      avatar: staff[2].avatar
    },
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
    lastReplyAt: daysAgo(1),
    lastReplyBy: customers[0].id,
    messages: createMessages("ticket-006", 3, "waiting-for-staff", daysAgo(3)),
    tags: ["offerte", "wachten"]
  },
  
  // Closed tickets
  {
    id: "ticket-007",
    title: "Account toegang problemen",
    customerId: customers[1].id,
    customerName: customers[1].name,
    customerEmail: customers[1].email,
    status: "closed",
    priority: "medium",
    category: "account",
    createdAt: daysAgo(21),
    updatedAt: daysAgo(18),
    messages: createMessages("ticket-007", 4, "resolved", daysAgo(21)),
    tags: ["account", "gesloten"]
  }
];

// Function to get messages for a specific ticket
export const getTicketMessages = (ticketId: string): SupportTicketMessage[] => {
  const ticket = mockSupportTickets.find(t => t.id === ticketId);
  return ticket ? ticket.messages : [];
};

// Create a mock function to add a new support ticket
export const createMockTicket = (ticketData: Partial<SupportTicket>): SupportTicket => {
  const newTicket: SupportTicket = {
    id: `ticket-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    title: ticketData.title || "Nieuwe support aanvraag",
    customerId: ticketData.customerId || customers[0].id,
    customerName: ticketData.customerName || customers[0].name,
    customerEmail: ticketData.customerEmail || customers[0].email,
    status: ticketData.status || "open",
    priority: ticketData.priority || "medium",
    category: ticketData.category || "general",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [],
    tags: ticketData.tags || [],
    ...ticketData
  };
  
  // Add initial message if provided
  if (ticketData.messages && ticketData.messages.length > 0) {
    newTicket.messages = ticketData.messages;
  }
  
  return newTicket;
};

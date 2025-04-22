
import { SupportTicket } from "@/types/support";
import { v4 as uuidv4 } from 'uuid';

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "ticket-1",
    title: "Cannot access invoice dashboard",
    customerId: "customer-1",
    customerName: "Janssen B.V.",
    customerEmail: "contact@janssen.nl",
    status: "open",
    priority: "high",
    category: "technical",
    createdAt: "2023-11-05T10:30:00.000Z",
    updatedAt: "2023-11-05T10:30:00.000Z",
    lastReplyAt: "2023-11-05T10:30:00.000Z",
    lastReplyBy: "customer-1",
    messages: [
      {
        id: "message-1",
        ticketId: "ticket-1",
        content: "Ik probeer mijn facturen dashboard te bekijken, maar ik krijg steeds een foutmelding. Kunnen jullie dit controleren?",
        createdAt: "2023-11-05T10:30:00.000Z",
        createdBy: {
          id: "customer-1",
          name: "Janssen B.V.",
          email: "contact@janssen.nl",
          role: "customer"
        }
      }
    ]
  },
  {
    id: "ticket-2",
    title: "Issue with payment processing",
    customerId: "customer-2",
    customerName: "De Boer Installaties",
    customerEmail: "info@deboer.nl",
    status: "in-progress",
    priority: "urgent",
    category: "billing",
    assignedTo: {
      id: "staff-1",
      name: "Henk Visser",
    },
    createdAt: "2023-11-01T14:20:00.000Z",
    updatedAt: "2023-11-02T09:15:00.000Z",
    lastReplyAt: "2023-11-02T09:15:00.000Z",
    lastReplyBy: "staff-1",
    messages: [
      {
        id: "message-2-1",
        ticketId: "ticket-2",
        content: "Ik heb geprobeerd te betalen voor mijn maandelijkse abonnement, maar de betaling wordt telkens geweigerd.",
        createdAt: "2023-11-01T14:20:00.000Z",
        createdBy: {
          id: "customer-2",
          name: "De Boer Installaties",
          email: "info@deboer.nl",
          role: "customer"
        }
      },
      {
        id: "message-2-2",
        ticketId: "ticket-2",
        content: "Dank voor uw bericht. Ik zie dat er inderdaad een probleem is met de betalingsverwerking. We zijn dit aan het onderzoeken en komen zo snel mogelijk bij u terug.",
        createdAt: "2023-11-02T09:15:00.000Z",
        createdBy: {
          id: "staff-1",
          name: "Henk Visser",
          email: "henk@yoursaas.nl",
          role: "staff"
        }
      }
    ]
  },
  {
    id: "ticket-3",
    title: "Feature request: Dark mode",
    customerId: "customer-3",
    customerName: "Van Dijk Groep",
    customerEmail: "service@vandijk.nl",
    status: "waiting-for-staff",
    priority: "low",
    category: "feature-request",
    createdAt: "2023-10-25T11:45:00.000Z",
    updatedAt: "2023-10-28T16:20:00.000Z",
    lastReplyAt: "2023-10-28T16:20:00.000Z",
    lastReplyBy: "customer-3",
    messages: [
      {
        id: "message-3-1",
        ticketId: "ticket-3",
        content: "Zou het mogelijk zijn om een dark mode toe te voegen aan het platform? Dit zou erg fijn zijn voor nachtelijk gebruik.",
        createdAt: "2023-10-25T11:45:00.000Z",
        createdBy: {
          id: "customer-3",
          name: "Van Dijk Groep",
          email: "service@vandijk.nl",
          role: "customer"
        }
      },
      {
        id: "message-3-2",
        ticketId: "ticket-3",
        content: "Hartelijk dank voor uw suggestie. We hebben uw verzoek doorgestuurd naar ons product team.",
        createdAt: "2023-10-26T09:30:00.000Z",
        createdBy: {
          id: "staff-2",
          name: "Lisa De Jong",
          email: "lisa@yoursaas.nl",
          role: "staff"
        }
      },
      {
        id: "message-3-3",
        ticketId: "ticket-3",
        content: "Geweldig, bedankt voor het doorgeven! Ik kijk ernaar uit.",
        createdAt: "2023-10-28T16:20:00.000Z",
        createdBy: {
          id: "customer-3",
          name: "Van Dijk Groep",
          email: "service@vandijk.nl",
          role: "customer"
        }
      }
    ]
  },
  {
    id: "ticket-4",
    title: "Login problems after password reset",
    customerId: "customer-4",
    customerName: "Bakker Techniek",
    customerEmail: "support@bakker.nl",
    status: "resolved",
    priority: "medium",
    category: "account",
    assignedTo: {
      id: "staff-3",
      name: "Martijn Jansen",
    },
    createdAt: "2023-11-03T08:10:00.000Z",
    updatedAt: "2023-11-03T15:45:00.000Z",
    lastReplyAt: "2023-11-03T15:45:00.000Z",
    lastReplyBy: "staff-3",
    messages: [
      {
        id: "message-4-1",
        ticketId: "ticket-4",
        content: "Na het resetten van mijn wachtwoord kan ik niet meer inloggen. Ik krijg steeds een foutmelding.",
        createdAt: "2023-11-03T08:10:00.000Z",
        createdBy: {
          id: "customer-4",
          name: "Bakker Techniek",
          email: "support@bakker.nl",
          role: "customer"
        }
      },
      {
        id: "message-4-2",
        ticketId: "ticket-4",
        content: "Ik heb uw account gecontroleerd en het probleem gevonden. Ik heb een nieuwe reset link naar uw e-mail gestuurd, kunt u die proberen te gebruiken?",
        createdAt: "2023-11-03T10:20:00.000Z",
        createdBy: {
          id: "staff-3",
          name: "Martijn Jansen",
          email: "martijn@yoursaas.nl",
          role: "staff"
        }
      },
      {
        id: "message-4-3",
        ticketId: "ticket-4",
        content: "Bedankt, de nieuwe link werkt perfect. Ik kan nu weer inloggen.",
        createdAt: "2023-11-03T13:30:00.000Z",
        createdBy: {
          id: "customer-4",
          name: "Bakker Techniek",
          email: "support@bakker.nl",
          role: "customer"
        }
      },
      {
        id: "message-4-4",
        ticketId: "ticket-4",
        content: "Perfect! Ik markeer deze ticket als opgelost. Als u nog vragen heeft, laat het me weten.",
        createdAt: "2023-11-03T15:45:00.000Z",
        createdBy: {
          id: "staff-3",
          name: "Martijn Jansen",
          email: "martijn@yoursaas.nl",
          role: "staff"
        }
      }
    ]
  },
  {
    id: "ticket-5",
    title: "How to export data to Excel?",
    customerId: "customer-5",
    customerName: "Smit & Zonen",
    customerEmail: "info@smit.nl",
    status: "closed",
    priority: "low",
    category: "general",
    createdAt: "2023-10-15T13:20:00.000Z",
    updatedAt: "2023-10-16T11:10:00.000Z",
    lastReplyAt: "2023-10-16T11:10:00.000Z",
    lastReplyBy: "customer-5",
    messages: [
      {
        id: "message-5-1",
        ticketId: "ticket-5",
        content: "Ik wil graag mijn data exporteren naar Excel, maar ik kan de optie niet vinden. Waar kan ik dit doen?",
        createdAt: "2023-10-15T13:20:00.000Z",
        createdBy: {
          id: "customer-5",
          name: "Smit & Zonen",
          email: "info@smit.nl",
          role: "customer"
        }
      },
      {
        id: "message-5-2",
        ticketId: "ticket-5",
        content: "Op het dashboard kunt u rechtsboven op het 'Export' icoon klikken, selecteer daarna Excel als formaat. Als u specifieke rapporten wilt exporteren, kunt u dat doen vanuit het rapport scherm met dezelfde export knop.",
        createdAt: "2023-10-16T09:15:00.000Z",
        createdBy: {
          id: "staff-4",
          name: "Emma de Vries",
          email: "emma@yoursaas.nl",
          role: "staff"
        }
      },
      {
        id: "message-5-3",
        ticketId: "ticket-5",
        content: "Gevonden, dank u wel voor de snelle hulp!",
        createdAt: "2023-10-16T11:10:00.000Z",
        createdBy: {
          id: "customer-5",
          name: "Smit & Zonen",
          email: "info@smit.nl",
          role: "customer"
        }
      }
    ]
  }
];

export const createNewTicket = (ticketData: Partial<SupportTicket>): SupportTicket => {
  const newId = uuidv4();
  const now = new Date().toISOString();
  
  const newTicket: SupportTicket = {
    id: newId,
    title: ticketData.title || "New Support Ticket",
    customerId: ticketData.customerId || "unknown-customer",
    customerName: ticketData.customerName || "Unknown Customer",
    customerEmail: ticketData.customerEmail || "unknown@example.com",
    status: ticketData.status || "open",
    priority: ticketData.priority || "medium",
    category: ticketData.category || "general",
    createdAt: now,
    updatedAt: now,
    messages: ticketData.messages || [],
    tags: ticketData.tags || [],
  };
  
  return newTicket;
};

export const addMessageToTicket = (
  ticketId: string, 
  content: string, 
  userId: string, 
  userName: string,
  userEmail: string,
  userRole: 'customer' | 'staff' | 'admin',
  isInternal = false
): SupportTicketMessage => {
  const newMessage: SupportTicketMessage = {
    id: uuidv4(),
    ticketId: ticketId,
    content: content,
    createdAt: new Date().toISOString(),
    createdBy: {
      id: userId,
      name: userName,
      email: userEmail,
      role: userRole
    },
    isInternal: isInternal
  };
  
  return newMessage;
};

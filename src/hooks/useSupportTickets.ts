
import { useState, useEffect } from "react";
import { SupportTicket, SupportTicketMessage } from "@/types";
import { mockSupportTickets, createMockTicket } from "@/data/mockSupportTickets";
import { toast } from "sonner";

export const useSupportTickets = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        await new Promise(r => setTimeout(r, 800));
        setTickets(mockSupportTickets);
      } catch (error) {
        console.error("Error fetching support tickets:", error);
        toast.error("Fout bij ophalen van support tickets");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, []);

  const getTicket = (id: string): SupportTicket | undefined => {
    return tickets.find(ticket => ticket.id === id);
  };

  const addTicket = (newTicket: Partial<SupportTicket>): SupportTicket => {
    const ticket = createMockTicket(newTicket);
    setTickets(prev => [...prev, ticket]);
    toast.success("Support ticket aangemaakt");
    return ticket;
  };

  // Alias for addTicket to match naming convention in CreateTicketDialog
  const createTicket = addTicket;

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
    toast.success("Support ticket verwijderd");
  };

  const addMessage = (ticketId: string, message: Omit<SupportTicketMessage, "id" | "ticketId">) => {
    const newMessage: SupportTicketMessage = {
      id: `msg-${Date.now()}`,
      ticketId,
      ...message,
    };

    setTickets(prev => 
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            lastReplyAt: message.createdAt,
            lastReplyBy: message.createdBy.id,
            updatedAt: new Date().toISOString(),
            status: message.createdBy.role === "customer" 
              ? "waiting-for-staff" 
              : "waiting-for-customer"
          };
        }
        return ticket;
      })
    );

    return newMessage;
  };

  return {
    tickets,
    loading,
    getTicket,
    addTicket,
    createTicket,
    deleteTicket,
    addMessage
  };
};

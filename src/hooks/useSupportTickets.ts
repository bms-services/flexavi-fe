
import { useState, useEffect } from "react";
import { SupportTicket, SupportTicketMessage } from "@/types";
import { mockSupportTickets, createMockTicket } from "@/data/mockSupportTickets";
import { toast } from "sonner";

export const useSupportTickets = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading from an API
    const fetchTickets = async () => {
      setLoading(true);
      try {
        // Simulate network delay
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

  const updateTicket = (id: string, updates: Partial<SupportTicket>) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === id 
          ? { ...ticket, ...updates, updatedAt: new Date().toISOString() } 
          : ticket
      )
    );
    toast.success("Support ticket bijgewerkt");
  };

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
            // Update status based on who is replying
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
    updateTicket,
    deleteTicket,
    addMessage
  };
};

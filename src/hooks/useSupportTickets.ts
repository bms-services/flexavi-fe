
import { useState, useEffect } from "react";
import { SupportTicket, SupportTicketMessage } from "@/types";
import { mockSupportTickets, createMockTicket } from "@/data/mockSupportTickets";


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
    
    return ticket;
  };

  // Alias for addTicket to match naming convention in CreateTicketDialog
  const createTicket = addTicket;

  const updateTicket = (id: string, updates: Partial<SupportTicket>) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === id 
          ? { ...ticket, ...updates, updatedAt: new Date().toISOString() } 
          : ticket
      )
    );
    
  };

  // Helper functions for specific updates
  const updateTicketStatus = (id: string, status: SupportTicket['status']) => {
    updateTicket(id, { status });
  };

  const updateTicketPriority = (id: string, priority: SupportTicket['priority']) => {
    updateTicket(id, { priority });
  };

  const assignTicket = (id: string, staffId: string, staffName: string) => {
    updateTicket(id, { 
      assignedTo: {
        id: staffId,
        name: staffName
      }
    });
    
  };

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
    
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
    updateTicket,
    updateTicketStatus,
    updateTicketPriority,
    assignTicket,
    deleteTicket,
    addMessage
  };
};

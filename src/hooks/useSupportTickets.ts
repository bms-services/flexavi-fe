
import { useState, useCallback } from "react";
import { mockSupportTickets, createNewTicket, addMessageToTicket } from "@/data/mockSupportTickets";
import { SupportTicket, SupportTicketMessage, SupportTicketStatus, SupportTicketPriority, SupportTicketCategory } from "@/types/support";
import { toast } from "@/hooks/use-toast";

export const useSupportTickets = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockSupportTickets);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const getTickets = useCallback(() => {
    setLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      setTickets(mockSupportTickets);
      setLoading(false);
    }, 500);
  }, []);

  const getTicketById = useCallback((id: string) => {
    return tickets.find(ticket => ticket.id === id) || null;
  }, [tickets]);

  const createTicket = useCallback((ticketData: Partial<SupportTicket>) => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const newTicket = createNewTicket(ticketData);
      setTickets(prevTickets => [...prevTickets, newTicket]);
      setLoading(false);
      toast({
        title: "Ticket aangemaakt",
        description: `Ticket #${newTicket.id} is succesvol aangemaakt.`
      });
      return newTicket;
    }, 500);
    
    // Return a placeholder for now
    return createNewTicket(ticketData);
  }, []);

  const updateTicket = useCallback((id: string, updates: Partial<SupportTicket>) => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === id 
            ? { ...ticket, ...updates, updatedAt: new Date().toISOString() } 
            : ticket
        )
      );
      setLoading(false);
      toast({
        title: "Ticket bijgewerkt",
        description: `Ticket #${id} is succesvol bijgewerkt.`
      });
    }, 500);
  }, []);

  const updateTicketStatus = useCallback((id: string, status: SupportTicketStatus) => {
    updateTicket(id, { status });
  }, [updateTicket]);

  const updateTicketPriority = useCallback((id: string, priority: SupportTicketPriority) => {
    updateTicket(id, { priority });
  }, [updateTicket]);

  const updateTicketCategory = useCallback((id: string, category: SupportTicketCategory) => {
    updateTicket(id, { category });
  }, [updateTicket]);

  const assignTicket = useCallback((id: string, staffId: string, staffName: string, staffAvatar?: string) => {
    updateTicket(id, { 
      assignedTo: { 
        id: staffId, 
        name: staffName,
        avatar: staffAvatar
      } 
    });
  }, [updateTicket]);

  const addMessage = useCallback((
    ticketId: string, 
    content: string, 
    userId: string, 
    userName: string,
    userEmail: string,
    userRole: 'customer' | 'staff' | 'admin',
    isInternal = false
  ) => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const newMessage = addMessageToTicket(
        ticketId, 
        content, 
        userId, 
        userName,
        userEmail,
        userRole,
        isInternal
      );
      
      setTickets(prevTickets => 
        prevTickets.map(ticket => {
          if (ticket.id === ticketId) {
            return {
              ...ticket,
              messages: [...ticket.messages, newMessage],
              lastReplyAt: newMessage.createdAt,
              lastReplyBy: userId,
              updatedAt: newMessage.createdAt,
              // If customer replies, set status to waiting-for-staff
              // If staff replies, set status to waiting-for-customer
              status: userRole === 'customer' ? 'waiting-for-staff' : 'waiting-for-customer'
            };
          }
          return ticket;
        })
      );
      
      setLoading(false);
      toast({
        title: "Bericht toegevoegd",
        description: "Uw bericht is succesvol toegevoegd aan de ticket."
      });
      
      return newMessage;
    }, 500);
    
    // Return a placeholder for now
    return addMessageToTicket(
      ticketId, 
      content, 
      userId, 
      userName,
      userEmail,
      userRole,
      isInternal
    );
  }, []);

  const deleteTicket = useCallback((id: string) => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== id));
      setLoading(false);
      toast({
        title: "Ticket verwijderd",
        description: `Ticket #${id} is succesvol verwijderd.`
      });
    }, 500);
  }, []);

  return {
    tickets,
    loading,
    selectedTicketId,
    setSelectedTicketId,
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    updateTicketStatus,
    updateTicketPriority,
    updateTicketCategory,
    assignTicket,
    addMessage,
    deleteTicket
  };
};

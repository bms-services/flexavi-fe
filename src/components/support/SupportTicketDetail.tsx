
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupportTickets } from "@/hooks/useSupportTickets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { SupportTicketStatusBadge, SupportTicketPriorityBadge } from "./SupportTicketStatusBadge";
import { formatDate } from "@/utils/format";
import { ArrowLeft, Check, MessagesSquare, User, Send, PaperclipIcon } from "lucide-react";
import { SupportTicketActions } from "./SupportTicketActions";
import { SupportTicketMessage } from "@/types/support";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

export function SupportTicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets, getTicketById, addMessage, updateTicketStatus } = useSupportTickets();
  const [replyMessage, setReplyMessage] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [showInternalNotes, setShowInternalNotes] = useState(false);
  
  const ticket = id ? getTicketById(id) : null;
  
  if (!ticket) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate("/support")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar tickets
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold">Ticket niet gevonden</h2>
              <p className="text-muted-foreground mt-2">
                De gevraagde ticket bestaat niet of is verwijderd.
              </p>
              <Button className="mt-4" onClick={() => navigate("/support")}>
                Terug naar overzicht
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleReply = () => {
    if (!replyMessage.trim()) return;
    
    // In a real app, these values would come from your auth system
    addMessage(
      ticket.id, 
      replyMessage, 
      "staff-1", 
      "Support Medewerker",
      "support@yoursaas.nl",
      "staff"
    );
    
    setReplyMessage("");
  };

  const handleInternalNote = () => {
    if (!internalNote.trim()) return;
    
    // In a real app, these values would come from your auth system
    addMessage(
      ticket.id, 
      internalNote, 
      "staff-1", 
      "Support Medewerker",
      "support@yoursaas.nl",
      "staff",
      true // Internal note
    );
    
    setInternalNote("");
  };

  const handleResolve = () => {
    updateTicketStatus(ticket.id, "resolved");
  };

  const handleClose = () => {
    updateTicketStatus(ticket.id, "closed");
  };

  const handleReopen = () => {
    updateTicketStatus(ticket.id, "open");
  };

  const filteredMessages = showInternalNotes 
    ? ticket.messages 
    : ticket.messages.filter(msg => !msg.isInternal);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Button variant="ghost" onClick={() => navigate("/support")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar tickets
        </Button>
        
        <SupportTicketActions ticket={ticket} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{ticket.title}</CardTitle>
                  <CardDescription>
                    Ticket #{ticket.id} • Aangemaakt op {formatDate(new Date(ticket.createdAt))}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <SupportTicketStatusBadge status={ticket.status} />
                  <SupportTicketPriorityBadge priority={ticket.priority} />
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setShowInternalNotes(!showInternalNotes)}
                  >
                    {showInternalNotes ? "Verberg interne notities" : "Toon interne notities"}
                  </Button>
                </div>
                
                <div>
                  {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={handleResolve}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Markeer als opgelost
                    </Button>
                  )}
                  
                  {ticket.status !== 'closed' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleClose}
                    >
                      Sluiten
                    </Button>
                  )}
                  
                  {(ticket.status === 'resolved' || ticket.status === 'closed') && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleReopen}
                    >
                      Heropen
                    </Button>
                  )}
                </div>
              </div>
              
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            
            {ticket.status !== 'closed' && (
              <CardFooter className="flex-col space-y-4">
                <div className="w-full">
                  <Textarea
                    placeholder="Schrijf een reactie..."
                    className="min-h-[100px]"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                  <div className="flex justify-between mt-2">
                    <Button variant="outline" size="sm">
                      <PaperclipIcon className="h-4 w-4 mr-2" />
                      Bijlage
                    </Button>
                    <Button onClick={handleReply}>
                      <Send className="h-4 w-4 mr-2" />
                      Verstuur
                    </Button>
                  </div>
                </div>
                
                <div className="w-full pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Interne notitie (alleen zichtbaar voor team)</div>
                  <Textarea
                    placeholder="Schrijf een interne notitie..."
                    className="min-h-[80px]"
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <Button variant="secondary" onClick={handleInternalNote}>
                      Notitie toevoegen
                    </Button>
                  </div>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Klantgegevens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarFallback>{ticket.customerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{ticket.customerName}</div>
                  <div className="text-sm text-muted-foreground">{ticket.customerEmail}</div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Klantnummer</span>
                  <span>{ticket.customerId}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Tickets</span>
                  <span>{tickets.filter(t => t.customerId === ticket.customerId).length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Ticket informatie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-3">
                <div className="flex justify-between items-center py-1 border-b">
                  <span className="text-muted-foreground">Status</span>
                  <SupportTicketStatusBadge status={ticket.status} />
                </div>
                <div className="flex justify-between items-center py-1 border-b">
                  <span className="text-muted-foreground">Prioriteit</span>
                  <SupportTicketPriorityBadge priority={ticket.priority} />
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Categorie</span>
                  <span>
                    {ticket.category === 'technical' && 'Technisch'}
                    {ticket.category === 'billing' && 'Facturatie'}
                    {ticket.category === 'feature-request' && 'Feature verzoek'}
                    {ticket.category === 'account' && 'Account'}
                    {ticket.category === 'general' && 'Algemeen'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Aangemaakt op</span>
                  <span>{formatDate(new Date(ticket.createdAt))}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Laatste update</span>
                  <span>{formatDate(new Date(ticket.updatedAt))}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Toegewezen aan</span>
                  <span>{ticket.assignedTo ? ticket.assignedTo.name : 'Niet toegewezen'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface MessageItemProps {
  message: SupportTicketMessage;
}

function MessageItem({ message }: MessageItemProps) {
  const isCustomer = message.createdBy.role === 'customer';
  const isInternal = message.isInternal;
  
  return (
    <div className={`p-4 rounded-lg ${isInternal ? 'bg-amber-50 border border-amber-200' : isCustomer ? 'bg-gray-50 border border-gray-200' : 'bg-blue-50 border border-blue-200'}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback>{message.createdBy.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm flex items-center">
              {message.createdBy.name}
              {isCustomer ? (
                <Badge variant="outline" className="ml-2 text-xs">Klant</Badge>
              ) : (
                <Badge variant="outline" className="ml-2 text-xs bg-primary/10">Medewerker</Badge>
              )}
              {isInternal && (
                <Badge variant="outline" className="ml-2 text-xs bg-amber-100 text-amber-800">Intern</Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(message.createdAt), 'dd MMM yyyy HH:mm', { locale: nl })}
            </div>
          </div>
        </div>
      </div>
      <div className="prose prose-sm max-w-none">
        {message.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-2">{paragraph}</p>
        ))}
      </div>
      {message.attachments && message.attachments.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <div className="text-xs font-medium mb-2">Bijlagen:</div>
          <div className="flex flex-wrap gap-2">
            {message.attachments.map((attachment, index) => (
              <div key={index} className="text-xs flex items-center p-1.5 bg-gray-100 rounded">
                <PaperclipIcon className="h-3 w-3 mr-1" />
                <span className="truncate max-w-[140px]">{attachment}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

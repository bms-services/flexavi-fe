
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupportTickets } from "@/hooks/useSupportTickets";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Send, 
  User,
  Calendar, 
  Tag,
  MessageCircle,
  AlertCircle,
  Edit2,
  CheckCircle,
  UserPlus,
  AlertTriangle,
  XCircle
} from "lucide-react";
import { formatDateTime } from "@/utils/format";
import { SupportTicket } from "@/types";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const SupportTicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTicket, addMessage, updateTicketStatus, updateTicketPriority, assignTicket } = useSupportTickets();
  const [newMessage, setNewMessage] = useState("");
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showPriorityDialog, setShowPriorityDialog] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  
  const ticket = getTicket(id || "");
  
  if (!ticket) {
    return (
      <div className="container mx-auto p-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/support")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar overzicht
        </Button>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">Ticket niet gevonden</h2>
              <p className="text-muted-foreground">
                Het opgevraagde support ticket bestaat niet of is verwijderd.
              </p>
              <Button 
                className="mt-4" 
                onClick={() => navigate("/support")}
              >
                Terug naar support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    addMessage(ticket.id, {
      content: newMessage,
      createdAt: new Date().toISOString(),
      createdBy: {
        id: "staff-1",
        name: "Jessica van der Berg",
        email: "jessica@solarinstall.nl",
        avatar: "/avatars/jessica.jpg",
        role: "staff"
      }
    });
    
    setNewMessage("");
  };
  
  const handleMarkAsResolved = () => {
    updateTicketStatus(ticket.id, "resolved");
    toast.success("Ticket gemarkeerd als opgelost");
  };
  
  const handleAssignTicket = () => {
    if (!selectedStaff) return;
    
    const staffInfo = {
      "staff-1": "Henk Visser",
      "staff-2": "Jessica van der Berg",
      "staff-3": "Pieter Janssen",
      "staff-4": "Eva Willemsen"
    };
    
    assignTicket(
      ticket.id, 
      selectedStaff, 
      staffInfo[selectedStaff as keyof typeof staffInfo]
    );
    
    setShowAssignDialog(false);
  };
  
  const handleUpdatePriority = () => {
    if (!selectedPriority) return;
    
    updateTicketPriority(ticket.id, selectedPriority as any);
    setShowPriorityDialog(false);
    toast.success(`Prioriteit gewijzigd naar ${selectedPriority}`);
  };
  
  const handleCloseTicket = () => {
    if (confirm("Weet u zeker dat u deze ticket wilt sluiten?")) {
      updateTicketStatus(ticket.id, "closed");
      toast.success("Ticket gesloten");
    }
  };
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'open': { variant: 'default' as const, label: 'Open' },
      'in-progress': { variant: 'secondary' as const, label: 'In behandeling' },
      'waiting-for-customer': { variant: 'warning' as const, label: 'Wacht op klant' },
      'waiting-for-staff': { variant: 'warning' as const, label: 'Wacht op medewerker' },
      'resolved': { variant: 'success' as const, label: 'Opgelost' },
      'closed': { variant: 'outline' as const, label: 'Gesloten' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['open'];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };
  
  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'low': { variant: 'outline' as const, label: 'Laag' },
      'medium': { variant: 'secondary' as const, label: 'Middel' },
      'high': { variant: 'destructive' as const, label: 'Hoog' },
      'urgent': { variant: 'destructive' as const, label: 'Urgent' },
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig['medium'];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/support")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar overzicht
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate(`/support/${id}/edit`)}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Bewerken
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{ticket.title}</CardTitle>
                  <CardDescription>#{ticket.id}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(ticket.status)}
                  {getPriorityBadge(ticket.priority)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ticket.messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex gap-4 ${message.isInternal ? 'bg-secondary/20 p-4 rounded-lg' : ''}`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.createdBy.avatar} />
                      <AvatarFallback>
                        {message.createdBy.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <div className="font-medium flex items-center gap-2">
                          {message.createdBy.name}
                          {message.isInternal && (
                            <Badge variant="outline">Interne notitie</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDateTime(new Date(message.createdAt))}
                        </span>
                      </div>
                      <div className="mt-2 text-sm whitespace-pre-wrap">
                        {message.content}
                      </div>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Bijlagen:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {message.attachments.map((attachment, index) => (
                              <Badge key={index} variant="secondary">
                                {attachment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col space-y-2">
                  <Textarea
                    placeholder="Typ hier je bericht..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-32"
                  />
                  <div className="flex justify-end gap-2">
                    <Button type="submit" disabled={!newMessage.trim()}>
                      <Send className="mr-2 h-4 w-4" />
                      Versturen
                    </Button>
                  </div>
                </div>
              </form>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Ticket Informatie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" /> Klant
                  </h3>
                  <p className="mt-1">{ticket.customerName}</p>
                  <p className="text-sm text-muted-foreground">{ticket.customerEmail}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" /> Datum
                  </h3>
                  <p className="mt-1">Aangemaakt: {formatDateTime(new Date(ticket.createdAt))}</p>
                  <p className="text-sm text-muted-foreground">
                    Laatste update: {formatDateTime(new Date(ticket.updatedAt))}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" /> Categorie
                  </h3>
                  <p className="mt-1 capitalize">{ticket.category.replace('-', ' ')}</p>
                </div>
                
                {ticket.assignedTo && (
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                      Toegewezen aan
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.assignedTo.avatar} />
                        <AvatarFallback>{ticket.assignedTo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{ticket.assignedTo.name}</span>
                    </div>
                  </div>
                )}
                
                {ticket.tags && ticket.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                      <Tag className="h-4 w-4" /> Tags
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {ticket.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleMarkAsResolved}
                  disabled={ticket.status === 'resolved' || ticket.status === 'closed'}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Markeren als opgelost
                </Button>
                
                <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Toewijzen aan medewerker
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Ticket toewijzen</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Select 
                        value={selectedStaff} 
                        onValueChange={setSelectedStaff}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecteer medewerker" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="staff-1">Henk Visser</SelectItem>
                          <SelectItem value="staff-2">Jessica van der Berg</SelectItem>
                          <SelectItem value="staff-3">Pieter Janssen</SelectItem>
                          <SelectItem value="staff-4">Eva Willemsen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        onClick={handleAssignTicket}
                        disabled={!selectedStaff}
                      >
                        Toewijzen
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={showPriorityDialog} onOpenChange={setShowPriorityDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Prioriteit wijzigen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Prioriteit wijzigen</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Select 
                        value={selectedPriority} 
                        onValueChange={setSelectedPriority}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecteer prioriteit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Laag</SelectItem>
                          <SelectItem value="medium">Gemiddeld</SelectItem>
                          <SelectItem value="high">Hoog</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        onClick={handleUpdatePriority}
                        disabled={!selectedPriority}
                      >
                        Bevestigen
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleCloseTicket}
                  disabled={ticket.status === 'closed'}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Sluiten
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupportTickets } from "@/hooks/useSupportTickets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { SupportTicket } from "@/types";

export const SupportTicketEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTicket, addTicket, updateTicket } = useSupportTickets();
  
  const isNewTicket = id === "new";
  const existingTicket = !isNewTicket ? getTicket(id || "") : undefined;
  
  const [formState, setFormState] = useState<Partial<SupportTicket>>({
    title: "",
    customerName: "",
    customerEmail: "",
    category: "general",
    priority: "medium",
    status: "open",
    messages: []
  });
  
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    if (existingTicket) {
      setFormState({
        title: existingTicket.title,
        customerName: existingTicket.customerName,
        customerEmail: existingTicket.customerEmail,
        category: existingTicket.category,
        priority: existingTicket.priority,
        status: existingTicket.status,
      });
    }
  }, [existingTicket]);
  
  const handleChange = (field: keyof SupportTicket, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isNewTicket) {
        // Create a new ticket
        const initialMessage = message.trim() 
          ? [{
              id: "msg-" + Date.now(),
              ticketId: "new",
              content: message,
              createdAt: new Date().toISOString(),
              createdBy: {
                id: "customer-new",
                name: formState.customerName || "Klant",
                email: formState.customerEmail || "klant@example.com",
                role: "customer"
              }
            }]
          : [];
        
        const newTicket = addTicket({
          ...formState,
          messages: initialMessage,
          customerId: "customer-new",
        });
        
        navigate(`/support/${newTicket.id}`);
      } else if (existingTicket) {
        // Update existing ticket
        updateTicket(existingTicket.id, formState);
        navigate(`/support/${existingTicket.id}`);
      }
    } catch (error) {
      console.error("Error saving ticket:", error);
      toast.error("Er is een fout opgetreden bij het opslaan van het ticket");
    }
  };
  
  if (!isNewTicket && !existingTicket) {
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
              <h2 className="text-xl font-semibold">Ticket niet gevonden</h2>
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
  
  return (
    <div className="container mx-auto p-6">
      <Button 
        variant="outline" 
        onClick={() => navigate(isNewTicket ? "/support" : `/support/${id}`)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {isNewTicket ? "Terug naar overzicht" : "Terug naar ticket"}
      </Button>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isNewTicket ? "Nieuw Ticket Aanmaken" : "Ticket Bewerken"}</CardTitle>
            <CardDescription>
              {isNewTicket 
                ? "Vul de onderstaande informatie in om een nieuw support ticket aan te maken" 
                : "Bewerk de details van het huidige support ticket"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ticket Informatie</h3>
                
                <div className="grid gap-2">
                  <Label htmlFor="title">Onderwerp</Label>
                  <Input
                    id="title"
                    value={formState.title}
                    onChange={e => handleChange("title", e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formState.status}
                      onValueChange={value => handleChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In behandeling</SelectItem>
                        <SelectItem value="waiting-for-customer">Wacht op klant</SelectItem>
                        <SelectItem value="waiting-for-staff">Wacht op medewerker</SelectItem>
                        <SelectItem value="resolved">Opgelost</SelectItem>
                        <SelectItem value="closed">Gesloten</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Prioriteit</Label>
                    <Select
                      value={formState.priority}
                      onValueChange={value => handleChange("priority", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer prioriteit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Laag</SelectItem>
                        <SelectItem value="medium">Middel</SelectItem>
                        <SelectItem value="high">Hoog</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Categorie</Label>
                  <Select
                    value={formState.category}
                    onValueChange={value => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technisch</SelectItem>
                      <SelectItem value="billing">Facturatie</SelectItem>
                      <SelectItem value="feature-request">Feature aanvraag</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="general">Algemeen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Klant Informatie</h3>
                
                <div className="grid gap-2">
                  <Label htmlFor="customerName">Naam</Label>
                  <Input
                    id="customerName"
                    value={formState.customerName}
                    onChange={e => handleChange("customerName", e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="customerEmail">E-mailadres</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formState.customerEmail}
                    onChange={e => handleChange("customerEmail", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {isNewTicket && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Bericht</h3>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="message">Initial bericht</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Beschrijf het probleem of verzoek..."
                      className="min-h-32"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(isNewTicket ? "/support" : `/support/${id}`)}
            >
              Annuleren
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isNewTicket ? "Ticket aanmaken" : "Wijzigingen opslaan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

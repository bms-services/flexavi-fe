
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupportTickets } from "@/hooks/useSupportTickets";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SupportTicketCategory, SupportTicketPriority, SupportTicketStatus } from "@/types/support";
import { toast } from "@/hooks/use-toast";

export function SupportTicketEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTicketById, updateTicket } = useSupportTickets();
  
  const ticket = id ? getTicketById(id) : null;
  
  const [title, setTitle] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [status, setStatus] = React.useState<SupportTicketStatus>("open");
  const [priority, setPriority] = React.useState<SupportTicketPriority>("medium");
  const [category, setCategory] = React.useState<SupportTicketCategory>("general");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setCustomerName(ticket.customerName);
      setCustomerEmail(ticket.customerEmail);
      setStatus(ticket.status);
      setPriority(ticket.priority);
      setCategory(ticket.category);
    }
  }, [ticket]);
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !customerName || !customerEmail) {
      alert("Alle velden met een * zijn verplicht");
      return;
    }
    
    setIsSubmitting(true);
    
    updateTicket(ticket.id, {
      title,
      customerName,
      customerEmail,
      status,
      priority,
      category
    });
    
    setIsSubmitting(false);
    
    toast({
      title: "Ticket bijgewerkt",
      description: "De ticket is succesvol bijgewerkt."
    });
    
    navigate(`/support/${ticket.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate(`/support/${ticket.id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar ticket
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ticket bewerken</CardTitle>
          <CardDescription>Bewerk de gegevens van ticket #{ticket.id}</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titel van de ticket"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Klantnaam *</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Naam van de klant"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Klant e-mail *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="E-mailadres van de klant"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as SupportTicketStatus)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecteer status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In behandeling</SelectItem>
                    <SelectItem value="waiting-for-customer">Wachtend op klant</SelectItem>
                    <SelectItem value="waiting-for-staff">Wachtend op medewerker</SelectItem>
                    <SelectItem value="resolved">Opgelost</SelectItem>
                    <SelectItem value="closed">Gesloten</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Prioriteit</Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as SupportTicketPriority)}
                >
                  <SelectTrigger id="priority">
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
              
              <div className="space-y-2">
                <Label htmlFor="category">Categorie</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value as SupportTicketCategory)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecteer categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technisch</SelectItem>
                    <SelectItem value="billing">Facturatie</SelectItem>
                    <SelectItem value="feature-request">Feature verzoek</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="general">Algemeen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(`/support/${ticket.id}`)}
              disabled={isSubmitting}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Bezig met opslaan..." : "Opslaan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

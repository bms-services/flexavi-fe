
import React from "react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSupportTickets } from "@/hooks/useSupportTickets";
import { SupportTicketCategory, SupportTicketPriority } from "@/types/support";

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTicketDialog({ open, onOpenChange }: CreateTicketDialogProps) {
  const { createTicket } = useSupportTickets();
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [category, setCategory] = React.useState<SupportTicketCategory>("general");
  const [priority, setPriority] = React.useState<SupportTicketPriority>("medium");
  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !message || !customerName || !customerEmail) {
      alert("Alle velden zijn verplicht");
      return;
    }
    
    setIsSubmitting(true);
    
    const customerId = `customer-${Date.now()}`; // In a real app, this would be from your auth system
    
    const newTicket = createTicket({
      title,
      customerId,
      customerName,
      customerEmail,
      category,
      priority,
      status: "open",
      messages: [
        {
          id: `message-${Date.now()}`,
          ticketId: "", // Will be set by createTicket
          content: message,
          createdAt: new Date().toISOString(),
          createdBy: {
            id: customerId,
            name: customerName,
            email: customerEmail,
            role: "customer"
          }
        }
      ]
    });
    
    // Reset form
    setTitle("");
    setMessage("");
    setCategory("general");
    setPriority("medium");
    setCustomerName("");
    setCustomerEmail("");
    setIsSubmitting(false);
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Nieuwe support ticket aanmaken</DialogTitle>
          <DialogDescription>
            Vul de onderstaande gegevens in om een nieuwe support ticket aan te maken.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Klantnaam</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Naam van de klant"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Klant e-mail</Label>
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
          
          <div className="space-y-2">
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Korte beschrijving van het probleem"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Bericht</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Beschrijf het probleem of de vraag in detail"
              rows={5}
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Bezig met aanmaken..." : "Ticket aanmaken"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

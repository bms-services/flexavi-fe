
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, RefreshCcw, Send } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InvoiceHeaderProps {
  isEditing: boolean;
  onSave: () => void;
  status: string;
  invoiceNumber?: string;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ isEditing, onSave, status, invoiceNumber }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: ""
  });

  const handleCreditInvoice = () => {
    // In a real implementation, this would create a credit invoice in the database
    // For now, we'll just show a toast notification
    toast({
      title: "Creditfactuur aangemaakt",
      description: `Creditfactuur voor ${invoiceNumber?.replace("inv-", "FACT-")} is aangemaakt.`,
    });
    setCreditDialogOpen(false);
  };

  const handleSendInvoice = () => {
    // In a real implementation, this would send the invoice
    // For now, we'll just show a toast notification
    toast({
      title: "Factuur verzonden",
      description: `Factuur ${invoiceNumber?.replace("inv-", "FACT-")} is verzonden naar ${emailData.to}.`,
    });
    setSendDialogOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className="flex items-center mb-3">
        <Button variant="ghost" onClick={() => navigate("/invoices")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Terug naar facturen
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? `Factuur bewerken` : "Nieuwe factuur"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? `Bewerk de gegevens van de factuur${invoiceNumber ? ` (${invoiceNumber.replace("inv-", "FACT-")})` : ""}`
              : "Voeg een nieuwe factuur toe"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {isEditing && (
            <>
              <Button variant="outline" onClick={() => setCreditDialogOpen(true)}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Crediteer factuur
              </Button>
              <Button variant="outline" onClick={() => setSendDialogOpen(true)}>
                <Send className="mr-2 h-4 w-4" />
                Verzend factuur
              </Button>
            </>
          )}
          <Button onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Factuur opslaan
          </Button>
        </div>
      </div>

      {/* Credit Invoice Confirmation Dialog */}
      <AlertDialog open={creditDialogOpen} onOpenChange={setCreditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Factuur crediteren</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je deze factuur wilt crediteren? Er wordt een nieuwe creditfactuur aangemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreditInvoice}>Ja, crediteer factuur</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send Invoice Dialog */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Factuur verzenden</DialogTitle>
            <DialogDescription>
              Vul de e-mailgegevens in om de factuur te verzenden
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="to">Aan</Label>
              <Input
                id="to"
                name="to"
                value={emailData.to}
                onChange={handleEmailChange}
                placeholder="email@voorbeeld.nl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Onderwerp</Label>
              <Input
                id="subject"
                name="subject"
                value={emailData.subject}
                onChange={handleEmailChange}
                placeholder={`Factuur ${invoiceNumber?.replace("inv-", "FACT-")}`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Bericht</Label>
              <Textarea
                id="message"
                name="message"
                value={emailData.message}
                onChange={handleEmailChange}
                placeholder="Geachte heer/mevrouw, Hierbij sturen wij u de factuur..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendDialogOpen(false)}>Annuleren</Button>
            <Button onClick={handleSendInvoice}>Verzenden</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

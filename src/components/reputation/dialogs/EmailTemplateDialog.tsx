
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ReviewTemplate } from "@/types/reputation";

interface EmailTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: ReviewTemplate | null;
  onSave: (template: ReviewTemplate) => void;
}

export const EmailTemplateDialog = ({
  open,
  onOpenChange,
  template,
  onSave,
}: EmailTemplateDialogProps) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [dayDelay, setDayDelay] = useState(3);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when dialog opens with a new template
  useEffect(() => {
    if (open) {
      if (template) {
        setName(template.name);
        setSubject(template.subject);
        setEmailBody(template.emailBody);
        setDayDelay(template.dayDelay);
      } else {
        setName("");
        setSubject("Hoe was uw ervaring met [Bedrijfsnaam]?");
        setEmailBody(`Beste [Naam],

Hartelijk dank voor het vertrouwen in ons bedrijf. We hopen dat u tevreden bent met het resultaat van de werkzaamheden.

Zou u een moment willen nemen om uw ervaring met ons te delen? Uw feedback helpt ons om onze service te verbeteren en helpt andere klanten bij het maken van hun keuze.

U kunt een review achterlaten door op onderstaande link te klikken:
[ReviewLink]

Alvast bedankt voor uw tijd!

Met vriendelijke groet,
[Bedrijfsnaam]`);
        setDayDelay(3);
      }
      setErrors({});
    }
  }, [open, template]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = "Voer een naam in voor de template";
    }
    
    if (!subject.trim()) {
      newErrors.subject = "Voer een onderwerp in";
    }
    
    if (!emailBody.trim()) {
      newErrors.emailBody = "Voer de email tekst in";
    }
    
    if (dayDelay < 0) {
      newErrors.dayDelay = "Aantal dagen moet minimaal 0 zijn";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const templateData: ReviewTemplate = {
      id: template?.id || "",
      name: name.trim(),
      subject: subject.trim(),
      emailBody: emailBody.trim(),
      dayDelay: dayDelay,
      active: template?.active || false,
      createdAt: template?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSave(templateData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{template ? "Template bewerken" : "Nieuwe template"}</DialogTitle>
          <DialogDescription>
            {template 
              ? "Bewerk de instellingen en inhoud van de email template."
              : "Maak een nieuwe email template voor review verzoeken."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Naam <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bijv. Standaard review verzoek"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dayDelay">Dagen na factuur</Label>
            <Input
              id="dayDelay"
              type="number"
              min="0"
              value={dayDelay}
              onChange={(e) => setDayDelay(parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
              Aantal dagen na het versturen van de factuur voordat het review verzoek wordt verstuurd.
            </p>
            {errors.dayDelay && <p className="text-xs text-red-500">{errors.dayDelay}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Onderwerp <span className="text-red-500">*</span></Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Onderwerp van de email"
            />
            {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailBody">Email tekst <span className="text-red-500">*</span></Label>
            <Textarea
              id="emailBody"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Inhoud van de email..."
              rows={10}
            />
            {errors.emailBody && <p className="text-xs text-red-500">{errors.emailBody}</p>}
            <p className="text-xs text-muted-foreground">
              Beschikbare variabelen: [Naam], [Bedrijfsnaam], [ReviewLink]
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSubmit}>
            {template ? "Opslaan" : "Aanmaken"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

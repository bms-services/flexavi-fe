
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Lead } from "@/types/leads";
import { mockReviewTemplates } from "@/data/mockReviews";
import { useToast } from "@/hooks/use-toast";

interface RequestReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead;
}

export const RequestReviewDialog = ({
  open,
  onOpenChange,
  lead,
}: RequestReviewDialogProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(mockReviewTemplates[0]?.id || "");
  const { toast } = useToast();

  const handleSubmit = () => {
    // In a real app, this would call an API to send the review request
    toast({
      title: "Review verzoek verstuurd",
      description: `Een review verzoek is verstuurd naar ${lead.email}`,
    });
    onOpenChange(false);
  };

  // Extract first name from the lead's full name
  const getFirstName = (fullName: string) => {
    return fullName ? fullName.split(' ')[0] : '';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review verzoek versturen</DialogTitle>
          <DialogDescription>
            Stuur een verzoek naar deze klant om een review achter te laten
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div>
            <div className="mb-4 space-y-2">
              <h3 className="text-sm font-medium">Klant</h3>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Email template</Label>
            <Select
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger id="template">
                <SelectValue placeholder="Selecteer een template" />
              </SelectTrigger>
              <SelectContent>
                {mockReviewTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Het geselecteerde template wordt gebruikt voor het verzoek
            </p>
          </div>

          {selectedTemplate && (
            <div className="border rounded-md p-3 bg-muted/30 space-y-2">
              <h4 className="text-xs font-medium">Preview:</h4>
              <p className="text-sm font-medium">
                {mockReviewTemplates.find(t => t.id === selectedTemplate)?.subject.replace('[Bedrijfsnaam]', 'Mijn Dakbedrijf')}
              </p>
              <div className="text-xs text-muted-foreground whitespace-pre-line">
                {mockReviewTemplates.find(t => t.id === selectedTemplate)?.emailBody
                  .replace('[Naam]', getFirstName(lead.name))
                  .replace('[Bedrijfsnaam]', 'Mijn Dakbedrijf')
                  .replace('[ReviewLink]', 'https://example.com/review/123')}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedTemplate}>
            Versturen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

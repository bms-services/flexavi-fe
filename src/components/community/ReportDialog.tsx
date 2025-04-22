
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Flag } from "lucide-react";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemType: 'post' | 'comment';
  onSubmit: (reason: string, details: string) => void;
}

export function ReportDialog({ open, onOpenChange, itemType, onSubmit }: ReportDialogProps) {
  const [reason, setReason] = useState<string>('inappropriate');
  const [details, setDetails] = useState<string>('');
  
  const handleSubmit = () => {
    onSubmit(reason, details);
    // Reset form
    setReason('inappropriate');
    setDetails('');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-500" />
            {itemType === 'post' ? 'Bericht rapporteren' : 'Reactie rapporteren'}
          </DialogTitle>
          <DialogDescription>
            {itemType === 'post' 
              ? 'Rapporteer dit bericht als het in strijd is met de community regels.' 
              : 'Rapporteer deze reactie als het in strijd is met de community regels.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Wat is het probleem?</Label>
            <RadioGroup 
              value={reason} 
              onValueChange={setReason}
              className="gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inappropriate" id="inappropriate" />
                <Label htmlFor="inappropriate" className="font-normal">Ongepaste inhoud</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spam" id="spam" />
                <Label htmlFor="spam" className="font-normal">Spam of misleidende inhoud</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="harassment" id="harassment" />
                <Label htmlFor="harassment" className="font-normal">Intimidatie of pesten</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="misinformation" id="misinformation" />
                <Label htmlFor="misinformation" className="font-normal">Onjuiste of misleidende informatie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="font-normal">Anders</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="details">Aanvullende details (optioneel)</Label>
            <Textarea 
              id="details" 
              placeholder="Geef meer informatie over het probleem..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSubmit}>
            Rapporteren
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

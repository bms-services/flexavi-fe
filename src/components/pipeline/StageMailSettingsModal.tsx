
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface StageMailSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enabled: boolean;
  onEnabledChange: (value: boolean) => void;
  template: string;
  onTemplateChange: (template: string) => void;
  stageName: string;
}

export const StageMailSettingsModal: React.FC<StageMailSettingsModalProps> = ({
  open,
  onOpenChange,
  enabled,
  onEnabledChange,
  template,
  onTemplateChange,
  stageName,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>E-mailinstellingen voor "{stageName}"</DialogTitle>
        <DialogDescription>
          Schakel de automatische e-mail uit of pas de e-mailtekst aan voor deze fase.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <Switch checked={enabled} onCheckedChange={onEnabledChange} id="mail-switch" />
          <Label htmlFor="mail-switch" className="pl-2">Automatische e-mail verzenden na verplaatsen</Label>
        </div>
        <div>
          <Label htmlFor="mail-template">E-mail template</Label>
          <Textarea
            id="mail-template"
            className="mt-2 min-h-[120px]"
            value={template}
            onChange={e => onTemplateChange(e.target.value)}
            disabled={!enabled}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          <p>Beschikbare variabelen:</p>
          <ul className="list-disc list-inside">
            <li><code>[Naam]</code> - Naam van de klant</li>
            <li><code>[Fase]</code> - Naam van deze fase</li>
            <li><code>[Datum]</code> - Huidige datum</li>
          </ul>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => onOpenChange(false)}>Sluiten</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

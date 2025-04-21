
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ReputationSettingsPanel = () => {
  const [autoRequestEnabled, setAutoRequestEnabled] = useState(true);
  const [requestDelay, setRequestDelay] = useState(3);
  const [minRatingToShow, setMinRatingToShow] = useState(3);
  const [replyTemplate, setReplyTemplate] = useState(
    "Beste [Naam],\n\nHartelijk dank voor uw feedback. We waarderen uw mening en nemen uw opmerkingen ter harte.\n\nMet vriendelijke groet,\n[Bedrijfsnaam]"
  );
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Instellingen opgeslagen",
      description: "Uw reputatiebeheer instellingen zijn bijgewerkt."
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Reputatiebeheer</CardTitle>
            <CardDescription>
              Beheer hoe reviews worden verzameld en getoond
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-0.5">
            <Label htmlFor="auto-request">Automatische review verzoeken</Label>
            <p className="text-sm text-muted-foreground">
              Stuur automatisch een review verzoek na het voltooien van een project
            </p>
          </div>
          <Switch
            id="auto-request"
            checked={autoRequestEnabled}
            onCheckedChange={setAutoRequestEnabled}
          />
        </div>

        {autoRequestEnabled && (
          <div className="space-y-3 pt-2">
            <Label htmlFor="request-delay">Vertraging na factuur (dagen)</Label>
            <Input
              id="request-delay"
              type="number"
              min="1"
              value={requestDelay}
              onChange={(e) => setRequestDelay(parseInt(e.target.value) || 1)}
            />
            <p className="text-sm text-muted-foreground">
              Aantal dagen na het versturen van een factuur voordat een review verzoek wordt verstuurd
            </p>
          </div>
        )}

        <div className="space-y-3 pt-4">
          <Label htmlFor="min-rating">Minimale rating voor weergave</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="min-rating"
              type="number"
              min="1"
              max="5"
              value={minRatingToShow}
              onChange={(e) => setMinRatingToShow(parseInt(e.target.value) || 1)}
              className="w-20"
            />
            <span>sterren of hoger</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Alleen reviews met deze beoordeling of hoger worden op uw website getoond
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="reply-template">Standaard antwoord template</Label>
          </div>
          <Textarea
            id="reply-template"
            value={replyTemplate}
            onChange={(e) => setReplyTemplate(e.target.value)}
            rows={6}
          />
          <p className="text-sm text-muted-foreground">
            Dit template wordt gebruikt als basis bij het beantwoorden van reviews
          </p>
        </div>

        <div className="pt-6">
          <Button onClick={handleSave}>Instellingen opslaan</Button>
        </div>
      </CardContent>
    </Card>
  );
};

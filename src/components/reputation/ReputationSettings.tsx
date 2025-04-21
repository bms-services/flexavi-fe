
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReputationSettings as SettingsType } from "@/types/reputation";

export const ReputationSettings = ({ reputation }: { reputation: any }) => {
  const [settings, setSettings] = useState<SettingsType>(reputation.settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: keyof SettingsType, value: any) => {
    setSettings({
      ...settings,
      [field]: value,
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    reputation.updateSettings(settings);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setSettings(reputation.settings);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reputatiebeheer instellingen</h2>
          <p className="text-muted-foreground">
            Configureer hoe review verzoeken en publicatie worden afgehandeld
          </p>
        </div>
        {hasChanges && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Annuleren
            </Button>
            <Button onClick={handleSave}>
              Wijzigingen opslaan
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Algemene instellingen</CardTitle>
          <CardDescription>
            Basisinstellingen voor automatische review verzoeken
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-0.5">
              <Label htmlFor="automaticRequestEnabled">Automatische review verzoeken</Label>
              <p className="text-sm text-muted-foreground">
                Automatisch een review verzoek versturen na een factuur
              </p>
            </div>
            <Switch
              id="automaticRequestEnabled"
              checked={settings.automaticRequestEnabled}
              onCheckedChange={(checked) => handleChange("automaticRequestEnabled", checked)}
            />
          </div>

          {settings.automaticRequestEnabled && (
            <>
              <div className="space-y-3">
                <Label htmlFor="requestDelay">Vertraging na factuur (dagen)</Label>
                <Input
                  id="requestDelay"
                  type="number"
                  min="0"
                  value={settings.requestDelay}
                  onChange={(e) => handleChange("requestDelay", parseInt(e.target.value) || 0)}
                />
                <p className="text-sm text-muted-foreground">
                  Aantal dagen na het versturen van een factuur voordat een review verzoek wordt verstuurd.
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="activeTemplateId">Actieve email template</Label>
                <Select
                  value={settings.activeTemplateId || ""}
                  onValueChange={(value) => handleChange("activeTemplateId", value)}
                >
                  <SelectTrigger id="activeTemplateId">
                    <SelectValue placeholder="Kies een template" />
                  </SelectTrigger>
                  <SelectContent>
                    {reputation.templates.map((template: any) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Selecteer welke email template standaard gebruikt wordt voor review verzoeken.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review weergave instellingen</CardTitle>
          <CardDescription>
            Bepaal hoe reviews worden weergegeven op uw website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="minRatingForPublic">Minimale waardering voor weergave</Label>
            <Select
              value={settings.minRatingForPublic.toString()}
              onValueChange={(value) => handleChange("minRatingForPublic", parseInt(value))}
            >
              <SelectTrigger id="minRatingForPublic">
                <SelectValue placeholder="Minimale rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 ster of hoger</SelectItem>
                <SelectItem value="2">2 sterren of hoger</SelectItem>
                <SelectItem value="3">3 sterren of hoger</SelectItem>
                <SelectItem value="4">4 sterren of hoger</SelectItem>
                <SelectItem value="5">Alleen 5 sterren</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Reviews met een lagere waardering worden niet automatisch op uw website getoond.
            </p>
          </div>

          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-0.5">
              <Label htmlFor="handleNegativeReviewsInternally">Interne afhandeling van negatieve reviews</Label>
              <p className="text-sm text-muted-foreground">
                Negatieve reviews eerst afhandelen voordat ze openbaar worden
              </p>
            </div>
            <Switch
              id="handleNegativeReviewsInternally"
              checked={settings.handleNegativeReviewsInternally}
              onCheckedChange={(checked) => handleChange("handleNegativeReviewsInternally", checked)}
            />
          </div>

          {settings.handleNegativeReviewsInternally && (
            <div className="space-y-3">
              <Label htmlFor="negativeReviewThreshold">Drempelwaarde voor negatieve reviews</Label>
              <Select
                value={settings.negativeReviewThreshold.toString()}
                onValueChange={(value) => handleChange("negativeReviewThreshold", parseInt(value))}
              >
                <SelectTrigger id="negativeReviewThreshold">
                  <SelectValue placeholder="Drempelwaarde" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 ster of lager</SelectItem>
                  <SelectItem value="2">2 sterren of lager</SelectItem>
                  <SelectItem value="3">3 sterren of lager</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Reviews met deze waardering of lager worden als negatief beschouwd en intern afgehandeld.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};


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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { IntegrationCredentials } from "@/types/reputation";

interface PlatformIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: IntegrationCredentials | null;
  onSave: (platform: IntegrationCredentials) => void;
  platformConfig: any;
}

export const PlatformIntegrationDialog = ({
  open,
  onOpenChange,
  platform,
  onSave,
  platformConfig,
}: PlatformIntegrationDialogProps) => {
  const [formData, setFormData] = useState<IntegrationCredentials | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && platform) {
      setFormData({ ...platform });
      setErrors({});
    }
  }, [open, platform]);

  if (!platform || !formData) return null;

  const config = platformConfig[platform.platform];

  const handleInputChange = (field: keyof IntegrationCredentials, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleToggleConnection = () => {
    setFormData({
      ...formData,
      connected: !formData.connected,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (formData.connected) {
      if (formData.platform !== "internal") {
        if (!formData.profileUrl) {
          newErrors.profileUrl = "Profiel URL is verplicht";
        } else if (!formData.profileUrl.startsWith("http")) {
          newErrors.profileUrl = "Voer een geldige URL in beginnend met http:// of https://";
        }
        
        if (formData.platform === "google" && !formData.locationId) {
          newErrors.locationId = "Location ID is verplicht voor Google integratie";
        }
        
        if (formData.platform === "trustpilot") {
          if (!formData.accountId) {
            newErrors.accountId = "Business Unit ID is verplicht voor Trustpilot";
          }
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <img
              src={config.icon}
              alt={`${config.title} logo`}
              className="h-6 w-6 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = config.placeholder;
              }}
            />
            <DialogTitle>{config.title} integratie</DialogTitle>
          </div>
          <DialogDescription>
            Configureer uw {config.title} integratie voor review management
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b">
            <div className="space-y-0.5">
              <Label htmlFor="connection-status">Verbinding status</Label>
              <p className="text-sm text-muted-foreground">
                Activeer of deactiveer de integratie
              </p>
            </div>
            <Switch
              id="connection-status"
              checked={formData.connected}
              onCheckedChange={handleToggleConnection}
            />
          </div>

          {formData.connected && (
            <>
              {formData.platform !== "internal" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="profileUrl">
                      {formData.platform === "google" ? "Google My Business profiel URL" : 
                       formData.platform === "trustpilot" ? "Trustpilot bedrijfspagina URL" :
                       "Pagina URL"}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="profileUrl"
                      value={formData.profileUrl || ""}
                      onChange={(e) => handleInputChange("profileUrl", e.target.value)}
                      placeholder={`https://www.${formData.platform}.com/your-business`}
                    />
                    {errors.profileUrl && <p className="text-xs text-red-500">{errors.profileUrl}</p>}
                    <p className="text-xs text-muted-foreground">
                      De URL waar klanten uw reviews kunnen bekijken of plaatsen
                    </p>
                  </div>

                  {formData.platform === "google" && (
                    <div className="space-y-2">
                      <Label htmlFor="locationId">
                        Google Location ID <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="locationId"
                        value={formData.locationId || ""}
                        onChange={(e) => handleInputChange("locationId", e.target.value)}
                        placeholder="12345678901234567890"
                      />
                      {errors.locationId && <p className="text-xs text-red-500">{errors.locationId}</p>}
                      <p className="text-xs text-muted-foreground">
                        Te vinden in Google My Business dashboard onder Informatie
                      </p>
                    </div>
                  )}

                  {formData.platform === "trustpilot" && (
                    <div className="space-y-2">
                      <Label htmlFor="accountId">
                        Business Unit ID <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="accountId"
                        value={formData.accountId || ""}
                        onChange={(e) => handleInputChange("accountId", e.target.value)}
                        placeholder="12a34bc5-67d8-90e1-23f4-g5h6i789jk0l"
                      />
                      {errors.accountId && <p className="text-xs text-red-500">{errors.accountId}</p>}
                      <p className="text-xs text-muted-foreground">
                        Te vinden in Trustpilot Business instellingen
                      </p>
                    </div>
                  )}
                  
                  {(formData.platform === "google" || formData.platform === "trustpilot") && (
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Sleutel</Label>
                      <Input
                        id="apiKey"
                        value={formData.apiKey || ""}
                        onChange={(e) => handleInputChange("apiKey", e.target.value)}
                        placeholder="uwapisleutel123456789"
                        type="password"
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.platform === "google" 
                          ? "Google API sleutel voor het ophalen van reviews" 
                          : "Trustpilot API sleutel voor integratie"}
                      </p>
                    </div>
                  )}
                  
                  {formData.platform === "trustpilot" && (
                    <div className="space-y-2">
                      <Label htmlFor="apiSecret">API Secret</Label>
                      <Input
                        id="apiSecret"
                        value={formData.apiSecret || ""}
                        onChange={(e) => handleInputChange("apiSecret", e.target.value)}
                        placeholder="uwgeheimesleutel123456789"
                        type="password"
                      />
                      <p className="text-xs text-muted-foreground">
                        Trustpilot API secret voor authenticatie
                      </p>
                    </div>
                  )}
                </>
              )}

              <div className="pt-4 text-sm text-muted-foreground rounded-md">
                <p className="italic">
                  {formData.platform === "internal" 
                    ? "Eigen website reviews worden automatisch verzameld en verwerkt in het platform."
                    : `Door te verbinden met ${config.title} kunt u reviews importeren, weergeven op uw site, en reageren vanuit dit platform.`}
                </p>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSubmit}>
            {formData.connected ? "Opslaan" : "Deactiveren"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

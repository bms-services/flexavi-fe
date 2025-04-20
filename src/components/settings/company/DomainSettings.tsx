
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DomainSettings = () => {
  const { toast } = useToast();
  
  const handleSaveDomain = () => {
    toast({
      title: "Domein opgeslagen",
      description: "De domein instellingen zijn succesvol bijgewerkt.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Domein instellingen</CardTitle>
            <CardDescription>
              Configureer een aangepast subdomein voor je klantenportaal
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="subdomain">Subdomein</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="subdomain" 
              placeholder="mijnbedrijf"
              className="max-w-[200px]"
            />
            <span className="text-muted-foreground">.klantenportaal.nl</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Voer alleen het subdomein in. Bijvoorbeeld: als je 'mijnbedrijf' invoert,
            wordt je klantenportaal beschikbaar op mijnbedrijf.klantenportaal.nl
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom-domain">Eigen domein</Label>
          <Input 
            id="custom-domain" 
            placeholder="klanten.mijnbedrijf.nl"
            className="max-w-[300px]"
          />
          <p className="text-sm text-muted-foreground">
            Of gebruik een volledig eigen domein. Hiervoor moet je eerst je DNS-instellingen aanpassen.
          </p>
        </div>

        <Button onClick={handleSaveDomain}>
          Domein instellingen opslaan
        </Button>
      </CardContent>
    </Card>
  );
};

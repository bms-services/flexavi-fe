
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Building2, Mail, Phone, MapPin, Ban, FileText } from "lucide-react";

export const CompanySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Bedrijfsgegevens</CardTitle>
              <CardDescription>
                Beheer je bedrijfsinformatie die wordt weergegeven op offertes en facturen
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Bedrijfsnaam</Label>
              <Input id="company-name" defaultValue="Mijn Dakbedrijf B.V." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-id">BTW Nummer</Label>
              <Input id="tax-id" defaultValue="NL123456789B01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kvk">KvK Nummer</Label>
              <Input id="kvk" defaultValue="12345678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" defaultValue="https://dakbedrijf.nl" />
            </div>
          </div>

          <Separator />

          <div>
            <Label htmlFor="about">Over ons</Label>
            <Textarea
              id="about"
              className="mt-2"
              placeholder="Schrijf een korte beschrijving over je bedrijf..."
              defaultValue="Wij zijn gespecialiseerd in alle soorten dakwerkzaamheden..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Contact & Locatie</CardTitle>
              <CardDescription>
                Contact- en adresgegevens van je bedrijf
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" defaultValue="info@dakbedrijf.nl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefoonnummer</Label>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Input id="phone" defaultValue="020-1234567" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Input id="address" defaultValue="Dakstraat 10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postal">Postcode</Label>
              <Input id="postal" defaultValue="1234 AB" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Plaats</Label>
              <Input id="city" defaultValue="Amsterdam" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="country">Land</Label>
              <Input id="country" defaultValue="Nederland" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Ban className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Financiële gegevens</CardTitle>
              <CardDescription>
                Bankgegevens voor op je facturen
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank</Label>
              <Input id="bank-name" defaultValue="ING Bank" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input id="iban" defaultValue="NL00 INGB 0000 0000 00" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">
            Wijzigingen opslaan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

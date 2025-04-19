
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CompanySettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bedrijfsgegevens</CardTitle>
        <CardDescription>
          Werk je bedrijfsinformatie bij.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Bedrijfsnaam</Label>
            <Input id="company-name" defaultValue="Mijn Dakbedrijf B.V." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-id">BTW Nummer</Label>
            <Input id="tax-id" defaultValue="NL123456789B01" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-email">Email</Label>
            <Input
              id="company-email"
              type="email"
              defaultValue="info@dakbedrijf.nl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-phone">Telefoonnummer</Label>
            <Input id="company-phone" defaultValue="020-1234567" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="company-address">Adres</Label>
            <Input
              id="company-address"
              defaultValue="Dakstraat 10, 1234 AB Amsterdam"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Wijzigingen Opslaan</Button>
      </CardFooter>
    </Card>
  );
};

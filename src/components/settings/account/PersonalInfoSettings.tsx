
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const PersonalInfoSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Persoonlijke Informatie</CardTitle>
        <CardDescription>
          Werk je accountgegevens bij.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Naam</Label>
            <Input id="name" defaultValue="Jan Jansen" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="jan@dakbedrijf.nl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefoonnummer</Label>
            <Input id="phone" defaultValue="06-12345678" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Functie</Label>
            <Input id="role" defaultValue="Eigenaar" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Wijzigingen Opslaan</Button>
      </CardFooter>
    </Card>
  );
};

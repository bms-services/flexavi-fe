
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Mail, PenLine } from "lucide-react";

export const EmailTemplatesSettings = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Email templates</CardTitle>
            <CardDescription>
              Beheer standaard emails voor verschillende situaties
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quote" className="space-y-4">
          <TabsList>
            <TabsTrigger value="quote">Offerte</TabsTrigger>
            <TabsTrigger value="invoice">Factuur</TabsTrigger>
            <TabsTrigger value="agreement">Werkovereenkomst</TabsTrigger>
            <TabsTrigger value="appointment">Afspraak</TabsTrigger>
          </TabsList>

          <TabsContent value="quote" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PenLine className="h-4 w-4" />
                <h3 className="font-medium">Offerte verzenden</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quote-subject">Onderwerp</Label>
                <Input 
                  id="quote-subject" 
                  defaultValue="Offerte [Referentie] - [Bedrijfsnaam]" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote-template">Email tekst</Label>
                <Textarea
                  id="quote-template"
                  className="min-h-[200px]"
                  defaultValue={`Beste [Naam],

Hartelijk dank voor uw interesse in onze dienstverlening. In de bijlage vindt u de offerte voor het besproken project.

Mocht u nog vragen hebben over de offerte, dan horen wij dat graag.

Met vriendelijke groet,
[Bedrijfsnaam]`}
                />
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Beschikbare variabelen:</p>
                <ul className="list-disc list-inside">
                  <li>[Naam] - Naam van de klant</li>
                  <li>[Bedrijfsnaam] - Naam van je bedrijf</li>
                  <li>[Referentie] - Referentienummer</li>
                  <li>[Datum] - Huidige datum</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invoice" className="space-y-4">
            {/* Similar structure for invoice emails */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PenLine className="h-4 w-4" />
                <h3 className="font-medium">Factuur verzenden</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invoice-subject">Onderwerp</Label>
                <Input 
                  id="invoice-subject" 
                  defaultValue="Factuur [Referentie] - [Bedrijfsnaam]" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoice-template">Email tekst</Label>
                <Textarea
                  id="invoice-template"
                  className="min-h-[200px]"
                  defaultValue={`Beste [Naam],

Hierbij ontvangt u de factuur voor de uitgevoerde werkzaamheden.

Wij verzoeken u vriendelijk het bedrag binnen 14 dagen over te maken.

Met vriendelijke groet,
[Bedrijfsnaam]`}
                />
              </div>
            </div>
          </TabsContent>

          {/* Add similar content for other tabs */}
        </Tabs>
      </CardContent>
    </Card>
  );
};


import React from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instellingen</h1>
          <p className="text-muted-foreground">
            Beheer je account- en applicatie-instellingen.
          </p>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="company">Bedrijf</TabsTrigger>
            <TabsTrigger value="notifications">Notificaties</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-6 mt-6">
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

            <Card>
              <CardHeader>
                <CardTitle>Wachtwoord Wijzigen</CardTitle>
                <CardDescription>
                  Update je wachtwoord voor veiligheid.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Huidig Wachtwoord</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div />
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nieuw Wachtwoord</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Bevestig Nieuw Wachtwoord
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Wachtwoord Wijzigen</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-6 mt-6">
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
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notificatie-instellingen</CardTitle>
                <CardDescription>
                  Beheer hoe en wanneer je notificaties ontvangt.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Notificatie-instellingen worden binnenkort toegevoegd.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;

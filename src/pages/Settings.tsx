import React, { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Clock, Plus, Minus, Users, Building2, Palette } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [timeBlocks, setTimeBlocks] = useState([
    { id: 1, start: "09:00", end: "12:00", label: "Ochtend" },
    { id: 2, start: "13:00", end: "17:00", label: "Middag" },
    { id: 3, start: "18:00", end: "21:00", label: "Avond" },
  ]);

  const [slotSettings, setSlotSettings] = useState({
    salesMorningSlots: 3,
    salesAfternoonSlots: 3,
    salesEveningSlots: 2,
    installationMorningSlots: 2,
    installationAfternoonSlots: 2,
    installationEveningSlots: 1,
  });

  const [colors, setColors] = useState({
    emptyBorder: "#E5DEFF",
    fullBorder: "#F97316",
  });

  const handleSaveSlots = () => {
    toast({
      title: "Instellingen opgeslagen",
      description: "De slot instellingen zijn succesvol bijgewerkt.",
    });
  };

  const handleSaveColors = () => {
    toast({
      title: "Kleuren opgeslagen",
      description: "De kleurinstellingen zijn succesvol bijgewerkt.",
    });
  };

  const handleAddTimeBlock = () => {
    const newBlock = {
      id: timeBlocks.length + 1,
      start: "09:00",
      end: "17:00",
      label: "Nieuw blok",
    };
    setTimeBlocks([...timeBlocks, newBlock]);
  };

  const handleRemoveTimeBlock = (id: number) => {
    setTimeBlocks(timeBlocks.filter(block => block.id !== id));
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instellingen</h1>
          <p className="text-muted-foreground">
            Beheer je account- en applicatie-instellingen.
          </p>
        </div>

        <Tabs defaultValue="appointments">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="appointments">Agenda</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="company">Bedrijf</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Aantal afspraken per dagdeel</CardTitle>
                <CardDescription>
                  Beheer het maximum aantal afspraken per dagdeel voor verschillende type teams.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {timeBlocks.map((block, index) => (
                    <div key={block.id} className="space-y-4 border p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{block.label}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTimeBlock(block.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Label>Start tijd</Label>
                            <Input type="time" value={block.start} />
                          </div>
                          <div className="flex-1">
                            <Label>Eind tijd</Label>
                            <Input type="time" value={block.end} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Verkoop afspraken</Label>
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            value={slotSettings[`salesMorning${index + 1}Slots`] || 3}
                            onChange={(e) =>
                              setSlotSettings({
                                ...slotSettings,
                                [`sales${block.label}Slots`]: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Uitvoering afspraken</Label>
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            value={slotSettings[`installationMorning${index + 1}Slots`] || 2}
                            onChange={(e) =>
                              setSlotSettings({
                                ...slotSettings,
                                [`installation${block.label}Slots`]: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={handleAddTimeBlock} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Voeg tijdblok toe
                </Button>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSlots} className="ml-auto">
                  Instellingen opslaan
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agenda weergave</CardTitle>
                <CardDescription>
                  Pas de kleuren aan voor verschillende agenda statussen.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Kleur voor lege agenda</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={colors.emptyBorder}
                        onChange={(e) =>
                          setColors({ ...colors, emptyBorder: e.target.value })
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {colors.emptyBorder}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Kleur voor volle agenda</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={colors.fullBorder}
                        onChange={(e) =>
                          setColors({ ...colors, fullBorder: e.target.value })
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {colors.fullBorder}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveColors} className="ml-auto">
                  Kleuren opslaan
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="teams" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Teams beheren</CardTitle>
                <CardDescription>
                  Voeg nieuwe teams toe of bewerk bestaande teams.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" /> Verkoop Teams
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Voeg verkoop team toe
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5" /> Uitvoerende Teams
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Voeg uitvoerend team toe
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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

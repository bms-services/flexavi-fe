
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { RoofMeasurementForm } from "@/components/roof-measurement/RoofMeasurementForm";
import { RoofMeasurementList } from "@/components/roof-measurement/RoofMeasurementList";
import { SatellitePreview } from "@/components/roof-measurement/SatellitePreview";
import { RoofMeasurement } from "@/types/roof-measurement";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, Satellite } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

// Mock data for initial measurements
const initialMeasurements: RoofMeasurement[] = [
  {
    id: uuidv4(),
    address: "Hoofdstraat 123, Amsterdam",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    area: 85,
    pitch: 30,
    materialType: "tiles",
    condition: "good",
    notes: "Klassiek pand met recent gerenoveerd dak.",
  },
  {
    id: uuidv4(),
    address: "Kerkweg 45, Rotterdam",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    area: 110,
    pitch: 40,
    materialType: "slate",
    condition: "fair",
    notes: "Oudere woning, dakbedekking begint slijtage te vertonen.",
  },
];

export default function RoofMeasurementPage() {
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState<RoofMeasurement[]>(initialMeasurements);
  const [editingMeasurement, setEditingMeasurement] = useState<RoofMeasurement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchAddress, setSearchAddress] = useState("");

  const handleAddMeasurement = (measurement: RoofMeasurement) => {
    setIsLoading(true);
    
    // Simulate an API call
    setTimeout(() => {
      setMeasurements([measurement, ...measurements]);
      setIsDialogOpen(false);
      setIsLoading(false);
      
      toast({
        title: "Dakmeting toegevoegd",
        description: "De dakmeting is succesvol toegevoegd.",
      });
    }, 1000);
  };

  const handleUpdateMeasurement = (measurement: RoofMeasurement) => {
    setIsLoading(true);
    
    // Simulate an API call
    setTimeout(() => {
      setMeasurements(measurements.map(m => 
        m.id === measurement.id ? measurement : m
      ));
      setEditingMeasurement(null);
      setIsDialogOpen(false);
      setIsLoading(false);
      
      toast({
        title: "Dakmeting bijgewerkt",
        description: "De dakmeting is succesvol bijgewerkt.",
      });
    }, 1000);
  };

  const handleDeleteMeasurement = (id: string) => {
    const confirmDelete = window.confirm("Weet je zeker dat je deze dakmeting wilt verwijderen?");
    
    if (confirmDelete) {
      setIsLoading(true);
      
      // Simulate an API call
      setTimeout(() => {
        setMeasurements(measurements.filter(m => m.id !== id));
        setIsLoading(false);
        
        toast({
          title: "Dakmeting verwijderd",
          description: "De dakmeting is succesvol verwijderd.",
        });
      }, 1000);
    }
  };

  const handleEditMeasurement = (measurement: RoofMeasurement) => {
    setEditingMeasurement(measurement);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditingMeasurement(null);
    setIsDialogOpen(false);
  };

  const handleSearchSatellite = () => {
    setIsLoading(true);
    
    // Simulate a search operation
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Satelliet AI Dakmeting</h1>
            <p className="text-muted-foreground">
              Meet daken op afstand met behulp van satellietbeelden en AI-analyse
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nieuwe meting
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>
                  {editingMeasurement ? "Dakmeting bewerken" : "Nieuwe dakmeting toevoegen"}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <RoofMeasurementForm
                  onSubmit={editingMeasurement ? handleUpdateMeasurement : handleAddMeasurement}
                  initialData={editingMeasurement || undefined}
                  isLoading={isLoading}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">Alle metingen</TabsTrigger>
              <TabsTrigger value="satellite">Satelliet meting</TabsTrigger>
            </TabsList>
            
            {activeTab === "all" && (
              <Button variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Vernieuwen
              </Button>
            )}
          </div>
          
          <TabsContent value="all" className="space-y-4">
            <RoofMeasurementList
              measurements={measurements}
              onEdit={handleEditMeasurement}
              onDelete={handleDeleteMeasurement}
            />
          </TabsContent>
          
          <TabsContent value="satellite">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SatellitePreview 
                address={searchAddress}
                onAddressChange={setSearchAddress}
                onSearch={handleSearchSatellite}
                isLoading={isLoading}
              />
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-card">
                  <h3 className="flex items-center text-lg font-medium mb-3">
                    <Satellite className="mr-2 h-5 w-5" />
                    Hoe werkt satelliet dakmeting?
                  </h3>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">1</div>
                      <p>Voer een adres in en zoek het pand op satellietbeelden.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">2</div>
                      <p>Onze AI-technologie analyseert automatisch het dakoppervlak op de foto.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">3</div>
                      <p>Ontvang een schatting van het oppervlak, de hellingshoek en de staat van het dak.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">4</div>
                      <p>Gebruik deze gegevens voor offertes of rapportages zonder ter plaatse te hoeven zijn.</p>
                    </li>
                  </ol>
                  <p className="text-xs text-muted-foreground mt-4">
                    Let op: De nauwkeurigheid van metingen is afhankelijk van de kwaliteit van de beschikbare satellietbeelden en kan afwijken van de werkelijke situatie.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg border bg-card">
                  <h3 className="text-lg font-medium mb-2">Voordelen</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Bespaar tijd door geen voorbezoek nodig te hebben</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Maak nauwkeurige offertes op basis van accurate metingen</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Identificeer problemen voordat je ter plaatse bent</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Plan materiaal en personeel efficiënter in</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

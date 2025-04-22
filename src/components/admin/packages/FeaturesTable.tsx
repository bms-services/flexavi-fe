
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { PackageFeature } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';

interface FeaturesTableProps {
  features: PackageFeature[];
  onFeatureToggle: (featureId: string, packageType: 'starter' | 'professional' | 'enterprise') => void;
  onAddFeature: (feature: Omit<PackageFeature, 'id'>) => void;
}

const featureDescriptions: Record<string, string> = {
  "dashboard": "Je hebt een eigen dashboard waar je direct inzicht hebt in alle cijfers.",
  "lead-overview": "Je hebt een overzicht van alle leads & klanten binnen jouw bedrijf. Dit overzicht kan je filteren op status, locatie of andere datapoints.",
  "auto-lead-integration": "Je kan Flexavi eenvoudig koppelen aan jouw bestaande leadproviders waardoor leads automatisch in jouw klanten bestand komen en in een gewenste pijplijn.",
  "lead-profile": "Een fijn lead profiel waar je direct de stand van zaken kan terug vinden. Je vind WOZ informatie van het adres, google streetview. Je vind eenvoudig facturen, offertes, werkovereenkomsten en foto's terug.",
  "woz-info": "WOZ informatie van het object",
  "pipeline": "Wij hebben kant en klare pijplijnen voor je gemaakt die direct zijn aangesloten. Een overzicht van alle nieuwe leads, leads wie je moet verzetten, op te volgen offertes, openstaande betalingen, on opgeloste garanties. Zodat je een fijn overzicht hebt van wat er nog opgepakt moet worden binnen je bedrijf",
  "planning": "Je hebt een fijn overzicht van je planning. Je kan direct zien waar je plek hebt, en waar niet! Typ simpel weg een plaatsnaam in en wij laten je direct zien op welke dagen je ook in die omgeving zit. Hierdoor kan je sneller en zonder fouten plannen!",
  "route-optimization": "Met 1 druk op de knop kan jij werklijsten maken voor al je verkoop teams & werkuitvoerende teams. Wij maken de beste mogelijke route voor al je werklijsten! Geen tijd meer aan kijken wat nou de beste route is!",
  "pdf-worklist": "Je kan eenvoudig de werklijst als PDF opslaan en door sturen naar je personeel of uitprinten.",
  "day-planning": "Zijn jouw werknemers wel digitaal? Dan kan je ze een dag planning mee geven. Dus niet meer printen en losse pdf'jes door sturen. Jouw personeel kan de klant vanuit deze omgeving direct inzien en verwerken! Dat scheelt ook weer voor het kantoor personeel!",
  "ai-photo-processing": "Je kan een factuur / offerte / werkopdracht een foto van maken, deze uploaden in het systeem en wij verwerken hem als factuur/offerte/werkopdracht! Hierdoor bespaart jouw kantoorpersoneel extreem veel tijd!",
  "employees": "Je kan eenvoudig werknemers toevoegen. Hun dag / uur tarief verwerken. Hun planning in het systeem zetten en eventueel vrije dagen toevoegen zodat je geen onverwachte personeels-tekort problemen hebt!",
  "products": "Je kan vooraf producten & diensten in je systeem zetten. Dit zijn dan vooraf beschreven diensten die je voor elke offerte, factuur en werkopdracht kunt gebruiken. Hierdoor hoef je niet elke keer de hele uitleg opnieuw te typen!",
  "quotes": "Je kan super snel offertes maken, berekenen en versturen.",
  "invoices": "Je kan super snel facturen maken, berekenen en versturen.",
  "work-agreements": "Wanneer je een akkoord hebt op een offerte dan is het nog van belang om een werkovereenkomst op te stellen met jouw klant. Hierdoor zit je juridisch voor 99% waterdicht! Alle afspraken staan netjes beschreven!",
  "expenses": "Je kan facturen uploaden (die je moet betalen) onze AI scant alle bonnetjes & facturen en verwerkt deze in het systeem.",
  "projects": "Je kan eigen projecten aanmaken. En hieraan leads, facturen, offertes, bonnetjes, personeel kan koppelen om zo tot een winstberekening te komen. Maar ook om zo een overzicht te creeeren van elke opdracht.",
  "calculator": "Moet je een grote klus uitrekenen? Dan hebben wij een calculator voor je ontwikkeld waarin je alle kosten kunt verwerken om zo te zien wat je totale kosten zijn waardoor je daarna je prijzen kunt gaan door rekenen om zo tot een goede prijs te komen.",
  "reputation-management": "Via het systeem kan je eenvoudig reviews verzamelen. Je kunt er voor kiezen om na elke factuur een review verzoek te sturen. Wij hebben dit volledig ingebouwd waardoor je meer reviews zal ontvangen!",
  "request-idea": "Ontbreekt er een functionaliteit, dan kan je altijd je eigen idee aan ons doorgeven. Hierop kunnen andere ondernemers stemmen. Een idee met veel stemmen wordt altijd voor jullie ontwikkeld!",
  "partners": "Wij hebben samenwerkingen met andere partners zoals een marketing bureau, inkoop, verzekering en nog veel meer, waar je een leuke korting kan krijgen omdat je bij ons klant bent!",
  "community": "We hebben een community ontwikkeld waar andere dakondernemers die gebruik maken van Flexavi toegang tot hebben. Hier kan je jouw werk showcasen, netwerken, personeel zoeken of uitwisselen, werk uitbesteden, klus advies vragen, juridisch advies vragen.",
  "support": "Wij hebben een support afdeling die van maandag t/m vrijdag bereikbaar is."
};

export function FeaturesTable({ features, onFeatureToggle, onAddFeature }: FeaturesTableProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    category: 'general',
    starter: false,
    professional: true,
    enterprise: true
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = Array.from(new Set(features.map(feature => feature.category)));
  
  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);
  
  const handleAddFeature = () => {
    onAddFeature(newFeature);
    setNewFeature({
      name: '',
      description: '',
      category: 'general',
      starter: false,
      professional: true,
      enterprise: true
    });
    setShowAddDialog(false);
  };

  const getFeatureDescription = (feature: PackageFeature) => {
    // First try to get the description from our predefined list
    const keyMatch = Object.keys(featureDescriptions).find(key => 
      feature.name.toLowerCase().includes(key.toLowerCase())
    );
    
    if (keyMatch) return featureDescriptions[keyMatch];
    
    // If not found, return the feature's own description or a default
    return feature.description || "Geen beschrijving beschikbaar";
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Label htmlFor="categoryFilter">Categorie:</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Alle categorieën" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle categorieën</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nieuwe feature
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nieuwe feature toevoegen</DialogTitle>
              <DialogDescription>
                Voeg een nieuwe feature toe aan je pakketten. Geef een duidelijke beschrijving om klanten te helpen begrijpen wat de feature doet.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="featureName">Feature naam</Label>
                <Input 
                  id="featureName" 
                  value={newFeature.name} 
                  onChange={(e) => setNewFeature({...newFeature, name: e.target.value})}
                  placeholder="Bijv. Lead management"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="featureDescription">Beschrijving</Label>
                <Textarea 
                  id="featureDescription" 
                  value={newFeature.description} 
                  onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                  placeholder="Beschrijf wat deze feature doet en hoe het de gebruiker helpt"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="featureCategory">Categorie</Label>
                <Select 
                  value={newFeature.category} 
                  onValueChange={(value) => setNewFeature({...newFeature, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Algemeen</SelectItem>
                    <SelectItem value="leads">Leads</SelectItem>
                    <SelectItem value="projects">Projecten</SelectItem>
                    <SelectItem value="invoices">Facturatie</SelectItem>
                    <SelectItem value="quotes">Offertes</SelectItem>
                    <SelectItem value="appointments">Afspraken</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="starterAccess" 
                    checked={newFeature.starter}
                    onCheckedChange={(checked) => setNewFeature({...newFeature, starter: checked})}
                  />
                  <Label htmlFor="starterAccess">Starter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="professionalAccess" 
                    checked={newFeature.professional}
                    onCheckedChange={(checked) => setNewFeature({...newFeature, professional: checked})}
                  />
                  <Label htmlFor="professionalAccess">Professional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enterpriseAccess" 
                    checked={newFeature.enterprise}
                    onCheckedChange={(checked) => setNewFeature({...newFeature, enterprise: checked})}
                  />
                  <Label htmlFor="enterpriseAccess">Enterprise</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddFeature}>Feature toevoegen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="w-full rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[60%]">Feature</TableHead>
              <TableHead className="text-center">Starter</TableHead>
              <TableHead className="text-center">Professional</TableHead>
              <TableHead className="text-center">Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeatures.map((feature) => (
              <TableRow key={feature.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {feature.name}
                    {getFeatureDescription(feature) && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[300px] text-sm">{getFeatureDescription(feature)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={feature.starter}
                    onCheckedChange={() => onFeatureToggle(feature.id, 'starter')}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={feature.professional}
                    onCheckedChange={() => onFeatureToggle(feature.id, 'professional')}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={feature.enterprise}
                    onCheckedChange={() => onFeatureToggle(feature.id, 'enterprise')}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

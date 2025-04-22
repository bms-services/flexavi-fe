
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

interface FeaturesTableProps {
  features: PackageFeature[];
  onFeatureToggle: (featureId: string, packageType: 'starter' | 'professional' | 'enterprise') => void;
  onAddFeature: (feature: Omit<PackageFeature, 'id'>) => void;
}

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

  return (
    <div className="space-y-4">
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nieuwe feature toevoegen</DialogTitle>
              <DialogDescription>
                Voeg een nieuwe feature toe aan je pakketten.
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
                <Input 
                  id="featureDescription" 
                  value={newFeature.description} 
                  onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                  placeholder="Beschrijf wat deze feature doet"
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
      
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[40%]">Feature</TableHead>
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
                    {feature.description && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-sm">{feature.description}</p>
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

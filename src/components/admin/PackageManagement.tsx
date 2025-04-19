
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Package, PercentCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PackageFeature {
  id: string;
  name: string;
  starter: boolean;
  professional: boolean;
  enterprise: boolean;
}

export function PackageManagement() {
  const { toast } = useToast();
  const [packages, setPackages] = useState({
    starter: { 
      name: "Starter",
      monthly: "29.99",
      yearly: "299.99",
      trialDays: "14",
      discount: {
        percentage: "10",
        validDays: "30"
      }
    },
    professional: { 
      name: "Professional",
      monthly: "59.99",
      yearly: "599.99",
      trialDays: "14",
      discount: {
        percentage: "15",
        validDays: "30"
      }
    },
    enterprise: { 
      name: "Enterprise",
      monthly: "99.99",
      yearly: "999.99",
      trialDays: "30",
      discount: {
        percentage: "20",
        validDays: "30"
      }
    }
  });

  const [features, setFeatures] = useState<PackageFeature[]>([
    { id: "1", name: "Maximaal aantal leads", starter: true, professional: true, enterprise: true },
    { id: "2", name: "Email ondersteuning", starter: true, professional: true, enterprise: true },
    { id: "3", name: "Basis rapportages", starter: true, professional: true, enterprise: true },
    { id: "4", name: "Team agenda beheer", starter: false, professional: true, enterprise: true },
    { id: "5", name: "API toegang", starter: false, professional: false, enterprise: true },
    { id: "6", name: "Prioriteit support", starter: false, professional: true, enterprise: true }
  ]);

  const handlePriceChange = (
    packageType: keyof typeof packages, 
    field: 'monthly' | 'yearly' | 'trialDays' | 'percentage' | 'validDays', 
    value: string
  ) => {
    setPackages(prev => ({
      ...prev,
      [packageType]: { 
        ...prev[packageType],
        ...((field === 'percentage' || field === 'validDays') 
          ? { 
              discount: {
                ...prev[packageType].discount,
                [field]: value
              }
            } 
          : { [field]: value })
      }
    }));
  };

  const handleFeatureToggle = (featureId: string, packageType: 'starter' | 'professional' | 'enterprise') => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.id === featureId 
          ? { ...feature, [packageType]: !feature[packageType] } 
          : feature
      )
    );
  };

  const handleSave = () => {
    toast({
      title: "Wijzigingen opgeslagen",
      description: "De pakket instellingen zijn succesvol bijgewerkt.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pakket Prijzen en Instellingen</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="monthly">Maandelijks</TabsTrigger>
              <TabsTrigger value="yearly">Jaarlijks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(packages).map(([key, value]) => (
                  <div key={key} className="space-y-4 p-4 border rounded-lg">
                    <label className="text-sm font-medium">{value.name}</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">€</span>
                      <Input
                        type="number"
                        value={value.monthly}
                        onChange={(e) => handlePriceChange(key as keyof typeof packages, 'monthly', e.target.value)}
                        className="max-w-[120px]"
                      />
                      <span className="text-sm">/ maand</span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gratis proefperiode</label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={value.trialDays}
                          onChange={(e) => handlePriceChange(key as keyof typeof packages, 'trialDays', e.target.value)}
                          className="max-w-[80px]"
                        />
                        <span className="text-sm">dagen</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Korting</label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={value.discount.percentage}
                          onChange={(e) => handlePriceChange(key as keyof typeof packages, 'percentage', e.target.value)}
                          className="max-w-[80px]"
                        />
                        <span className="text-sm">%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={value.discount.validDays}
                          onChange={(e) => handlePriceChange(key as keyof typeof packages, 'validDays', e.target.value)}
                          className="max-w-[80px]"
                        />
                        <span className="text-sm">dagen geldig</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="yearly">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(packages).map(([key, value]) => (
                  <div key={key} className="space-y-4 p-4 border rounded-lg">
                    <label className="text-sm font-medium">{value.name}</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">€</span>
                      <Input
                        type="number"
                        value={value.yearly}
                        onChange={(e) => handlePriceChange(key as keyof typeof packages, 'yearly', e.target.value)}
                        className="max-w-[120px]"
                      />
                      <span className="text-sm">/ jaar</span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Korting</label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={value.discount.percentage}
                          onChange={(e) => handlePriceChange(key as keyof typeof packages, 'percentage', e.target.value)}
                          className="max-w-[80px]"
                        />
                        <span className="text-sm">%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={value.discount.validDays}
                          onChange={(e) => handlePriceChange(key as keyof typeof packages, 'validDays', e.target.value)}
                          className="max-w-[80px]"
                        />
                        <span className="text-sm">dagen geldig</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pakket Features</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead className="text-center">Starter</TableHead>
                <TableHead className="text-center">Professional</TableHead>
                <TableHead className="text-center">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>{feature.name}</TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={feature.starter}
                      onCheckedChange={() => handleFeatureToggle(feature.id, 'starter')}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={feature.professional}
                      onCheckedChange={() => handleFeatureToggle(feature.id, 'professional')}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={feature.enterprise}
                      onCheckedChange={() => handleFeatureToggle(feature.id, 'enterprise')}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSave}>Wijzigingen opslaan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

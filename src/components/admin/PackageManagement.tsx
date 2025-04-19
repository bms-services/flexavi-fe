
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    starter: { price: "29.99", name: "Starter" },
    professional: { price: "59.99", name: "Professional" },
    enterprise: { price: "99.99", name: "Enterprise" }
  });

  const [features, setFeatures] = useState<PackageFeature[]>([
    { id: "1", name: "Maximaal aantal leads", starter: true, professional: true, enterprise: true },
    { id: "2", name: "Email ondersteuning", starter: true, professional: true, enterprise: true },
    { id: "3", name: "Basis rapportages", starter: true, professional: true, enterprise: true },
    { id: "4", name: "Team agenda beheer", starter: false, professional: true, enterprise: true },
    { id: "5", name: "API toegang", starter: false, professional: false, enterprise: true },
    { id: "6", name: "Prioriteit support", starter: false, professional: true, enterprise: true }
  ]);

  const handlePriceChange = (packageType: keyof typeof packages, value: string) => {
    setPackages(prev => ({
      ...prev,
      [packageType]: { ...prev[packageType], price: value }
    }));
  };

  const handleFeatureToggle = (featureId: string, packageType: 'starter' | 'professional' | 'enterprise') => {
    setFeatures(prev => prev.map(feature => {
      if (feature.id === featureId) {
        return { ...feature, [packageType]: !feature[packageType] };
      }
      return feature;
    }));
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
          <CardTitle>Pakket Prijzen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(packages).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium">{value.name}</label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">€</span>
                  <Input
                    type="number"
                    value={value.price}
                    onChange={(e) => handlePriceChange(key as keyof typeof packages, e.target.value)}
                    className="max-w-[120px]"
                  />
                  <span className="text-sm">/ maand</span>
                </div>
              </div>
            ))}
          </div>
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

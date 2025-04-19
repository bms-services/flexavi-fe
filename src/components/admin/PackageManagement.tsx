import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Package, PercentCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PackageCard } from './packages/PackageCard';
import type { PackageData, PackageFeature } from './packages/types';

interface PackageFeature {
  id: string;
  name: string;
  starter: boolean;
  professional: boolean;
  enterprise: boolean;
}

export function PackageManagement() {
  const { toast } = useToast();
  const [packages, setPackages] = useState<Record<string, PackageData>>({
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
    packageType: string, 
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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            Pakket Prijzen en Instellingen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(packages).map(([key, value]) => (
              <PackageCard
                key={key}
                packageData={value}
                type={key as keyof typeof packages}
                onPriceChange={handlePriceChange}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PercentCircle className="h-6 w-6" />
            Pakket Features
          </CardTitle>
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

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave}>Wijzigingen opslaan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

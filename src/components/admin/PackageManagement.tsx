
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, PercentCircle } from 'lucide-react';
import { PackageCard } from './packages/PackageCard';
import { FeaturesTable } from './packages/FeaturesTable';
import { usePackageManagement } from './packages/usePackageManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export function PackageManagement() {
  const { packages, features, handlePriceChange, handleFeatureToggle, handleAddFeature, handleSave } = usePackageManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pakketten Beheer</h2>
        <Button onClick={handleSave}>Wijzigingen opslaan</Button>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="pricing" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Prijzen
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <PercentCircle className="h-4 w-4" />
            Features
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(packages).map(([key, value]) => (
              <PackageCard
                key={key}
                packageData={value}
                type={key as 'starter' | 'professional' | 'enterprise'}
                onPriceChange={handlePriceChange}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <FeaturesTable 
                features={features}
                onFeatureToggle={handleFeatureToggle}
                onAddFeature={handleAddFeature}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

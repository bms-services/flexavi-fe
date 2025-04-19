
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, PercentCircle } from 'lucide-react';
import { PackageCard } from './packages/PackageCard';
import { FeaturesTable } from './packages/FeaturesTable';
import { usePackageManagement } from './packages/usePackageManagement';

export function PackageManagement() {
  const { packages, features, handlePriceChange, handleFeatureToggle, handleSave } = usePackageManagement();

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
                type={key as 'starter' | 'professional' | 'enterprise'}
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
          <FeaturesTable 
            features={features}
            onFeatureToggle={handleFeatureToggle}
          />
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave}>Wijzigingen opslaan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


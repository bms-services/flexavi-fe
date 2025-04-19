
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PackageData } from './types';

interface PackageCardProps {
  packageData: PackageData;
  type: keyof typeof packages;
  onPriceChange: (packageType: string, field: 'monthly' | 'yearly' | 'trialDays' | 'percentage' | 'validDays', value: string) => void;
}

export function PackageCard({ packageData, type, onPriceChange }: PackageCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">{packageData.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Maandelijks tarief (€)</Label>
            <div className="flex items-center mt-1.5">
              <Input
                type="number"
                value={packageData.monthly}
                onChange={(e) => onPriceChange(type, 'monthly', e.target.value)}
                className="max-w-[200px]"
                step="0.01"
              />
              <span className="ml-2 text-muted-foreground">/maand</span>
            </div>
          </div>
          
          <div>
            <Label>Jaarlijks tarief (€)</Label>
            <div className="flex items-center mt-1.5">
              <Input
                type="number"
                value={packageData.yearly}
                onChange={(e) => onPriceChange(type, 'yearly', e.target.value)}
                className="max-w-[200px]"
                step="0.01"
              />
              <span className="ml-2 text-muted-foreground">/jaar</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div>
            <Label>Proefperiode</Label>
            <div className="flex items-center mt-1.5">
              <Input
                type="number"
                value={packageData.trialDays}
                onChange={(e) => onPriceChange(type, 'trialDays', e.target.value)}
                className="max-w-[100px]"
              />
              <span className="ml-2 text-muted-foreground">dagen</span>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Korting</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Input
                  type="number"
                  value={packageData.discount.percentage}
                  onChange={(e) => onPriceChange(type, 'percentage', e.target.value)}
                  className="max-w-[80px]"
                />
                <span className="ml-2 text-muted-foreground">%</span>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={packageData.discount.validDays}
                  onChange={(e) => onPriceChange(type, 'validDays', e.target.value)}
                  className="max-w-[80px]"
                />
                <span className="ml-2 text-muted-foreground">dagen geldig</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { PackageFeature } from './types';

interface FeaturesTableProps {
  features: PackageFeature[];
  onFeatureToggle: (featureId: string, packageType: 'starter' | 'professional' | 'enterprise') => void;
}

export function FeaturesTable({ features, onFeatureToggle }: FeaturesTableProps) {
  return (
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
  );
}



import { useState } from 'react';
import { PackageData, PackageFeature } from './types';
import { useToast } from '@/hooks/use-toast';

export function usePackageManagement() {
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

  return {
    packages,
    features,
    handlePriceChange,
    handleFeatureToggle,
    handleSave
  };
}



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
    { id: "1", name: "Lead management", category: "leads", starter: true, professional: true, enterprise: true, description: "Basis lead registratie en beheer" },
    { id: "2", name: "Email ondersteuning", category: "support", starter: true, professional: true, enterprise: true },
    { id: "3", name: "Basis rapportages", category: "general", starter: true, professional: true, enterprise: true },
    { id: "4", name: "Team agenda beheer", category: "appointments", starter: false, professional: true, enterprise: true, description: "Beheer van afspraken voor het hele team" },
    { id: "5", name: "API toegang", category: "general", starter: false, professional: false, enterprise: true, description: "Programmatische toegang tot al uw data" },
    { id: "6", name: "Prioriteit support", category: "support", starter: false, professional: true, enterprise: true },
    { id: "7", name: "Offerte generator", category: "quotes", starter: true, professional: true, enterprise: true },
    { id: "8", name: "Digitale handtekening", category: "quotes", starter: false, professional: true, enterprise: true },
    { id: "9", name: "Route optimalisatie", category: "appointments", starter: false, professional: true, enterprise: true },
    { id: "10", name: "Projectbeheer", category: "projects", starter: true, professional: true, enterprise: true },
    { id: "11", name: "Factuurgeneratie", category: "invoices", starter: true, professional: true, enterprise: true },
    { id: "12", name: "Materiaalplanning", category: "projects", starter: false, professional: true, enterprise: true },
    { id: "13", name: "Automatische herinneringen", category: "general", starter: false, professional: true, enterprise: true },
    { id: "14", name: "Geavanceerde rapportages", category: "general", starter: false, professional: false, enterprise: true },
    { id: "15", name: "Community toegang", category: "community", starter: true, professional: true, enterprise: true, description: "Basis toegang tot de community" },
    { id: "16", name: "Community berichten", category: "community", starter: true, professional: true, enterprise: true, description: "Mogelijkheid om berichten te plaatsen" },
    { id: "17", name: "Project delen in community", category: "community", starter: false, professional: true, enterprise: true, description: "Mogelijkheid om projecten te delen met de community" },
    { id: "18", name: "Community zoekfunctie", category: "community", starter: false, professional: true, enterprise: true, description: "Uitgebreide zoekfunctie binnen de community" },
    { id: "19", name: "Juridisch advies", category: "community", starter: false, professional: false, enterprise: true, description: "Toegang tot juridisch advies via de community" },
    { id: "20", name: "Personeel werven via community", category: "community", starter: false, professional: true, enterprise: true, description: "Vacatures plaatsen in de community" },
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
  
  const handleAddFeature = (newFeature: Omit<PackageFeature, 'id'>) => {
    // Generate a new ID (simple implementation)
    const newId = String(features.length + 1);
    setFeatures(prev => [...prev, { id: newId, ...newFeature }]);
    
    toast({
      title: "Feature toegevoegd",
      description: `De feature "${newFeature.name}" is succesvol toegevoegd.`,
    });
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
    handleAddFeature,
    handleSave
  };
}

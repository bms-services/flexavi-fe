import { useState } from 'react';
import { PackageData, PackageFeature } from './types';

export function usePackageManagement() {
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
    { id: "1", name: "Dashboard", category: "general", starter: true, professional: true, enterprise: true, description: "Eigen dashboard met direct inzicht in alle cijfers" },
    { id: "2", name: "Lead overzicht", category: "leads", starter: true, professional: true, enterprise: true, description: "Overzicht van alle leads & klanten met uitgebreide filteropties" },
    { id: "3", name: "Automatische lead integratie", category: "leads", starter: false, professional: true, enterprise: true, description: "Automatische koppeling met leadproviders" },
    { id: "4", name: "Lead profiel", category: "leads", starter: true, professional: true, enterprise: true, description: "Uitgebreid lead profiel met WOZ info, streetview en documenten" },
    { id: "5", name: "WOZ Informatie", category: "leads", starter: false, professional: true, enterprise: true, description: "WOZ informatie van objecten" },
    { id: "6", name: "Pijplijn", category: "general", starter: true, professional: true, enterprise: true, description: "Kant en klare pijplijnen voor leadbeheer" },
    { id: "7", name: "Planning", category: "appointments", starter: true, professional: true, enterprise: true, description: "Overzichtelijke planning met locatie-gebaseerde planning" },
    { id: "8", name: "Route optimalisatie", category: "appointments", starter: false, professional: true, enterprise: true, description: "Automatische route optimalisatie voor teams" },
    { id: "9", name: "PDF Werklijst", category: "appointments", starter: true, professional: true, enterprise: true, description: "Exporteer werklijsten naar PDF" },
    { id: "10", name: "Dag planning", category: "appointments", starter: false, professional: true, enterprise: true, description: "Digitale dagplanning voor personeel" },
    { id: "11", name: "AI Foto verwerking", category: "general", starter: false, professional: false, enterprise: true, description: "AI-gestuurde verwerking van documenten" },
    { id: "12", name: "Werknemers", category: "employees", starter: true, professional: true, enterprise: true, description: "Beheer van werknemers, tarieven en planning" },
    { id: "13", name: "Producten", category: "products", starter: true, professional: true, enterprise: true, description: "Vooraf ingestelde producten en diensten" },
    { id: "14", name: "Offertes", category: "quotes", starter: true, professional: true, enterprise: true, description: "Snel offertes maken en versturen" },
    { id: "15", name: "Facturen", category: "invoices", starter: true, professional: true, enterprise: true, description: "Snel facturen maken en versturen" },
    { id: "16", name: "Werkovereenkomsten", category: "agreements", starter: false, professional: true, enterprise: true, description: "Juridisch waterdichte werkovereenkomsten" },
    { id: "17", name: "Kosten", category: "expenses", starter: true, professional: true, enterprise: true, description: "AI-gestuurde verwerking van bonnetjes en facturen" },
    { id: "18", name: "Projecten", category: "projects", starter: true, professional: true, enterprise: true, description: "Uitgebreid projectbeheer met winstberekening" },
    { id: "19", name: "Calculator", category: "projects", starter: false, professional: true, enterprise: true, description: "Geavanceerde calculator voor grote klussen" },
    { id: "20", name: "Reputatiemanagement", category: "reputation", starter: false, professional: true, enterprise: true, description: "Geautomatiseerd reviews verzamelen" },
    { id: "21", name: "Request Idee", category: "general", starter: true, professional: true, enterprise: true, description: "Stem op nieuwe functionaliteiten" },
    { id: "22", name: "Partners", category: "partners", starter: true, professional: true, enterprise: true, description: "Toegang tot partnerkortingen" },
    { id: "23", name: "Community", category: "community", starter: false, professional: true, enterprise: true, description: "Toegang tot de Flexavi community" },
    { id: "24", name: "Support", category: "support", starter: true, professional: true, enterprise: true, description: "Support van ma t/m vr" }
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
    
    
  };

  const handleSave = () => {
   
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


import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Home, Info, Building, Square, CalendarRange } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WozValueCardProps {
  address: string;
}

interface PropertyInfo {
  wozValue: string | null;
  propertyType: string;
  buildYear: number;
  livingArea: number;
  lastAssessmentDate: string;
}

export const WozValueCard: React.FC<WozValueCardProps> = ({ address }) => {
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for property information
    const fetchPropertyInfo = async () => {
      setLoading(true);
      try {
        // Fake API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock property data
        const mockPropertyInfo: PropertyInfo = {
          wozValue: new Intl.NumberFormat('nl-NL', { 
            style: 'currency', 
            currency: 'EUR' 
          }).format(Math.floor(Math.random() * 600000) + 200000),
          propertyType: "Vrijstaande woning",
          buildYear: Math.floor(Math.random() * (2023 - 1960) + 1960),
          livingArea: Math.floor(Math.random() * (250 - 80) + 80),
          lastAssessmentDate: "2024-01-01",
        };
        
        setPropertyInfo(mockPropertyInfo);
      } catch (error) {
        console.error("Error fetching property info:", error);
        setPropertyInfo(null);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchPropertyInfo();
    }
  }, [address]);

  if (loading) {
    return (
      <Card className="p-4">
        <div className="space-y-4">
          <div className="h-6 animate-pulse bg-gray-200 rounded-md" />
          <div className="h-24 animate-pulse bg-gray-200 rounded-md" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-medium flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          WOZ Waarde & Objectgegevens
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">De WOZ-waarde is de waarde die de gemeente aan een pand toekent als grondslag voor gemeentelijke belastingen.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h3>
      </div>

      {propertyInfo ? (
        <div className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="text-2xl font-bold text-primary">{propertyInfo.wozValue}</div>
            <p className="text-xs text-muted-foreground mt-1">Peildatum: {new Date(propertyInfo.lastAssessmentDate).toLocaleDateString('nl-NL')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Type Woning</p>
                <p className="text-sm text-muted-foreground">{propertyInfo.propertyType}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CalendarRange className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Bouwjaar</p>
                <p className="text-sm text-muted-foreground">{propertyInfo.buildYear}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Square className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Woonoppervlakte</p>
                <p className="text-sm text-muted-foreground">{propertyInfo.livingArea} m²</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Home className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Adres</p>
                <p className="text-sm text-muted-foreground">{address}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground">
          WOZ waarde en objectgegevens niet beschikbaar
        </div>
      )}
    </Card>
  );
};

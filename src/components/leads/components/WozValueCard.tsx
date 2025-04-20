
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Home, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WozValueCardProps {
  address: string;
}

export const WozValueCard: React.FC<WozValueCardProps> = ({ address }) => {
  const [wozValue, setWozValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuleer een API call voor WOZ waarde
    // In een echte implementatie zou je hier de WOZ API aanroepen
    const fetchWozValue = async () => {
      setLoading(true);
      try {
        // Fake API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Genereer een willekeurige WOZ waarde tussen 200.000 en 800.000
        const randomWozValue = Math.floor(Math.random() * 600000) + 200000;
        setWozValue(new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(randomWozValue));
      } catch (error) {
        console.error("Error fetching WOZ value:", error);
        setWozValue(null);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchWozValue();
    }
  }, [address]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-md font-medium flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          WOZ Waarde
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
      <div className="p-2">
        {loading ? (
          <div className="h-10 animate-pulse bg-gray-200 rounded-md"></div>
        ) : wozValue ? (
          <div className="text-2xl font-bold text-primary">{wozValue}</div>
        ) : (
          <div className="text-muted-foreground">WOZ waarde niet beschikbaar</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">Adres: {address}</p>
      </div>
    </Card>
  );
};

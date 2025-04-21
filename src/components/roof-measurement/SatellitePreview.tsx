
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Satellite, Search, Image, ArrowDown } from "lucide-react";

interface SatellitePreviewProps {
  address: string;
  onAddressChange: (address: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export function SatellitePreview({
  address,
  onAddressChange,
  onSearch,
  isLoading = false,
}: SatellitePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // In a real implementation, this would fetch a real satellite image
  // For now, we'll simulate this with a fake loading state
  const handleDemoSearch = () => {
    if (!address.trim()) return;
    
    onSearch();
    
    // Simulate a loading state
    setPreviewUrl(null);
    
    // After a delay, set a placeholder image
    setTimeout(() => {
      // This is just a placeholder image URL - in a real implementation, 
      // this would be an actual satellite image API
      setPreviewUrl("https://placehold.co/600x400/e2e8f0/475569?text=Satellite+View");
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Satellite className="mr-2 h-5 w-5" />
          Satellietbeeld
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Voer een adres in"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
            />
            <Button onClick={handleDemoSearch} disabled={isLoading || !address.trim()}>
              <Search className="mr-2 h-4 w-4" />
              Zoeken
            </Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            {isLoading ? (
              <div className="h-[250px] flex flex-col items-center justify-center bg-muted">
                <Satellite className="h-8 w-8 mb-2 animate-pulse text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Satellietbeeld laden...</p>
              </div>
            ) : previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Satellietbeeld"
                  className="w-full h-[250px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>{address}</span>
                    <Button variant="ghost" size="sm" className="h-8 text-white hover:text-white hover:bg-black/20">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      Meting genereren
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[250px] flex flex-col items-center justify-center bg-muted">
                <Image className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Voer een adres in en klik op Zoeken om een satellietbeeld te laden
                </p>
              </div>
            )}
          </div>
          
          {previewUrl && (
            <div className="rounded-md bg-muted p-3">
              <h4 className="text-sm font-medium mb-2">AI Analyse Resultaat:</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Geschat dakoppervlak:</p>
                  <p className="font-medium">95 m²</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Geschatte hellingshoek:</p>
                  <p className="font-medium">35°</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Waarschijnlijke dakbedekking:</p>
                  <p className="font-medium">Dakpannen</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Geschatte conditie:</p>
                  <p className="font-medium">Redelijk</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Deze resultaten zijn gegenereerd door AI en dienen als schatting. Voor exacte gegevens is een inspectie ter plaatse nodig.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

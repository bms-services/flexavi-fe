
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LeadLocationMapProps {
  address: string;
}

export const LeadLocationMap: React.FC<LeadLocationMapProps> = ({ address }) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateMapUrl = () => {
      setLoading(true);
      try {
        // Maak een Google Maps embed URL met het adres
        const encodedAddress = encodeURIComponent(address);
        setMapUrl(`https://www.google.com/maps/embed/v1/place?key=DEMO_KEY&q=${encodedAddress}`);
      } catch (error) {
        console.error("Error generating map URL:", error);
        setMapUrl(null);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      generateMapUrl();
    }
  }, [address]);

  return (
    <Card className="p-4">
      <h3 className="text-md font-medium flex items-center gap-2 mb-2">
        <MapPin className="h-5 w-5 text-primary" />
        Locatie
      </h3>
      <div className="aspect-video bg-muted rounded-md overflow-hidden">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-gray-200"></div>
        ) : mapUrl ? (
          <div className="relative h-full w-full">
            {/* In a real implementation, use the Google Maps API key */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <p className="text-center p-4">
                <span className="block mb-2 text-primary font-semibold">Google Maps zou hier getoond worden</span>
                <span className="text-sm text-muted-foreground">{address}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-muted-foreground">Kan locatie niet laden</p>
          </div>
        )}
      </div>
    </Card>
  );
};

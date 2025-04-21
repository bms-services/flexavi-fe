
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RoofMeasurement } from "@/types/roof-measurement";
import { Edit, Trash, MapPin } from "lucide-react";

interface RoofMeasurementCardProps {
  measurement: RoofMeasurement;
  onEdit: (measurement: RoofMeasurement) => void;
  onDelete: (id: string) => void;
}

const materialLabels = {
  tiles: "Dakpannen",
  slate: "Leisteen",
  metal: "Metaal",
  flat: "Plat dak",
  shingles: "Shingles",
  unknown: "Onbekend",
};

const conditionLabels = {
  excellent: "Uitstekend",
  good: "Goed",
  fair: "Redelijk",
  poor: "Matig",
  critical: "Kritiek",
};

const conditionColors = {
  excellent: "bg-green-100 text-green-800",
  good: "bg-green-100 text-green-800",
  fair: "bg-yellow-100 text-yellow-800",
  poor: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

export function RoofMeasurementCard({
  measurement,
  onEdit,
  onDelete,
}: RoofMeasurementCardProps) {
  const formattedDate = new Date(measurement.createdAt).toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold truncate">
              {measurement.address}
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            </CardDescription>
          </div>
          <Badge className={conditionColors[measurement.condition]}>
            {conditionLabels[measurement.condition]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Oppervlak:</p>
            <p className="font-medium">{measurement.area} m²</p>
          </div>
          <div>
            <p className="text-muted-foreground">Hellingshoek:</p>
            <p className="font-medium">{measurement.pitch}°</p>
          </div>
          <div>
            <p className="text-muted-foreground">Dakbedekking:</p>
            <p className="font-medium">{materialLabels[measurement.materialType]}</p>
          </div>
        </div>
        {measurement.notes && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-muted-foreground text-sm">Notities:</p>
            <p className="text-sm mt-1">{measurement.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onEdit(measurement)}>
          <Edit className="h-4 w-4 mr-2" />
          Bewerken
        </Button>
        <Button variant="outline" size="sm" className="text-destructive" onClick={() => onDelete(measurement.id)}>
          <Trash className="h-4 w-4 mr-2" />
          Verwijderen
        </Button>
      </CardFooter>
    </Card>
  );
}


import React from "react";
import { RoofMeasurement } from "@/types/roof-measurement";
import { RoofMeasurementCard } from "./RoofMeasurementCard";

interface RoofMeasurementListProps {
  measurements: RoofMeasurement[];
  onEdit: (measurement: RoofMeasurement) => void;
  onDelete: (id: string) => void;
}

export function RoofMeasurementList({
  measurements,
  onEdit,
  onDelete,
}: RoofMeasurementListProps) {
  if (measurements.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-background">
        <p className="text-muted-foreground">
          Geen dakmetingen gevonden. Voeg een nieuwe dakmeting toe.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {measurements.map((measurement) => (
        <RoofMeasurementCard
          key={measurement.id}
          measurement={measurement}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

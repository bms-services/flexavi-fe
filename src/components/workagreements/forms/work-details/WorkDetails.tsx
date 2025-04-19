
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WorkDetailsProps {
  description: string;
  workDescription: string;
  warranty: string;
  startDate: string;
  onFieldChange: (field: string, value: string) => void;
}

export const WorkDetails: React.FC<WorkDetailsProps> = ({
  description,
  workDescription,
  warranty,
  startDate,
  onFieldChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="description">Omschrijving</Label>
        <Input
          id="description"
          value={description}
          onChange={e => onFieldChange("description", e.target.value)}
          placeholder="Bijv. Dakrenovatie en isolatie - Werkovereenkomst"
        />
      </div>
      
      <div>
        <Label htmlFor="workDescription">Beschrijving werkzaamheden</Label>
        <Textarea
          id="workDescription"
          value={workDescription}
          onChange={e => onFieldChange("workDescription", e.target.value)}
          placeholder="Beschrijf de uit te voeren werkzaamheden"
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="warranty">Garantie (jaren)</Label>
          <Input
            id="warranty"
            type="number"
            min="0"
            max="30"
            value={warranty}
            onChange={e => onFieldChange("warranty", e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="startDate">Startdatum</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate ? new Date(startDate).toISOString().split('T')[0] : ''}
            onChange={e => onFieldChange("startDate", new Date(e.target.value).toISOString())}
          />
        </div>
      </div>
    </div>
  );
};

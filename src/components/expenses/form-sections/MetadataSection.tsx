
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export const MetadataSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">
          Datum <span className="text-red-500">*</span>
        </Label>

      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type uitgave</Label>
        <Select
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecteer type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"asd"}>
              Asdasd
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectId">Project (optioneel)</Label>
        <Select
        >
          <SelectTrigger>
            <SelectValue placeholder="Koppel aan project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Geen project</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notities</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Aanvullende notities voor deze uitgave..."
        />
      </div>
    </div>
  );
};

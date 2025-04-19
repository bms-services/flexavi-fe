
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuoteStatus } from "@/types";

interface QuoteDetailsFormProps {
  description: string;
  location: string;
  plannedStartDate: string;
  status: QuoteStatus;
  notes: string;
  onFieldChange: (field: string, value: string) => void;
}

export const QuoteDetailsForm: React.FC<QuoteDetailsFormProps> = ({
  description,
  location,
  plannedStartDate,
  status,
  notes,
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
          placeholder="Bijv. Dakrenovatie en isolatie"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Locatie</Label>
          <Input
            id="location"
            value={location}
            onChange={e => onFieldChange("location", e.target.value)}
            placeholder="Bijv. Amsterdam, Prinsengracht 123"
          />
        </div>
        
        <div>
          <Label htmlFor="plannedStartDate">Geplande startdatum</Label>
          <Input
            id="plannedStartDate"
            type="date"
            value={plannedStartDate ? new Date(plannedStartDate).toISOString().split('T')[0] : ''}
            onChange={e => onFieldChange("plannedStartDate", new Date(e.target.value).toISOString())}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(value: QuoteStatus) => onFieldChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecteer een status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Concept</SelectItem>
            <SelectItem value="sent">Verzonden</SelectItem>
            <SelectItem value="accepted">Geaccepteerd</SelectItem>
            <SelectItem value="rejected">Afgewezen</SelectItem>
            <SelectItem value="revised">Herzien</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="notes">Notities</Label>
        <Textarea
          id="notes"
          value={notes || ""}
          onChange={e => onFieldChange("notes", e.target.value)}
          placeholder="Interne notities voor deze offerte"
          rows={3}
        />
      </div>
    </div>
  );
};

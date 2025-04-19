
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
import { InvoiceStatus } from "@/types";

interface InvoiceDetailsFormProps {
  description: string;
  location?: string;
  dueDate: string;
  paymentDate?: string;
  status: InvoiceStatus;
  notes?: string;
  onFieldChange: (field: string, value: string) => void;
}

export const InvoiceDetailsForm: React.FC<InvoiceDetailsFormProps> = ({
  description,
  location,
  dueDate,
  paymentDate,
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
          placeholder="Bijv. Factuur dakrenovatie"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Locatie</Label>
          <Input
            id="location"
            value={location || ""}
            onChange={e => onFieldChange("location", e.target.value)}
            placeholder="Bijv. Amsterdam, Prinsengracht 123"
          />
        </div>
        
        <div>
          <Label htmlFor="dueDate">Vervaldatum</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''}
            onChange={e => onFieldChange("dueDate", new Date(e.target.value).toISOString())}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="paymentDate">Betaaldatum</Label>
          <Input
            id="paymentDate"
            type="date"
            value={paymentDate ? new Date(paymentDate).toISOString().split('T')[0] : ''}
            onChange={e => onFieldChange("paymentDate", e.target.value ? new Date(e.target.value).toISOString() : '')}
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={(value: InvoiceStatus) => onFieldChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Concept</SelectItem>
              <SelectItem value="sent">Verzonden</SelectItem>
              <SelectItem value="paid">Betaald</SelectItem>
              <SelectItem value="overdue">Verlopen</SelectItem>
              <SelectItem value="canceled">Geannuleerd</SelectItem>
              <SelectItem value="collection">Bij deurwaarder</SelectItem>
              <SelectItem value="legal">Rechtzaak</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="notes">Notities</Label>
        <Textarea
          id="notes"
          value={notes || ""}
          onChange={e => onFieldChange("notes", e.target.value)}
          placeholder="Interne notities voor deze factuur"
          rows={3}
        />
      </div>
    </div>
  );
};

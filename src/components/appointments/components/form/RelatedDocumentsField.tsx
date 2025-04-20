
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lead } from "@/types";

interface RelatedDocumentsFieldProps {
  customer: Lead | null;
}

export const RelatedDocumentsField: React.FC<RelatedDocumentsFieldProps> = ({
  customer,
}) => {
  if (!customer) return null;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Gerelateerde documenten</label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecteer een document" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="document1">Document 1</SelectItem>
          <SelectItem value="document2">Document 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

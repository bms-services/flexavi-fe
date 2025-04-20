
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkAgreementStatus } from "@/types";

interface StatusSelectProps {
  status: WorkAgreementStatus;
  onStatusChange: (value: WorkAgreementStatus) => void;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  status,
  onStatusChange,
}) => {
  return (
    <div>
      <Label htmlFor="status">Status</Label>
      <Select
        value={status}
        onValueChange={(value: WorkAgreementStatus) => onStatusChange(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecteer een status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Concept</SelectItem>
          <SelectItem value="sent">Verstuurd</SelectItem>
          <SelectItem value="in_review">In revisie</SelectItem>
          <SelectItem value="signed">Ondertekend</SelectItem>
          <SelectItem value="rejected">Geweigerd</SelectItem>
          <SelectItem value="expired">Verlopen</SelectItem>
          <SelectItem value="completed">Afgerond</SelectItem>
          <SelectItem value="cancelled">Geannuleerd</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

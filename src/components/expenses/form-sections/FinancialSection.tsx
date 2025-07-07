
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export const FinancialSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">
            Bedrag (excl. BTW) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vatRate">BTW percentage</Label>
          <Select
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecteer BTW" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0%</SelectItem>
              <SelectItem value="9">9%</SelectItem>
              <SelectItem value="21">21%</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vatAmount">BTW bedrag</Label>
          <Input
            id="vatAmount"
            name="vatAmount"
            type="number"
            step="0.01"

            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalAmount">Totaalbedrag (incl. BTW)</Label>
          <Input
            id="totalAmount"
            name="totalAmount"
            type="number"
            step="0.01"
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

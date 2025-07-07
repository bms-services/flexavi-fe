
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export const BasicInfoSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company">
          Bedrijf <span className="text-red-500">*</span>
        </Label>
        <Input
          id="company"
          name="company"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Omschrijving <span className="text-red-500">*</span>
        </Label>
        <Input
          id="description"
          name="description"
          required
        />
      </div>
    </div>
  );
};

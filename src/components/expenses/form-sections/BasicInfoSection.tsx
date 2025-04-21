
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoSectionProps {
  company: string;
  description: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  company,
  description,
  onInputChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company">
          Bedrijf <span className="text-red-500">*</span>
        </Label>
        <Input
          id="company"
          name="company"
          value={company}
          onChange={onInputChange}
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
          value={description}
          onChange={onInputChange}
          required
        />
      </div>
    </div>
  );
};

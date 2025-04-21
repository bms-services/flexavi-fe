
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ReceiptSectionProps {
  isEditing: boolean;
}

export const ReceiptSection: React.FC<ReceiptSectionProps> = ({ isEditing }) => {
  const receiptOptions = [
    { id: "no-receipt", label: "Geen bon" },
    { id: "upload-receipt", label: "Bon uploaden" },
    { id: "later-receipt", label: "Bon later uploaden" },
  ];

  if (isEditing) {
    return null;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Label>Bon toevoegen</Label>
          <RadioGroup
            defaultValue="no-receipt"
            className="flex flex-col space-y-2"
          >
            {receiptOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 border rounded-md p-3"
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

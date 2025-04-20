
import React from "react";
import { Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WarrantySectionProps {
  warranty: string;
}

export const WarrantySection: React.FC<WarrantySectionProps> = ({ warranty }) => {
  return (
    <Card className="p-4 border-l-4 border-l-primary/80">
      <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        Garantie
      </h3>
      <p className="text-gray-700">{warranty}</p>
    </Card>
  );
};


import React from "react";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WorkDescriptionProps {
  description: string;
}

export const WorkDescription: React.FC<WorkDescriptionProps> = ({ description }) => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
        <Info className="h-4 w-4" />
        Beschrijving Werkzaamheden
      </h3>
      <p className="whitespace-pre-line">{description}</p>
    </Card>
  );
};

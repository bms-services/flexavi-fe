
import React from "react";
import { Card } from "@/components/ui/card";

interface ExclusionsCardProps {
  exclusions: string[];
}

export const ExclusionsCard: React.FC<ExclusionsCardProps> = ({ exclusions }) => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Uitsluitingen</h3>
      <ul className="list-disc pl-5 space-y-1">
        {exclusions.map((exclusion, index) => (
          <li key={index}>{exclusion}</li>
        ))}
      </ul>
    </Card>
  );
};

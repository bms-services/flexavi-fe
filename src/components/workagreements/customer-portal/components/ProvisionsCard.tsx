
import React from "react";
import { Card } from "@/components/ui/card";

interface ProvisionsCardProps {
  provisions: string[];
}

export const ProvisionsCard: React.FC<ProvisionsCardProps> = ({ provisions }) => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Voorzieningen door Opdrachtgever</h3>
      <ul className="list-disc pl-5 space-y-1">
        {provisions.map((provision, index) => (
          <li key={index}>{provision}</li>
        ))}
      </ul>
    </Card>
  );
};


import React from "react";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

interface WorkOrderDetailsProps {
  description: string;
  customerNotes?: string;
}

export const WorkOrderDetails: React.FC<WorkOrderDetailsProps> = ({
  description,
  customerNotes,
}) => {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
          <Info className="h-4 w-4" />
          Werkzaamheden
        </h3>
        <p className="whitespace-pre-line">{description}</p>
      </Card>

      {customerNotes && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Klant notities
          </h3>
          <p className="whitespace-pre-line">{customerNotes}</p>
        </Card>
      )}
    </div>
  );
};

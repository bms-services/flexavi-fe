
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface WorkOrderHeaderProps {
  workOrderId: string;
  status: string;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "planned":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Gepland</Badge>;
    case "in_progress":
      return <Badge className="bg-blue-500 hover:bg-blue-600">In Uitvoering</Badge>;
    case "completed":
      return <Badge className="bg-green-500 hover:bg-green-600">Afgerond</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const WorkOrderHeader: React.FC<WorkOrderHeaderProps> = ({ workOrderId, status }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Terug
      </Button>
      {getStatusBadge(status)}
    </div>
  );
};


import React from "react";
import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/types/project";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

export const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({ status }) => {
  const getVariant = () => {
    switch (status) {
      case "active":
        return "bg-green-500 hover:bg-green-600";
      case "completed":
        return "bg-blue-500 hover:bg-blue-600";
      case "on-hold":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "cancelled":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "active":
        return "Actief";
      case "completed":
        return "Afgerond";
      case "on-hold":
        return "On hold";
      case "cancelled":
        return "Geannuleerd";
      default:
        return status;
    }
  };

  return (
    <Badge className={getVariant()}>
      {getLabel()}
    </Badge>
  );
};

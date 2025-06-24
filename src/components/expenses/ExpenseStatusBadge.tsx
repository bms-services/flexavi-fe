
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/format";
import { ExpenseStatus } from "@/types/expenses";

interface ExpenseStatusBadgeProps {
  status: ExpenseStatus;
}

export const ExpenseStatusBadge: React.FC<ExpenseStatusBadgeProps> = ({ status }) => {
  const getVariant = (status: ExpenseStatus): "default" | "outline" | "secondary" | "destructive" => {
    switch (status) {
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      case "pending":
        return "secondary";
      case "processed":
        return "outline";
      case "draft":
      default:
        return "outline";
    }
  };

  const getLabel = (status: ExpenseStatus): string => {
    switch (status) {
      case "approved":
        return "Goedgekeurd";
      case "rejected":
        return "Afgekeurd";
      case "pending":
        return "In behandeling";
      case "processed":
        return "Verwerkt";
      case "draft":
        return "Concept";
      default:
        return status;
    }
  };

  const getClassName = (status: ExpenseStatus): string => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "processed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "draft":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "";
    }
  };

  return (
    <Badge
      variant={getVariant(status)}
      className={cn("text-xs font-medium", getClassName(status))}
    >
      {getLabel(status)}
    </Badge>
  );
};

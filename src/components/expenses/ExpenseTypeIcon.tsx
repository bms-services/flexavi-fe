
import React from "react";
import { 
  Truck, Box, Wrench, Users, FileText, 
  TruckIcon, PackageIcon, WrenchIcon, UsersIcon, FileTextIcon
} from "lucide-react";
import { ExpenseType } from "@/types/expenses";

interface ExpenseTypeIconProps {
  type: ExpenseType;
  className?: string;
  size?: number;
}

export const ExpenseTypeIcon: React.FC<ExpenseTypeIconProps> = ({ 
  type, 
  className = "",
  size = 16
}) => {
  const getIcon = () => {
    switch (type) {
      case "transport":
        return <Truck size={size} className={className} />;
      case "material":
        return <Box size={size} className={className} />;
      case "equipment":
        return <Wrench size={size} className={className} />;
      case "subcontractor":
        return <Users size={size} className={className} />;
      case "other":
      default:
        return <FileText size={size} className={className} />;
    }
  };

  return getIcon();
};

export const getTypeLabel = (type: ExpenseType): string => {
  switch (type) {
    case "transport": return "Transport";
    case "material": return "Materiaal";
    case "equipment": return "Gereedschap";
    case "subcontractor": return "Onderaannemer";
    case "other": return "Overig";
    default: return "Onbekend";
  }
};

export const getTypeColor = (type: ExpenseType): string => {
  switch (type) {
    case "transport": return "text-blue-500";
    case "material": return "text-green-500";
    case "equipment": return "text-yellow-500";
    case "subcontractor": return "text-purple-500";
    case "other": return "text-gray-500";
    default: return "text-gray-500";
  }
};

export const getTypeBgColor = (type: ExpenseType): string => {
  switch (type) {
    case "transport": return "bg-blue-100";
    case "material": return "bg-green-100";
    case "equipment": return "bg-yellow-100";
    case "subcontractor": return "bg-purple-100";
    case "other": return "bg-gray-100";
    default: return "bg-gray-100";
  }
};

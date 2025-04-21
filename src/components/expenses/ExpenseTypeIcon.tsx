
import React from "react";
import { 
  Box, FileText, Wrench, Users, 
  Receipt, ShoppingCart, Briefcase, 
  DollarSign, Menu, CreditCard, Euro 
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
      case "material":
        return <Box size={size} className={className} />;
      case "transport":
        return <ShoppingCart size={size} className={className} />;
      case "equipment":
        return <Wrench size={size} className={className} />;
      case "subcontractor":
        return <Users size={size} className={className} />;
      case "office":
        return <Briefcase size={size} className={className} />;
      case "software":
        return <Menu size={size} className={className} />;
      case "marketing":
        return <Receipt size={size} className={className} />;
      case "training":
        return <DollarSign size={size} className={className} />;
      case "maintenance":
        return <Wrench size={size} className={className} />;
      case "utilities":
        return <Euro size={size} className={className} />;
      case "insurance":
        return <CreditCard size={size} className={className} />;
      case "other":
      default:
        return <FileText size={size} className={className} />;
    }
  };

  return getIcon();
};

export const getTypeLabel = (type: ExpenseType): string => {
  switch (type) {
    case "material": return "Materiaal";
    case "transport": return "Transport";
    case "equipment": return "Gereedschap";
    case "subcontractor": return "Onderaannemer";
    case "office": return "Kantoor";
    case "software": return "Software";
    case "marketing": return "Marketing";
    case "training": return "Training";
    case "maintenance": return "Onderhoud";
    case "utilities": return "Nutsvoorzieningen";
    case "insurance": return "Verzekeringen";
    case "other": return "Overig";
    default: return "Onbekend";
  }
};

export const getTypeColor = (type: ExpenseType): string => {
  switch (type) {
    case "material": return "text-green-500";
    case "transport": return "text-blue-500";
    case "equipment": return "text-yellow-500";
    case "subcontractor": return "text-purple-500";
    case "office": return "text-pink-500";
    case "software": return "text-indigo-500";
    case "marketing": return "text-orange-500";
    case "training": return "text-teal-500";
    case "maintenance": return "text-amber-500";
    case "utilities": return "text-cyan-500";
    case "insurance": return "text-rose-500";
    case "other": return "text-gray-500";
    default: return "text-gray-500";
  }
};

export const getTypeBgColor = (type: ExpenseType): string => {
  switch (type) {
    case "material": return "bg-green-100";
    case "transport": return "bg-blue-100";
    case "equipment": return "bg-yellow-100";
    case "subcontractor": return "bg-purple-100";
    case "office": return "bg-pink-100";
    case "software": return "bg-indigo-100";
    case "marketing": return "bg-orange-100";
    case "training": return "bg-teal-100";
    case "maintenance": return "bg-amber-100";
    case "utilities": return "bg-cyan-100";
    case "insurance": return "bg-rose-100";
    case "other": return "bg-gray-100";
    default: return "bg-gray-100";
  }
};


import React from "react";
import { 
  Box, FileText, Wrench, Users, 
  Receipt, ShoppingCart, Briefcase, 
  DollarSign, Menu, CreditCard, Euro 
} from "lucide-react";
import { ExpenseType } from "@/types/expenses";
import { 
  getTypeIconName, 
  getTypeLabel, 
  getTypeColor, 
  getTypeBgColor 
} from "@/utils/expenseUtils";

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
  // Render the appropriate icon based on the type
  const renderIcon = () => {
    const iconName = getTypeIconName(type);
    
    switch (iconName) {
      case "Box":
        return <Box size={size} className={className} />;
      case "ShoppingCart":
        return <ShoppingCart size={size} className={className} />;
      case "Wrench":
        return <Wrench size={size} className={className} />;
      case "Users":
        return <Users size={size} className={className} />;
      case "Briefcase":
        return <Briefcase size={size} className={className} />;
      case "Menu":
        return <Menu size={size} className={className} />;
      case "Receipt":
        return <Receipt size={size} className={className} />;
      case "DollarSign":
        return <DollarSign size={size} className={className} />;
      case "Euro":
        return <Euro size={size} className={className} />;
      case "CreditCard":
        return <CreditCard size={size} className={className} />;
      case "FileText":
      default:
        return <FileText size={size} className={className} />;
    }
  };

  return renderIcon();
};

// Re-export the utility functions so existing imports don't break
export { getTypeLabel, getTypeColor, getTypeBgColor };

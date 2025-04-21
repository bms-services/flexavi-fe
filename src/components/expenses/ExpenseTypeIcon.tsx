
import React from "react";
import { 
  Box, FileText, Wrench, Users, 
  Receipt, ShoppingCart, Briefcase, 
  DollarSign, Menu, CreditCard, Euro 
} from "lucide-react";
import { ExpenseType } from "@/types/expenses";
import { 
  getTypeIcon, 
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
  return getTypeIcon(type, size, className);
};

// Re-export the utility functions so existing imports don't break
export { getTypeLabel, getTypeColor, getTypeBgColor };

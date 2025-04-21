
import { ExpenseType } from "@/types/expenses";

/**
 * Returns the icon name for a given expense type
 */
export const getTypeIconName = (type: ExpenseType): string => {
  switch (type) {
    case "material": return "Box";
    case "transport": return "ShoppingCart";
    case "equipment": return "Wrench";
    case "subcontractor": return "Users";
    case "office": return "Briefcase";
    case "software": return "Menu";
    case "marketing": return "Receipt";
    case "training": return "DollarSign";
    case "maintenance": return "Wrench";
    case "utilities": return "Euro";
    case "insurance": return "CreditCard";
    case "other":
    default: return "FileText";
  }
};

/**
 * Returns the localized label for a given expense type
 */
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

/**
 * Returns the appropriate text color class for a given expense type
 */
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

/**
 * Returns the appropriate background color class for a given expense type
 */
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

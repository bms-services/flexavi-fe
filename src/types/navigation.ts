
import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon?: LucideIcon;  // Make the icon property optional
  children?: NavItem[];
}

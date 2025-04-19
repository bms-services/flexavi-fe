
import {
  Home,
  Users,
  Calendar,
  FileText,
  FileCheck,
  Package,
  Settings,
  Briefcase,
} from "lucide-react";
import { NavItem } from "@/types/navigation";

export const navigationItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Afspraken", href: "/appointments", icon: Calendar },
  { name: "Offertes", href: "/quotes", icon: FileText },
  { name: "Werkovereenkomsten", href: "/workagreements", icon: FileText },
  { name: "Projecten", href: "/projects", icon: Briefcase },
  { name: "Facturen", href: "/invoices", icon: FileCheck },
  { name: "Producten", href: "/products", icon: Package },
  { name: "Instellingen", href: "/settings", icon: Settings },
];

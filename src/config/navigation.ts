
import {
  Home,
  Users,
  Calendar,
  FileText,
  FileCheck,
  Package,
  Settings,
  Briefcase,
  Shield,
  Handshake,
  Receipt,
} from "lucide-react";
import { NavItem } from "@/types/navigation";

export const navigationItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Afspraken", href: "/appointments", icon: Calendar },
  {
    name: "Sales",
    href: "#",
    icon: Receipt,
    children: [
      { name: "Offertes", href: "/quotes", icon: FileText },
      { name: "Werkovereenkomsten", href: "/workagreements", icon: FileText },
      { name: "Facturen", href: "/invoices", icon: FileCheck },
    ],
  },
  { name: "Projecten", href: "/projects", icon: Briefcase },
  { name: "Producten", href: "/products", icon: Package },
  { name: "Partners", href: "/partners", icon: Handshake },
  { name: "Instellingen", href: "/settings", icon: Settings },
  { name: "Admin Dashboard", href: "/admin", icon: Shield },
];

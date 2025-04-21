
import {
  Home,
  Users,
  Calendar,
  Package,
  Settings,
  Briefcase,
  Shield,
  Handshake,
  Receipt,
  Route,
  Calculator,
  FileText,  // We'll use this as a generic fallback icon
} from "lucide-react";
import { NavItem } from "@/types/navigation";

export const navigationItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Planning", href: "/appointments", icon: Calendar },
  { name: "Medewerker", href: "/employee/planning", icon: Calendar },
  {
    name: "Sales",
    href: "#",
    icon: Receipt,
    children: [
      { name: "Offertes", href: "/quotes", icon: FileText },
      { name: "Werkovereenkomsten", href: "/workagreements", icon: FileText },
      { name: "Facturen", href: "/invoices", icon: FileText },
    ],
  },
  { name: "Projecten", href: "/projects", icon: Briefcase },
  { name: "Pijplijn", href: "/pipeline", icon: Route },
  { name: "Calculator", href: "/calculator", icon: Calculator },
  { name: "Producten", href: "/products", icon: Package },
  { name: "Partners", href: "/partners", icon: Handshake },
  { name: "Instellingen", href: "/settings", icon: Settings },
  { name: "Admin Dashboard", href: "/admin", icon: Shield },
];


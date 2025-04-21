
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
  UserCog,
  MessageSquare,
} from "lucide-react";
import { NavItem } from "@/types/navigation";

export const navigationItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Planning", href: "/appointments", icon: Calendar },
  { name: "Medewerker", href: "/employee/planning", icon: Calendar },
  { name: "Werknemers", href: "/employees", icon: UserCog },
  {
    name: "Sales",
    href: "#",
    icon: Receipt,
    children: [
      { name: "Offertes", href: "/quotes" },
      { name: "Werkovereenkomsten", href: "/workagreements" },
      { name: "Facturen", href: "/invoices" },
    ],
  },
  { name: "Projecten", href: "/projects", icon: Briefcase },
  { name: "Pijplijn", href: "/pipeline", icon: Route },
  { name: "Calculator", href: "/calculator", icon: Calculator },
  { name: "Producten", href: "/products", icon: Package },
  { name: "Partners", href: "/partners", icon: Handshake },
  { name: "Requests", href: "/requests", icon: MessageSquare },
  { name: "Instellingen", href: "/settings", icon: Settings },
  { name: "Admin Dashboard", href: "/admin", icon: Shield },
];

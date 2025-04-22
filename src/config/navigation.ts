
import {
  Home,
  Users,
  Calendar,
  Package,
  Settings,
  Briefcase,
  Shield,
  Receipt,
  Calculator,
  UserCog,
  MessageSquare,
  Star,
  FileText,
  FolderOpen,
} from "lucide-react";
import { NavItem } from "@/types/navigation";

export const navigationItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Leads", href: "/leads", icon: Users },
  {
    name: "Planning",
    href: "#",
    icon: Calendar,
    children: [
      { name: "Agenda", href: "/appointments" },
      { name: "Medewerker planning", href: "/employee/planning" },
      { name: "Werknemers", href: "/employees" },
    ],
  },
  {
    name: "Verkoop",
    href: "#",
    icon: Receipt,
    children: [
      { name: "Offertes", href: "/quotes" },
      { name: "Werkovereenkomsten", href: "/workagreements" },
      { name: "Facturen", href: "/invoices" },
      { name: "Kosten", href: "/expenses" },
      { name: "Calculator", href: "/calculator" },
    ],
  },
  {
    name: "Projecten & Partners",
    href: "#",
    icon: Briefcase,
    children: [
      { name: "Projecten", href: "/projects" },
      { name: "Pijplijn", href: "/pipeline" },
      { name: "Partners", href: "/partners" },
      { name: "Producten", href: "/products" },
    ],
  },
  {
    name: "Marketing",
    href: "#",
    icon: Star,
    children: [
      { name: "Reputatiebeheer", href: "/reputation" },
      { name: "Aanvragen", href: "/requests" },
    ],
  },
  { name: "Drive", href: "/drive", icon: FolderOpen },
  { name: "Instellingen", href: "/settings", icon: Settings },
  { name: "Admin Dashboard", href: "/admin", icon: Shield },
];

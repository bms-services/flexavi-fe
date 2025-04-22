
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
  Star,
  Lamp,
  HeadphonesIcon,
  MessageSquare,
  Book,
} from "lucide-react";
import { NavItem } from "@/types/navigation";

export const navigationItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Pijplijn", href: "/pipeline", icon: Package },
  {
    name: "Planning",
    href: "#",
    icon: Calendar,
    children: [
      { name: "Agenda", href: "/appointments" },
      { name: "Dag planning", href: "/employee/planning" },
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
      { name: "Producten", href: "/products" },
    ],
  },
  {
    name: "Projecten",
    href: "#",
    icon: Briefcase,
    children: [
      { name: "Projecten", href: "/projects" },
      { name: "Calculator", href: "/calculator" },
    ],
  },
  { name: "Community", href: "/community", icon: MessageSquare },
  { name: "Kennisbank", href: "/knowledge-base", icon: Book },
  { name: "Support", href: "/support", icon: HeadphonesIcon },
  { name: "Reputatiebeheer", href: "/reputation", icon: Star },
  { name: "Request Idee", href: "/requests", icon: Lamp },
  { name: "Partners", href: "/partners", icon: Briefcase },
  { name: "Instellingen", href: "/settings", icon: Settings },
  { 
    name: "Admin Dashboard", 
    href: "/admin", 
    icon: Shield,
    children: [
      { name: "Overzicht", href: "/admin" },
    ]
  },
];


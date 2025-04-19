
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  FileText,
  FileCheck,
  Settings,
  LogOut,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Leads", href: "/leads", icon: Users },
    { name: "Afspraken", href: "/appointments", icon: Calendar },
    { name: "Offertes", href: "/quotes", icon: FileText },
    { name: "Facturen", href: "/invoices", icon: FileCheck },
    { name: "Producten", href: "/products", icon: Package },
    { name: "Instellingen", href: "/settings", icon: Settings },
  ];

  return (
    <div className="h-full bg-sidebar flex flex-col text-sidebar-foreground">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-white">DAK Lead Hub</h1>
        <p className="text-sm opacity-70">Leadsysteem voor dakbedrijven</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "bg-sidebar-accent text-white"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent/50 transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Uitloggen
        </button>
      </div>
    </div>
  );
};

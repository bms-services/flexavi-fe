
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navigation";

interface NavLinkProps extends NavItem {
  isActive: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ name, href, icon: Icon, isActive }) => (
  <Link
    to={href}
    className={cn(
      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors outline-none",
      isActive
        ? "bg-sidebar-accent text-white"
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 focus-visible:bg-sidebar-accent/50",
      "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sidebar-accent"
    )}
    role="menuitem"
    aria-current={isActive ? "page" : undefined}
    tabIndex={0}
  >
    <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
    <span>{name}</span>
  </Link>
);

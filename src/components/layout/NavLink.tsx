
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface NavLinkProps extends NavItem {
  isActive: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ name, href, icon: Icon, children, isActive }) => {
  if (children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center px-3 py-2 rounded-md text-sm font-medium transition-colors outline-none",
              "text-sidebar-foreground hover:bg-sidebar-accent/50 focus-visible:bg-sidebar-accent/50",
              "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sidebar-accent"
            )}
          >
            <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
            <span className="flex-1">{name}</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="start"
          alignOffset={-12}
          sideOffset={8}
        >
          {children.map((child) => (
            <DropdownMenuItem key={child.name} asChild>
              <Link
                to={child.href}
                className="flex items-center px-2 py-1.5"
              >
                <child.icon className="mr-2 h-4 w-4" />
                <span>{child.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
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
};

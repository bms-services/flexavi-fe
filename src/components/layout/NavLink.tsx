
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NavLinkProps extends NavItem {
  isActive: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ name, href, icon: Icon, children, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (children) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-start px-3 py-2 rounded-md text-sm font-medium transition-colors outline-none",
            "text-sidebar-foreground hover:bg-sidebar-accent/50 focus-visible:bg-sidebar-accent/50",
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sidebar-accent"
          )}
        >
          <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
          <span className="flex-1 text-left">{name}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 ml-2 opacity-75" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2 opacity-75" />
          )}
        </button>
        
        {isOpen && (
          <div className="pl-8 mt-1 space-y-1">
            {children.map((child) => (
              <Link
                key={child.name}
                to={child.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm transition-colors outline-none",
                  location.pathname === child.href
                    ? "bg-sidebar-accent/30 text-sidebar-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/20 hover:text-sidebar-foreground"
                )}
              >
                <child.icon className="mr-2.5 h-4 w-4 opacity-75" />
                <span>{child.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={href}
      className={cn(
        "flex w-full items-center justify-start px-3 py-2 rounded-md text-sm font-medium transition-colors outline-none",
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

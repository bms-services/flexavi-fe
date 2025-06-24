
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/format";
import { NavItem } from "@/types/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NavLinkProps extends NavItem {
  isActive: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ name, href, icon: Icon, children, isActive }) => {
  const location = useLocation();

  // Check if any child is active to determine if dropdown should be open
  const hasActiveChild = children?.some(child => location.pathname === child.href);

  // Set dropdown open state initially based on whether any child is active
  const [isOpen, setIsOpen] = useState(hasActiveChild || false);

  // Update dropdown open state when route changes
  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [location.pathname, hasActiveChild]);

  if (children) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-start px-2 py-1.5 rounded-md text-[14px] font-medium transition-colors outline-none",
            "text-sidebar-foreground hover:bg-sidebar-accent/50 focus-visible:bg-sidebar-accent/50",
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sidebar-accent"
          )}
        >
          {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
          <span className="flex-1 text-left">{name}</span>
          {isOpen ? (
            <ChevronUp className="h-3.5 w-3.5 ml-1 opacity-75" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-75" />
          )}
        </button>

        {isOpen && (
          <div className="mt-0.5 space-y-0.5">
            {children.map((child) => (
              <Link
                key={child.name}
                to={child.href}
                className={cn(
                  "flex items-center px-2 py-1.5 rounded-md text-[14px] transition-colors outline-none pl-6",
                  location.pathname === child.href
                    ? "bg-sidebar-accent/30 text-sidebar-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/20 hover:text-sidebar-foreground"
                )}
              >
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
        "flex w-full items-center justify-start px-2 py-1.5 rounded-md text-[14px] font-medium transition-colors outline-none",
        isActive
          ? "bg-sidebar-accent text-white"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 focus-visible:bg-sidebar-accent/50",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sidebar-accent"
      )}
      role="menuitem"
      aria-current={isActive ? "page" : undefined}
      tabIndex={0}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
      <span>{name}</span>
    </Link>
  );
};

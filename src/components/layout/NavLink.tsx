
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavItem } from "@/types/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavLinkProps extends NavItem {
  isActive?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  name,
  href,
  icon: Icon,
  children,
  isActive = false,
}) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const isMobile = useIsMobile();
  const hasChildren = children && children.length > 0;

  const toggleDropdown = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="nav-item">
      <a
        href={href}
        onClick={toggleDropdown}
        className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        }`}
      >
        <div className="flex items-center">
          {Icon && <Icon className="h-5 w-5 mr-2 shrink-0" />}
          <span className="text-sm">{name}</span>
        </div>
        {hasChildren && (
          <div className="ml-auto">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        )}
      </a>
      {hasChildren && isOpen && (
        <div className="mt-1 ml-6 space-y-1">
          {children.map((child) => (
            <a
              key={child.name}
              href={child.href}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                location.pathname === child.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              {child.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

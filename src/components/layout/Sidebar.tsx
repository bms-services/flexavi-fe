
import React from "react";
import { useLocation } from "react-router-dom";
import { navigationItems } from "@/config/navigation";
import { NavLink } from "./NavLink";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="h-full bg-sidebar flex flex-col text-sidebar-foreground">
      <SidebarHeader />
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          // Check if this item is active based on exact match or if any child is active
          const isChildActive = item.children?.some(child => location.pathname === child.href);
          const isActive = location.pathname === item.href || isChildActive;
          
          return (
            <NavLink
              key={item.name}
              {...item}
              isActive={isActive}
            />
          );
        })}
      </nav>
      <SidebarFooter />
    </div>
  );
};

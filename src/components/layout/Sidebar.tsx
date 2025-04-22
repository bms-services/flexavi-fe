
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
          // Only mark the item as active if it's an exact match (not for parent items)
          const isActive = location.pathname === item.href;
          
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

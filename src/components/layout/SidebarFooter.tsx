
import React from "react";
import { LogOut } from "lucide-react";

export const SidebarFooter: React.FC = () => (
  <div className="p-4 border-t border-sidebar-border">
    <button className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent/50 transition-colors">
      <LogOut className="mr-3 h-5 w-5" />
      Uitloggen
    </button>
  </div>
);


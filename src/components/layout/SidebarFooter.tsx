
import React from "react";
import { BadgePlus } from "lucide-react";
import { Button } from "../ui/button";

export const SidebarFooter: React.FC = () => (
  <div className="p-4 border-t border-sidebar-border">
    <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg text-white">
      <h3 className="font-semibold mb-1">Upgrade nu</h3>
      <p className="text-sm opacity-90 mb-2">Krijg toegang tot meer features</p>
      <Button variant="secondary" size="sm" className="w-full">
        <BadgePlus className="w-4 h-4 mr-2" />
        Upgrade
      </Button>
    </div>
  </div>
);

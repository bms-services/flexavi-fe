
import React from "react";
import { MainHeader } from "./MainHeader";
import { Sidebar } from "./Sidebar";
import { MainFooter } from "./MainFooter";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <div className="flex flex-1">
        {!isMobile && (
          <div className="hidden md:block w-64 shrink-0 border-r">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <MainFooter />
    </div>
  );
};

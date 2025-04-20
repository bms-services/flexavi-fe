
import React from "react";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickActions from "./QuickActions";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 max-w-[220px]">
            <Sidebar />
          </SheetContent>
        </Sheet>
      ) : (
        <div className="w-[220px] flex-shrink-0">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 min-h-screen flex flex-col">
        <QuickActions />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};


import React from "react";
import { Logo } from "@/components/ui/logo";
import QuickActions from "./QuickActions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";

export const MainHeader: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="h-16 border-b shadow-sm bg-white z-50">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px]">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
          <Logo />
        </div>
        <QuickActions />
      </div>
    </header>
  );
};

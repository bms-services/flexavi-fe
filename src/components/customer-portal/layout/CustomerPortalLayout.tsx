
import React, { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { MainFooter } from "@/components/layout/MainFooter";
import { Button } from "@/components/ui/button";
import { User, Bell, Menu, ChevronRight, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

interface CustomerPortalLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const CustomerPortalLayout: React.FC<CustomerPortalLayoutProps> = ({
  children,
  title = "Klant Portaal",
  subtitle = "Bekijk en beheer al uw zaken op één plek"
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b shadow-sm bg-white sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
              <nav className="hidden md:flex ml-8 space-x-6">
                <a href="/portal/dashboard/1" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Offertes</a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Facturen</a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Werkzaamheden</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-primary transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="hidden md:flex items-center">
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Mijn Account</span>
                </Button>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px]">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-end mb-6">
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>
                    <nav className="flex flex-col space-y-4">
                      <a href="/portal/dashboard/1" className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors">Dashboard</a>
                      <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors">Offertes</a>
                      <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors">Facturen</a>
                      <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors">Werkzaamheden</a>
                    </nav>
                    <div className="mt-auto">
                      <Button variant="outline" className="w-full gap-2 mt-4">
                        <User className="h-4 w-4" />
                        <span>Mijn Account</span>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - More modern with better spacing and gradient */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border-b shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
              <p className="text-muted-foreground mt-2 max-w-xl">{subtitle}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 text-sm text-muted-foreground">
              <a href="/portal/dashboard/1" className="hover:text-primary transition-colors">Dashboard</a>
              {title !== "Klant Portaal" && (
                <>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span className="text-primary font-medium">{title}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Better background and container */}
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          {children}
        </div>
      </main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
};

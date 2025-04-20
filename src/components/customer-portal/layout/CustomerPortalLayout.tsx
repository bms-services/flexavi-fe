
import React from "react";
import { Logo } from "@/components/ui/logo";
import { MainFooter } from "@/components/layout/MainFooter";

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
};

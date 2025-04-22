
import React from "react";
import { Layout } from "@/components/layout/Layout";

interface FAQLayoutProps {
  children: React.ReactNode;
}

export function FAQLayout({ children }: FAQLayoutProps) {
  return (
    <Layout>
      <div className="container py-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Veelgestelde vragen</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vind snel antwoorden op veelgestelde vragen over ons platform. Klik op een vraag om het antwoord te bekijken.
          </p>
        </div>
        {children}
      </div>
    </Layout>
  );
}

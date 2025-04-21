
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const tabs = [
    { id: "dashboard", label: "Dashboard", image: "/dashboard-screenshot.webp", 
      features: ["Realtime overzicht van alle projecten", "Leadconversie statistieken", "Omzet forecasting"] },
    { id: "projects", label: "Projecten", image: "/projects-screenshot.webp", 
      features: ["Eenvoudig projectbeheer", "Gedetailleerde projecttimeline", "Automatische herinneringen"] },
    { id: "invoices", label: "Facturatie", image: "/invoices-screenshot.webp", 
      features: ["Snelle factuurcreatie", "Automatische betalingsherinneringen", "Financiële rapportages"] },
  ];

  const activeImage = tabs.find(tab => tab.id === activeTab)?.image || tabs[0].image;
  const activeFeatures = tabs.find(tab => tab.id === activeTab)?.features || [];

  return (
    <section className="py-24 bg-background overflow-hidden" id="demo">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Zie DakLeadHub in actie</h2>
          <p className="text-xl text-muted-foreground">Ontdek hoe eenvoudig en krachtig ons platform werkt</p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-2xl font-bold mb-4 capitalize">
                {activeTab} Module
              </h3>
              <ul className="space-y-3">
                {activeFeatures.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6">
                <Link to="/auth/register">
                  <Button>
                    Gratis proberen <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <Card className="md:col-span-3 overflow-hidden border shadow-lg rounded-xl bg-muted/10">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={activeImage} 
                  alt={`${activeTab} screenshot`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/800x450/e2e8f0/475569?text=DakLeadHub+Screenshot";
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

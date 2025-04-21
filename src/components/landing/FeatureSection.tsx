
import { ChartBar, Shield, Zap, Cloud, ArrowRight, Building, Construction, Globe, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300 group hover:translate-y-[-5px]">
      <div className="mb-4 bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="h-7 w-7 text-primary mb-0" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function FeatureSection() {
  const features = [
    {
      icon: Building,
      title: "Projectbeheer",
      description: "Beheer al uw dakprojecten efficiënt op één plek. Plan, volg en optimaliseer elk project.",
    },
    {
      icon: ChartBar,
      title: "Bedrijfsinzichten",
      description: "Krijg realtime inzicht in uw bedrijfsprestaties met geavanceerde analytics en rapportages.",
    },
    {
      icon: Construction,
      title: "Werkplanning",
      description: "Plan uw teams en materieel optimaal in met onze intelligente planningstools.",
    },
    {
      icon: Shield,
      title: "Veilige gegevens",
      description: "Uw bedrijfsgegevens zijn veilig met onze geavanceerde encryptie en beveiligingsmaatregelen.",
    },
    {
      icon: Zap,
      title: "Snelle facturatie",
      description: "Genereer professionele facturen in seconden en verbeter uw cashflow met geautomatiseerde betalingsherinneringen.",
    },
    {
      icon: Cloud,
      title: "Cloud opslag",
      description: "Toegang tot uw documenten, foto's en gegevens vanaf elke locatie, op elk apparaat, op elk moment.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Alles wat u nodig heeft voor uw succes</h2>
          <p className="text-xl text-muted-foreground">Ons platform biedt een complete set tools om uw dakdekkersbedrijf naar het volgende niveau te tillen.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/auth/register">
            <Button size="lg" className="font-semibold">
              Ontdek alle functies <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

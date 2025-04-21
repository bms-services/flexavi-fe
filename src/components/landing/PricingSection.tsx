
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "€49",
      description: "Perfect voor kleine dakdekkersbedrijven",
      features: [
        "Tot 5 gebruikers",
        "Projectmanagement",
        "Basis facturatie",
        "Klantbeheer",
        "Email support"
      ],
      cta: "Start gratis proefperiode",
      popular: false
    },
    {
      name: "Professional",
      price: "€99",
      description: "Voor groeiende dakdekkersbedrijven",
      features: [
        "Tot 15 gebruikers",
        "Alle Starter features",
        "Geavanceerde rapportages",
        "Team planning",
        "Offerte management",
        "Priority support"
      ],
      cta: "Start gratis proefperiode",
      popular: true
    },
    {
      name: "Enterprise",
      price: "€199",
      description: "Voor grote dakdekkersbedrijven",
      features: [
        "Onbeperkt aantal gebruikers",
        "Alle Professional features",
        "API toegang",
        "Aangepaste integraties",
        "Geavanceerde analytics",
        "Dedicated account manager",
        "24/7 support"
      ],
      cta: "Neem contact op",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparante prijzen</h2>
          <p className="text-xl text-muted-foreground">
            Kies het plan dat het beste bij uw bedrijf past
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative overflow-hidden ${plan.popular ? 'border-primary shadow-md' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                  Meest gekozen
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {plan.price}
                  <span className="ml-1 text-xl text-muted-foreground font-normal">/mnd</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to={plan.popular ? "/auth/register" : "/pricing"} className="w-full">
                  <Button 
                    size="lg" 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

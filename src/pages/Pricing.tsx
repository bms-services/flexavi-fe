import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "29",
      period: "maand",
      description: "Perfect voor ZZP'ers en kleine bedrijven",
      features: [
        "Onbeperkt aantal leads",
        "Agenda beheer",
        "Basis rapportages",
        "Email ondersteuning",
        "Basis offertes en facturen"
      ],
    },
    {
      name: "Professional",
      price: "59",
      period: "maand",
      description: "Voor groeiende dakdekkersbedrijven",
      features: [
        "Alles uit Starter",
        "Team agenda beheer",
        "Geavanceerde rapportages",
        "Prioriteit ondersteuning",
        "Aangepaste templates",
        "Werkbonnen",
        "Projectplanning"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "99",
      period: "maand",
      description: "Voor grote dakdekkersbedrijven",
      features: [
        "Alles uit Professional",
        "Onbeperkte gebruikers",
        "24/7 premium support",
        "API toegang",
        "Aangepaste integraties",
        "Dedicated accountmanager",
        "Maatwerk oplossingen"
      ],
    },
  ];

  const detailedFeatures = {
    categories: [
      {
        name: "Lead Management",
        features: [
          { name: "Leadregistratie", starter: true, professional: true, enterprise: true },
          { name: "Lead scoring", starter: false, professional: true, enterprise: true },
          { name: "Geautomatiseerde lead toewijzing", starter: false, professional: true, enterprise: true },
          { name: "Lead analytics", starter: false, professional: false, enterprise: true }
        ]
      },
      {
        name: "Agenda & Planning",
        features: [
          { name: "Basis agenda", starter: true, professional: true, enterprise: true },
          { name: "Team agenda's", starter: false, professional: true, enterprise: true },
          { name: "Route optimalisatie", starter: false, professional: true, enterprise: true },
          { name: "Capaciteitsplanning", starter: false, professional: false, enterprise: true }
        ]
      },
      {
        name: "Offertes & Facturatie",
        features: [
          { name: "Basis offertes", starter: true, professional: true, enterprise: true },
          { name: "Aangepaste templates", starter: false, professional: true, enterprise: true },
          { name: "Automatische berekeningen", starter: false, professional: true, enterprise: true },
          { name: "Digitaal ondertekenen", starter: false, professional: true, enterprise: true },
          { name: "Geavanceerde prijsmodellen", starter: false, professional: false, enterprise: true }
        ]
      },
      {
        name: "Projectbeheer",
        features: [
          { name: "Projectoverzicht", starter: true, professional: true, enterprise: true },
          { name: "Documentbeheer", starter: false, professional: true, enterprise: true },
          { name: "Werkbonnen", starter: false, professional: true, enterprise: true },
          { name: "Materiaalplanning", starter: false, professional: false, enterprise: true },
          { name: "Projectanalytics", starter: false, professional: false, enterprise: true }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Kies het pakket dat bij je past</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              30 dagen gratis proberen, op elk moment opzegbaar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Meest gekozen
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">€{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="text-primary w-5 h-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/auth/register" className="w-full">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      Start gratis proefperiode
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">Vergelijk alle functies</h2>
            
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Functie</TableHead>
                    <TableHead className="text-center">Starter</TableHead>
                    <TableHead className="text-center">Professional</TableHead>
                    <TableHead className="text-center">Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedFeatures.categories.map((category) => (
                    <React.Fragment key={category.name}>
                      <TableRow>
                        <TableCell colSpan={4} className="bg-muted/50 font-semibold">
                          {category.name}
                        </TableCell>
                      </TableRow>
                      {category.features.map((feature) => (
                        <TableRow key={feature.name}>
                          <TableCell>{feature.name}</TableCell>
                          <TableCell className="text-center">
                            {feature.starter ? (
                              <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {feature.professional ? (
                              <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {feature.enterprise ? (
                              <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Veel gestelde vragen</h2>
            <div className="max-w-3xl mx-auto text-left space-y-8">
              <FAQ 
                question="Hoe werkt de proefperiode?"
                answer="Je kunt DakLeadHub 30 dagen gratis uitproberen met alle functies. Geen creditcard nodig en je kunt op elk moment opzeggen."
              />
              <FAQ 
                question="Kan ik later van pakket wisselen?"
                answer="Ja, je kunt op elk moment upgraden of downgraden. Het verschil wordt naar rato verrekend."
              />
              <FAQ 
                question="Zitten er verborgen kosten aan?"
                answer="Nee, je betaalt alleen het maandelijkse bedrag van je gekozen pakket. Geen setupkosten of verborgen extra's."
              />
              <FAQ 
                question="Hoe zit het met support?"
                answer="Alle pakketten hebben toegang tot onze klantenservice. Professional en Enterprise gebruikers krijgen prioriteit support."
              />
            </div>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
}

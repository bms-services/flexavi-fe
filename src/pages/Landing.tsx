
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, Calendar, FileText, ChartBar } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Beheer je dakdekkersbedrijf <span className="text-primary">efficiënt</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Alles-in-één platform voor dakdekkers: van leadmanagement tot facturatie
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="font-semibold">
                  Start gratis proefperiode <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button size="lg" variant="outline">
                  Inloggen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Alles wat je nodig hebt</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Users}
              title="Lead Management"
              description="Beheer en volg al je leads vanaf eerste contact tot opdracht"
            />
            <FeatureCard
              icon={Calendar}
              title="Agenda Beheer"
              description="Plan afspraken en beheer je team efficiënt"
            />
            <FeatureCard
              icon={FileText}
              title="Offertes & Facturatie"
              description="Maak en verstuur professionele offertes en facturen"
            />
            <FeatureCard
              icon={ChartBar}
              title="Inzichten & Rapporten"
              description="Krijg waardevolle inzichten in je bedrijfsprestaties"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Waarom kiezen voor DakLeadHub?</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <BenefitRow text="Bespaar tijd met geautomatiseerd leadbeheer" />
            <BenefitRow text="Verhoog je omzet met efficiënte opvolging" />
            <BenefitRow text="Verbeter klanttevredenheid met georganiseerde communicatie" />
            <BenefitRow text="Krijg direct inzicht in je bedrijfsprestaties" />
            <BenefitRow text="30 dagen gratis uitproberen, geen verplichtingen" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <Icon className="w-8 h-8 text-primary mb-4" />
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function BenefitRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
      <CheckCircle className="text-primary shrink-0" />
      <p className="text-lg">{text}</p>
    </div>
  );
}

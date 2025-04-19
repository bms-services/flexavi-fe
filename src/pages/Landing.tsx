import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, Calendar, FileText, ChartBar, MessageSquare, Star } from "lucide-react";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-6 lg:px-8">
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

      {/* Detailed Features Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Hoe DakLeadHub je bedrijf helpt groeien</h2>
          
          <div className="space-y-24">
            <FeatureDetail 
              title="Effectief leadmanagement"
              description="Volg en beheer al je leads vanaf eerste contact tot opdracht. Krijg direct inzicht in de status van elke lead en mis nooit meer een kans op een nieuwe klant."
              features={[
                "Automatische lead scoring",
                "Email tracking en notificaties",
                "Geïntegreerde communicatietools",
                "Lead status tracking"
              ]}
              imageSrc="/placeholder.svg"
              imageAlt="Lead Management Feature"
              reverse={false}
            />

            <FeatureDetail 
              title="Slimme agenda planning"
              description="Plan afspraken en beheer je team efficiënt met onze geavanceerde agenda functionaliteit. Houd overzicht over alle werkzaamheden en optimaliseer je planning."
              features={[
                "Team agenda synchronisatie",
                "Automatische beschikbaarheid check",
                "Route optimalisatie",
                "Realtime updates"
              ]}
              imageSrc="/placeholder.svg"
              imageAlt="Agenda Feature"
              reverse={true}
            />

            <FeatureDetail 
              title="Professionele offertes & facturen"
              description="Maak en verstuur snel professionele offertes en facturen. Volg de status van je documenten en krijg direct inzicht in je omzet."
              features={[
                "Aanpasbare templates",
                "Digitale ondertekening",
                "Automatische berekeningen",
                "Direct verzenden"
              ]}
              imageSrc="/placeholder.svg"
              imageAlt="Quotes Feature"
              reverse={false}
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Wat onze klanten zeggen</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ReviewCard 
              quote="DakLeadHub heeft ons bedrijf compleet getransformeerd. We hebben nu veel meer overzicht en kunnen efficiënter werken."
              author="Jan de Vries"
              company="Dakspecialist B.V."
              rating={5}
            />
            <ReviewCard 
              quote="De offerte module bespaart ons uren werk per week. Klanten zijn onder de indruk van onze snelle en professionele service."
              author="Peter Bakker"
              company="Dakwerk Pro"
              rating={5}
            />
            <ReviewCard 
              quote="Eindelijk een systeem dat speciaal voor dakdekkers is gemaakt. Het verschil met algemene CRM systemen is enorm."
              author="Linda Janssen"
              company="Topwerk Daken"
              rating={5}
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

      <MainFooter />
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

function FeatureDetail({ 
  title, 
  description, 
  features, 
  imageSrc, 
  imageAlt, 
  reverse 
}: { 
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  reverse: boolean;
}) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-lg text-muted-foreground mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <CheckCircle className="text-primary h-5 w-5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </div>
  );
}

function ReviewCard({ 
  quote, 
  author, 
  company, 
  rating 
}: { 
  quote: string;
  author: string;
  company: string;
  rating: number;
}) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 text-primary fill-primary" />
          ))}
        </div>
        <MessageSquare className="h-8 w-8 text-primary mb-4" />
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-6">{quote}</p>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
      </CardContent>
    </Card>
  );
}

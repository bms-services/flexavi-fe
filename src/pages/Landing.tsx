
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Star, Users, ChartBar, Construction, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10" />
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Transformeer uw dakdekkersbedrijf naar de digitale toekomst
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Het eerste complete platform speciaal ontwikkeld voor dakdekkers wereldwijd. 
              Van leadmanagement tot facturatie, alles in één geïntegreerde oplossing.
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
            <div className="mt-12 flex justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>25+ landen</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>10.000+ gebruikers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>4.9/5 beoordeling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Alles wat u nodig heeft voor uw succes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Building}
              title="Projectbeheer"
              description="Beheer al uw dakprojecten efficiënt op één plek. Plan, volg en optimaliseer elk project."
            />
            <FeatureCard
              icon={ChartBar}
              title="Bedrijfsinzichten"
              description="Krijg realtime inzicht in uw bedrijfsprestaties met geavanceerde analytics en rapportages."
            />
            <FeatureCard
              icon={Construction}
              title="Werkplanning"
              description="Plan uw teams en materieel optimaal in met onze intelligente planningstools."
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Vertrouwd door toonaangevende dakdekkersbedrijven
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="DakLeadHub heeft onze efficiëntie met 40% verhoogd. Een onmisbaar platform voor moderne dakdekkers."
              author="Michael Schmidt"
              company="Schmidt Dachbau GmbH"
              location="Duitsland"
            />
            <TestimonialCard
              quote="De beste investering die we hebben gedaan. Het platform heeft ons geholpen om internationaal te groeien."
              author="John Miller"
              company="Apex Roofing Solutions"
              location="Verenigde Staten"
            />
            <TestimonialCard
              quote="Eindelijk een oplossing die echt begrijpt wat dakdekkers nodig hebben."
              author="Sophie Dubois"
              company="Toitures Dubois"
              location="Frankrijk"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Begin vandaag nog met digitaliseren
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Sluit u aan bij duizenden succesvolle dakdekkersbedrijven wereldwijd
            </p>
            <Link to="/auth/register">
              <Button size="lg" className="font-semibold">
                Start uw gratis proefperiode <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
      <Icon className="h-12 w-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, company, location }: { quote: string, author: string, company: string, location: string }) {
  return (
    <div className="bg-background rounded-xl p-6 shadow-sm border">
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map((i) => (
          <Star key={i} className="h-5 w-5 text-primary fill-primary" />
        ))}
      </div>
      <p className="text-lg mb-6">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{company}</p>
        <p className="text-sm text-muted-foreground">{location}</p>
      </div>
    </div>
  );
}

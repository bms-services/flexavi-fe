
import { Star, Quote } from "lucide-react";

function TestimonialCard({ quote, author, company, location }: { quote: string, author: string, company: string, location: string }) {
  return (
    <div className="bg-background rounded-xl p-8 shadow-sm border relative group hover:shadow-md transition-all">
      <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
        <Quote className="h-6 w-6" />
      </div>
      <div className="flex gap-1 mb-4 pt-4">
        {[1,2,3,4,5].map((i) => (
          <Star key={i} className="h-5 w-5 text-primary fill-primary" />
        ))}
      </div>
      <p className="text-lg mb-6 italic">{quote}</p>
      <div className="border-t pt-4">
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{company}</p>
        <p className="text-sm text-muted-foreground">{location}</p>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const testimonials = [
    {
      quote: "DakLeadHub heeft onze efficiëntie met 40% verhoogd. Een onmisbaar platform voor moderne dakdekkers.",
      author: "Michael Schmidt",
      company: "Schmidt Dachbau GmbH",
      location: "Duitsland"
    },
    {
      quote: "De beste investering die we hebben gedaan. Het platform heeft ons geholpen om internationaal te groeien.",
      author: "John Miller",
      company: "Apex Roofing Solutions",
      location: "Verenigde Staten"
    },
    {
      quote: "Eindelijk een oplossing die echt begrijpt wat dakdekkers nodig hebben.",
      author: "Sophie Dubois",
      company: "Toitures Dubois",
      location: "Frankrijk"
    },
    {
      quote: "De klantenservice is fenomenaal. Ze staan altijd klaar om te helpen en denken mee met onze business.",
      author: "Lars Johansson",
      company: "Nordic Roofing Experts",
      location: "Zweden"
    },
    {
      quote: "De mobiele app maakt het mogelijk om vanaf de bouwplaats direct te werken. Een echte game-changer!",
      author: "Carlos Rodriguez",
      company: "Techos Superiores",
      location: "Spanje"
    },
    {
      quote: "Sinds we DakLeadHub gebruiken hebben we onze omzet met 35% zien stijgen. Absolute aanrader!",
      author: "Marco Rossi",
      company: "Tetti Italiani",
      location: "Italië"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-background" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vertrouwd door toonaangevende dakdekkersbedrijven</h2>
          <p className="text-xl text-muted-foreground">Ontdek waarom duizenden dakdekkers wereldwijd voor DakLeadHub kiezen</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              company={testimonial.company}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

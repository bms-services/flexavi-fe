
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-background rounded-2xl p-12 text-center max-w-4xl mx-auto shadow-lg border"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin vandaag nog met digitaliseren
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sluit u aan bij duizenden succesvolle dakdekkersbedrijven wereldwijd en til uw bedrijf naar een hoger niveau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="font-semibold min-w-[200px]">
                Start uw gratis proefperiode <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Bekijk alle prijzen
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Geen creditcard nodig. Gratis proefperiode van 14 dagen.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

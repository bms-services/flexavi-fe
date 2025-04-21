
import { motion } from "framer-motion";

export default function IntegrationSection() {
  const integrations = [
    { name: "QuickBooks", logo: "/logos/quickbooks.svg" },
    { name: "Exact", logo: "/logos/exact.svg" },
    { name: "Google Calendar", logo: "/logos/google-calendar.svg" },
    { name: "Stripe", logo: "/logos/stripe.svg" },
    { name: "Salesforce", logo: "/logos/salesforce.svg" },
    { name: "Mollie", logo: "/logos/mollie.svg" },
    { name: "Slack", logo: "/logos/slack.svg" },
    { name: "Microsoft 365", logo: "/logos/microsoft.svg" },
  ];

  return (
    <section className="py-24 bg-muted/20" id="integrations">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Naadloze integraties</h2>
          <p className="text-xl text-muted-foreground">
            Verbind DakLeadHub met uw favoriete tools en diensten voor een volledige workflow
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-lg p-6 flex items-center justify-center h-24 shadow-sm border hover:shadow-md transition-all duration-300"
              >
                <img
                  src={integration.logo}
                  alt={`${integration.name} logo`}
                  className="max-h-12 max-w-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/200x80/e2e8f0/475569?text=${integration.name}`;
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

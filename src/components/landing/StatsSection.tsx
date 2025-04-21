
import { motion } from "framer-motion";
import { Building2, Globe, Star, Users } from "lucide-react";

function StatItem({ icon: Icon, value, label }: { icon: any, value: string, label: string }) {
  return (
    <div className="text-center px-4">
      <div className="mx-auto flex justify-center items-center w-16 h-16 bg-primary/10 rounded-full mb-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-4xl font-bold mb-2">{value}</h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { icon: Users, value: "10.000+", label: "Actieve gebruikers" },
    { icon: Building2, value: "5.000+", label: "Dakdekkersbedrijven" },
    { icon: Globe, value: "25+", label: "Landen wereldwijd" },
    { icon: Star, value: "4.9/5", label: "Klanttevredenheid" },
  ];

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

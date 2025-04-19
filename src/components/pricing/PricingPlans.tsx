
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface PricingPlansProps {
  plans: Plan[];
}

export function PricingPlans({ plans }: PricingPlansProps) {
  return (
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
  );
}

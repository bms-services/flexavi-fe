
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle } from "lucide-react";

interface PlanProps {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isCurrent: boolean;
  onUpgrade: (planId: string) => void;
}

export const PlanCard = ({
  id,
  name,
  price,
  period,
  features,
  isCurrent,
  onUpgrade,
}: PlanProps) => {
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
        isCurrent 
          ? 'border-primary ring-1 ring-primary/20' 
          : 'hover:border-primary/20'
      }`}
    >
      {isCurrent && (
        <div className="absolute -right-12 top-6 rotate-45 bg-primary text-primary-foreground px-12 py-1 text-sm font-medium">
          Actief
        </div>
      )}
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <Badge variant="outline" className={
            isCurrent ? 'bg-primary/10 text-primary border-primary/30' : 'bg-secondary text-secondary-foreground'
          }>
            {price}/{period}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 min-h-[280px]">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4 border-t bg-muted/50">
        <Button 
          className={`w-full ${
            isCurrent 
              ? 'bg-muted text-muted-foreground hover:bg-muted/80 cursor-default'
              : ''
          }`}
          onClick={() => onUpgrade(id)}
          disabled={isCurrent}
          variant={isCurrent ? "outline" : "default"}
        >
          <ArrowUpCircle className="mr-2 h-4 w-4" />
          {isCurrent ? 'Huidig plan' : 'Upgrade'}
        </Button>
      </CardFooter>
    </Card>
  );
};

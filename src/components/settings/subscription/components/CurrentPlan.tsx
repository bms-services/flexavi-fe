
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

interface CurrentPlanProps {
  name: string;
  price: string;
  period: string;
}

export const CurrentPlan = ({ name, price, period }: CurrentPlanProps) => {
  return (
    <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Huidig abonnement</CardTitle>
              <CardDescription>
                {name} plan
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
            {price}/{period}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};

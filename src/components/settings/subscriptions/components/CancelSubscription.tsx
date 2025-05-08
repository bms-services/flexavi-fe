
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface CancelSubscriptionProps {
  onCancel: () => void;
}

export const CancelSubscription = ({ onCancel }: CancelSubscriptionProps) => {
  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">Abonnement opzeggen</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Bij opzegging blijft je abonnement actief tot het einde van de huidige facturatieperiode.
          Je kunt altijd weer een nieuw abonnement afsluiten.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          onClick={onCancel}
          className="flex items-center"
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          Abonnement opzeggen
        </Button>
      </CardFooter>
    </Card>
  );
};


import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Route } from "lucide-react";

type OptimizationType = "all" | "assigned" | "unassigned";

interface RouteOptimizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOptimize: (type: OptimizationType) => void;
  isOptimizing: boolean;
}

export const RouteOptimizationModal: React.FC<RouteOptimizationModalProps> = ({
  open,
  onOpenChange,
  onOptimize,
  isOptimizing,
}) => {
  const [optimizationType, setOptimizationType] = useState<OptimizationType>("all");

  const handleOptimize = () => {
    onOptimize(optimizationType);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Routes optimaliseren</DialogTitle>
          <DialogDescription>
            Kies hoe je de routes wilt optimaliseren voor de teams
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <RadioGroup
            value={optimizationType}
            onValueChange={(value) => setOptimizationType(value as OptimizationType)}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 rounded-md border p-4">
              <RadioGroupItem value="all" id="all" className="mt-1" />
              <div className="space-y-1.5">
                <Label htmlFor="all" className="font-medium">
                  Op basis van alle afspraken
                </Label>
                <p className="text-sm text-muted-foreground">
                  Het systeem splitst de afspraken in verkoop & uitvoering, berekent de optimale route tussen afspraken en deelt deze automatisch in.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 rounded-md border p-4">
              <RadioGroupItem value="assigned" id="assigned" className="mt-1" />
              <div className="space-y-1.5">
                <Label htmlFor="assigned" className="font-medium">
                  Op basis van ingedeelde afspraken
                </Label>
                <p className="text-sm text-muted-foreground">
                  Het systeem bekijkt per werklijst de afspraken, berekent de optimale volgorde waarin de minste afstand gereden moet worden en updatet de volgorde.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 rounded-md border p-4">
              <RadioGroupItem value="unassigned" id="unassigned" className="mt-1" />
              <div className="space-y-1.5">
                <Label htmlFor="unassigned" className="font-medium">
                  Op basis van niet ingedeelde afspraken
                </Label>
                <p className="text-sm text-muted-foreground">
                  Het systeem wijst niet ingedeelde afspraken toe aan de best passende werklijst (op basis van afstand) en optimaliseert daarna de volgorde.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleOptimize} disabled={isOptimizing} className="ml-2">
            <Route className="h-4 w-4 mr-2" />
            {isOptimizing ? "Optimaliseren..." : "Routes optimaliseren"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

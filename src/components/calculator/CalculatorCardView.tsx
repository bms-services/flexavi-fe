
import React from "react";
import { Calculator } from "@/types/calculator";
import { formatCurrency, calculateSummary } from "@/utils/calculatorUtils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, Trash, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CalculatorCardViewProps {
  calculators: Calculator[];
  onDelete: (id: string) => void;
}

export const CalculatorCardView: React.FC<CalculatorCardViewProps> = ({
  calculators,
  onDelete,
}) => {
  if (calculators.length === 0) {
    return (
      <div className="p-8 text-center w-full">
        <div className="max-w-sm mx-auto">
          <div className="rounded-full w-12 h-12 bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Home className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Geen berekeningen gevonden</h3>
          <p className="text-muted-foreground text-sm">
            Er zijn nog geen calculaties aangemaakt of ze voldoen niet aan de filtercriteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {calculators.map(calc => {
        const summary = calculateSummary(calc);
        return (
          <Card key={calc.id} className="group flex flex-col h-full bg-card hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-roof-100/10 to-roof-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-roof-50 text-roof-700 border-roof-200">
                  {calc.roofParams.roofType}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(calc.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <CardTitle className="text-xl">
                <Link to={`/calculator/${calc.id}`} className="hover:text-roof-600 transition-colors">
                  {calc.name}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-1">{calc.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                    />
                  </svg>
                  <span>Oppervlakte: {calc.roofParams.roofArea} m²</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-2xl font-semibold text-roof-700">
                    {formatCurrency(summary.total)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Totaal berekend bedrag</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-roof-600"
                >
                  <Link to={`/calculator/${calc.id}`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Bewerken</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => onDelete(calc.id)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Verwijderen</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

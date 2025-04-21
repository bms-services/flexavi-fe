
import React from "react";
import { Calculator } from "@/types/calculator";
import { formatCurrency, calculateSummary } from "@/utils/calculatorUtils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, Trash, FileText } from "lucide-react";

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
        Geen berekeningen gevonden.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {calculators.map(calc => {
        const summary = calculateSummary(calc);
        return (
          <Card key={calc.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center gap-2">
                <span className="text-blue-700">
                  <Link to={`/calculator/${calc.id}`} className="hover:underline">{calc.name}</Link>
                </span>
                <span className="text-xs font-normal text-gray-400">{new Date(calc.updatedAt).toLocaleDateString()}</span>
              </CardTitle>
              <CardDescription className="truncate">{calc.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-2">
              <div className="text-sm flex flex-wrap gap-3">
                <div>
                  <b>Dak:</b> {calc.roofParams.roofType} - {calc.roofParams.roofArea} m²
                </div>
                <div>
                  <b>Kosten:</b> {formatCurrency(summary.total)}
                </div>
                <div>
                  <b>Laatste gewijzigd:</b>{" "}
                  {new Date(calc.updatedAt).toLocaleString("nl-NL", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-3">
                <Button asChild size="icon" variant="ghost"><Link to={`/calculator/${calc.id}`}><Edit className="h-4 w-4" /></Link></Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(calc.id)}><Trash className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

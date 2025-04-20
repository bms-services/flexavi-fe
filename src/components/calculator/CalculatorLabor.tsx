
import React from "react";
import { CalculationLabor } from "@/types/calculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/calculatorUtils";
import { Plus, Trash, Calculator } from "lucide-react";

interface CalculatorLaborProps {
  labor: CalculationLabor[];
  onAddLabor: () => void;
  onUpdateLabor: (labor: CalculationLabor) => void;
  onDeleteLabor: (id: string) => void;
  onEstimateLabor: () => void;
}

export const CalculatorLabor: React.FC<CalculatorLaborProps> = ({
  labor,
  onAddLabor,
  onUpdateLabor,
  onDeleteLabor,
  onEstimateLabor,
}) => {
  const calculateTotal = (labor: CalculationLabor): number => {
    return labor.hourlyRate * labor.hours;
  };

  const handleChange = (id: string, field: keyof CalculationLabor, value: any) => {
    const item = labor.find(l => l.id === id);
    if (item) {
      onUpdateLabor({ ...item, [field]: value });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Arbeid</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEstimateLabor}
          >
            <Calculator className="h-4 w-4 mr-1" />
            Arbeidsuren schatten
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={onAddLabor}
          >
            <Plus className="h-4 w-4 mr-1" />
            Arbeid toevoegen
          </Button>
        </div>
      </div>

      <div className="divide-y">
        {labor.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Geen arbeidsuren toegevoegd.</p>
            <p className="text-sm text-gray-400 mt-1">
              Klik op 'Arbeid toevoegen' om te beginnen of gebruik 'Arbeidsuren schatten' op basis van dakgegevens.
            </p>
          </div>
        ) : (
          labor.map((item) => (
            <div key={item.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <Label htmlFor={`labor-desc-${item.id}`}>Omschrijving</Label>
                  <Input
                    id={`labor-desc-${item.id}`}
                    value={item.description}
                    onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                    placeholder="Functie of werkzaamheid"
                  />
                </div>

                <div className="md:col-span-3">
                  <Label htmlFor={`labor-rate-${item.id}`}>Uurtarief</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">€</span>
                    <Input
                      id={`labor-rate-${item.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      className="pl-7"
                      value={item.hourlyRate || ""}
                      onChange={(e) => handleChange(item.id, 'hourlyRate', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor={`labor-hours-${item.id}`}>Uren</Label>
                  <Input
                    id={`labor-hours-${item.id}`}
                    type="number"
                    min="0"
                    step="0.25"
                    value={item.hours || ""}
                    onChange={(e) => handleChange(item.id, 'hours', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div className="md:col-span-1 flex flex-col">
                  <Label>Totaal</Label>
                  <div className="flex-1 flex items-center font-medium">
                    {formatCurrency(calculateTotal(item))}
                  </div>
                </div>

                <div className="md:col-span-1 flex flex-col">
                  <Label className="invisible">Acties</Label>
                  <div className="flex-1 flex items-center justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteLabor(item.id)}
                      title="Verwijderen"
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {labor.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-b-lg border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Totaal arbeid:</span>
            <span className="font-semibold text-lg">
              {formatCurrency(
                labor.reduce((total, item) => total + calculateTotal(item), 0)
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

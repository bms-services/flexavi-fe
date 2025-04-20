
import React from "react";
import { CalculationMisc } from "@/types/calculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/calculatorUtils";
import { Plus, Trash } from "lucide-react";

interface CalculatorMiscellaneousProps {
  miscellaneous: CalculationMisc[];
  onAddMisc: () => void;
  onUpdateMisc: (misc: CalculationMisc) => void;
  onDeleteMisc: (id: string) => void;
}

export const CalculatorMiscellaneous: React.FC<CalculatorMiscellaneousProps> = ({
  miscellaneous,
  onAddMisc,
  onUpdateMisc,
  onDeleteMisc,
}) => {
  const handleChange = (id: string, field: keyof CalculationMisc, value: any) => {
    const item = miscellaneous.find(m => m.id === id);
    if (item) {
      onUpdateMisc({ ...item, [field]: value });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Overige Kosten</h2>
        <Button 
          variant="default" 
          size="sm" 
          onClick={onAddMisc}
        >
          <Plus className="h-4 w-4 mr-1" />
          Kostenpost toevoegen
        </Button>
      </div>

      <div className="divide-y">
        {miscellaneous.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Geen overige kosten toegevoegd.</p>
            <p className="text-sm text-gray-400 mt-1">
              Klik op 'Kostenpost toevoegen' om afvoerkosten, transport, vergunningen of andere kosten toe te voegen.
            </p>
          </div>
        ) : (
          miscellaneous.map((item) => (
            <div key={item.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <Label htmlFor={`misc-desc-${item.id}`}>Omschrijving</Label>
                  <Input
                    id={`misc-desc-${item.id}`}
                    value={item.description}
                    onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                    placeholder="Omschrijving van de kostenpost"
                  />
                </div>

                <div className="md:col-span-3">
                  <Label htmlFor={`misc-cost-${item.id}`}>Kosten</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">€</span>
                    <Input
                      id={`misc-cost-${item.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      className="pl-7"
                      value={item.cost || ""}
                      onChange={(e) => handleChange(item.id, 'cost', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="md:col-span-1 flex flex-col">
                  <Label className="invisible">Acties</Label>
                  <div className="flex-1 flex items-center justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteMisc(item.id)}
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

      {miscellaneous.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-b-lg border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Totaal overige kosten:</span>
            <span className="font-semibold text-lg">
              {formatCurrency(
                miscellaneous.reduce((total, item) => total + item.cost, 0)
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

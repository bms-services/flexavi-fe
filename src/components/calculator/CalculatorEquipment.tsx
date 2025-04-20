
import React from "react";
import { CalculationEquipment } from "@/types/calculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/calculatorUtils";
import { Plus, Trash } from "lucide-react";

interface CalculatorEquipmentProps {
  equipment: CalculationEquipment[];
  onAddEquipment: () => void;
  onUpdateEquipment: (equipment: CalculationEquipment) => void;
  onDeleteEquipment: (id: string) => void;
}

export const CalculatorEquipment: React.FC<CalculatorEquipmentProps> = ({
  equipment,
  onAddEquipment,
  onUpdateEquipment,
  onDeleteEquipment,
}) => {
  const calculateTotal = (equipment: CalculationEquipment): number => {
    return equipment.rentalRate * equipment.days;
  };

  const handleChange = (id: string, field: keyof CalculationEquipment, value: any) => {
    const item = equipment.find(e => e.id === id);
    if (item) {
      onUpdateEquipment({ ...item, [field]: value });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Materieel</h2>
        <Button 
          variant="default" 
          size="sm" 
          onClick={onAddEquipment}
        >
          <Plus className="h-4 w-4 mr-1" />
          Materieel toevoegen
        </Button>
      </div>

      <div className="divide-y">
        {equipment.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Geen materieel toegevoegd.</p>
            <p className="text-sm text-gray-400 mt-1">
              Klik op 'Materieel toevoegen' om een hoogwerker, steiger of andere benodigdheden toe te voegen.
            </p>
          </div>
        ) : (
          equipment.map((item) => (
            <div key={item.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <Label htmlFor={`equipment-name-${item.id}`}>Materieel</Label>
                  <Input
                    id={`equipment-name-${item.id}`}
                    value={item.name}
                    onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                    placeholder="Naam of omschrijving"
                  />
                </div>

                <div className="md:col-span-3">
                  <Label htmlFor={`equipment-rate-${item.id}`}>Prijs per dag</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">€</span>
                    <Input
                      id={`equipment-rate-${item.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      className="pl-7"
                      value={item.rentalRate || ""}
                      onChange={(e) => handleChange(item.id, 'rentalRate', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor={`equipment-days-${item.id}`}>Dagen</Label>
                  <Input
                    id={`equipment-days-${item.id}`}
                    type="number"
                    min="0"
                    step="0.5"
                    value={item.days || ""}
                    onChange={(e) => handleChange(item.id, 'days', parseFloat(e.target.value) || 0)}
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
                      onClick={() => onDeleteEquipment(item.id)}
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

      {equipment.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-b-lg border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Totaal materieel:</span>
            <span className="font-semibold text-lg">
              {formatCurrency(
                equipment.reduce((total, item) => total + calculateTotal(item), 0)
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

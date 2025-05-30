
import React from "react";
import { CalculationMaterial } from "@/types/calculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/calculatorUtils";
import { Plus, Trash, Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CalculatorMaterialsProps {
  materials: CalculationMaterial[];
  onAddMaterial: () => void;
  onUpdateMaterial: (material: CalculationMaterial) => void;
  onDeleteMaterial: (id: string) => void;
  onEstimateMaterials: () => void;
}

export const CalculatorMaterials: React.FC<CalculatorMaterialsProps> = ({
  materials,
  onAddMaterial,
  onUpdateMaterial,
  onDeleteMaterial,
  onEstimateMaterials,
}) => {
  const calculateTotal = (material: CalculationMaterial): number => {
    return material.unitPrice * material.quantity;
  };

  const handleChange = (id: string, field: keyof CalculationMaterial, value: string | number) => {
    const material = materials.find(m => m.id === id);
    if (material) {
      onUpdateMaterial({ ...material, [field]: value });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Materialen</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEstimateMaterials}
          >
            <Calculator className="h-4 w-4 mr-1" />
            Materialen schatten
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={onAddMaterial}
          >
            <Plus className="h-4 w-4 mr-1" />
            Materiaal toevoegen
          </Button>
        </div>
      </div>

      <div className="divide-y">
        {materials.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Geen materialen toegevoegd.</p>
            <p className="text-sm text-gray-400 mt-1">
              Klik op 'Materiaal toevoegen' om te beginnen of gebruik 'Materialen schatten' op basis van dakgegevens.
            </p>
          </div>
        ) : (
          materials.map((material) => (
            <div key={material.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <Label htmlFor={`material-name-${material.id}`}>Materiaal</Label>
                  <Input
                    id={`material-name-${material.id}`}
                    value={material.name}
                    onChange={(e) => handleChange(material.id, 'name', e.target.value)}
                    placeholder="Naam materiaal"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor={`material-unit-${material.id}`}>Eenheid</Label>
                  <Select
                    value={material.unit}
                    onValueChange={(value: 'm²' | 'm' | 'stuk' | 'liter' | 'kg' | 'uur') => 
                      handleChange(material.id, 'unit', value)
                    }
                  >
                    <SelectTrigger id={`material-unit-${material.id}`}>
                      <SelectValue placeholder="Eenheid" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m²">m²</SelectItem>
                      <SelectItem value="m">m</SelectItem>
                      <SelectItem value="stuk">stuk</SelectItem>
                      <SelectItem value="liter">liter</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="uur">uur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor={`material-price-${material.id}`}>Prijs per eenheid</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">€</span>
                    <Input
                      id={`material-price-${material.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      className="pl-7"
                      value={material.unitPrice || ""}
                      onChange={(e) => handleChange(material.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor={`material-quantity-${material.id}`}>Hoeveelheid</Label>
                  <Input
                    id={`material-quantity-${material.id}`}
                    type="number"
                    min="0"
                    step="0.1"
                    value={material.quantity || ""}
                    onChange={(e) => handleChange(material.id, 'quantity', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div className="md:col-span-1 flex flex-col">
                  <Label>Totaal</Label>
                  <div className="flex-1 flex items-center font-medium">
                    {formatCurrency(calculateTotal(material))}
                  </div>
                </div>

                <div className="md:col-span-1 flex flex-col">
                  <Label className="invisible">Acties</Label>
                  <div className="flex-1 flex items-center justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteMaterial(material.id)}
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

      {materials.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-b-lg border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Totaal materialen:</span>
            <span className="font-semibold text-lg">
              {formatCurrency(
                materials.reduce((total, material) => total + calculateTotal(material), 0)
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

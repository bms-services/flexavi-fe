
import React from "react";
import { RoofParams } from "@/types/calculator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CalculatorDetailsProps {
  roofParams: RoofParams;
  onRoofParamsChange: (params: Partial<RoofParams>) => void;
  marginPercentage: number;
  onMarginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  taxRate: number;
  onTaxRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CalculatorDetails: React.FC<CalculatorDetailsProps> = ({
  roofParams,
  onRoofParamsChange,
  marginPercentage,
  onMarginChange,
  taxRate,
  onTaxRateChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Dakgegevens</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="roofType">Type dak</Label>
          <Select
            value={roofParams.roofType}
            onValueChange={(value: 'plat' | 'schuin' | 'anders') => 
              onRoofParamsChange({ roofType: value })
            }
          >
            <SelectTrigger id="roofType">
              <SelectValue placeholder="Selecteer daktype" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plat">Plat dak</SelectItem>
              <SelectItem value="schuin">Schuin dak</SelectItem>
              <SelectItem value="anders">Anders</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="roofArea">Dakoppervlak (m²)</Label>
          <Input
            id="roofArea"
            type="number"
            min="0"
            step="0.1"
            value={roofParams.roofArea || ""}
            onChange={(e) => 
              onRoofParamsChange({ roofArea: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
        
        {roofParams.roofType === 'schuin' && (
          <div>
            <Label htmlFor="roofPitch">Dakhelling (graden)</Label>
            <Input
              id="roofPitch"
              type="number"
              min="0"
              max="90"
              value={roofParams.roofPitch || ""}
              onChange={(e) => 
                onRoofParamsChange({ roofPitch: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
        )}
        
        <div>
          <Label htmlFor="complexity">Complexiteit</Label>
          <Select
            value={roofParams.complexity}
            onValueChange={(value: 'eenvoudig' | 'gemiddeld' | 'complex') => 
              onRoofParamsChange({ complexity: value })
            }
          >
            <SelectTrigger id="complexity">
              <SelectValue placeholder="Selecteer complexiteit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eenvoudig">Eenvoudig</SelectItem>
              <SelectItem value="gemiddeld">Gemiddeld</SelectItem>
              <SelectItem value="complex">Complex</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <h2 className="text-lg font-semibold mb-4">Prijsberekening</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="marginPercentage">Winstmarge (%)</Label>
          <Input
            id="marginPercentage"
            type="number"
            min="0"
            max="100"
            value={marginPercentage || ""}
            onChange={onMarginChange}
          />
        </div>
        
        <div>
          <Label htmlFor="taxRate">BTW-tarief (%)</Label>
          <Input
            id="taxRate"
            type="number"
            min="0"
            max="100"
            value={taxRate || ""}
            onChange={onTaxRateChange}
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Dakgegevens tips</h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
          <li>Meet het dakoppervlak nauwkeurig voor het beste resultaat</li>
          <li>Voor schuine daken: een grotere hellingshoek betekent meer materiaal</li>
          <li>De complexiteit beïnvloedt de benodigde arbeidsuren en materiaalverspilling</li>
          <li>Bij platte daken: houd rekening met opstaande randen en doorvoeren</li>
        </ul>
      </div>
    </div>
  );
};

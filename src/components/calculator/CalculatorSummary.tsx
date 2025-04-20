
import React from "react";
import { CalculationSummary } from "@/types/calculator";
import { formatCurrency, formatNumber } from "@/utils/calculatorUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, Calculator, PieChart, ArrowRight } from "lucide-react";

interface CalculatorSummaryProps {
  summary: CalculationSummary;
  roofArea: number;
}

export const CalculatorSummary: React.FC<CalculatorSummaryProps> = ({
  summary,
  roofArea,
}) => {
  // Calculate percentage of each cost category
  const totalCost = summary.materialsCost + summary.laborCost + summary.equipmentCost + summary.miscCost;
  const materialsPercentage = totalCost > 0 ? (summary.materialsCost / totalCost) * 100 : 0;
  const laborPercentage = totalCost > 0 ? (summary.laborCost / totalCost) * 100 : 0;
  const equipmentPercentage = totalCost > 0 ? (summary.equipmentCost / totalCost) * 100 : 0;
  const miscPercentage = totalCost > 0 ? (summary.miscCost / totalCost) * 100 : 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            <span>Samenvatting berekening</span>
          </CardTitle>
          <CardDescription>
            Overzicht van alle kosten en marges
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            <div className="px-4 py-3 flex justify-between">
              <span className="text-gray-600">Materialen</span>
              <span className="font-medium">{formatCurrency(summary.materialsCost)}</span>
            </div>
            <div className="px-4 py-3 flex justify-between">
              <span className="text-gray-600">Arbeid</span>
              <span className="font-medium">{formatCurrency(summary.laborCost)}</span>
            </div>
            <div className="px-4 py-3 flex justify-between">
              <span className="text-gray-600">Materieel</span>
              <span className="font-medium">{formatCurrency(summary.equipmentCost)}</span>
            </div>
            <div className="px-4 py-3 flex justify-between">
              <span className="text-gray-600">Overige kosten</span>
              <span className="font-medium">{formatCurrency(summary.miscCost)}</span>
            </div>
            <div className="px-4 py-3 flex justify-between font-semibold">
              <span>Subtotaal</span>
              <span>{formatCurrency(summary.subtotal)}</span>
            </div>
            <div className="px-4 py-3 flex justify-between text-blue-600">
              <span>Winstmarge</span>
              <span>{formatCurrency(summary.margin)}</span>
            </div>
            <div className="px-4 py-3 flex justify-between font-semibold">
              <span>Subtotaal incl. marge</span>
              <span>{formatCurrency(summary.subtotalWithMargin)}</span>
            </div>
            <div className="px-4 py-3 flex justify-between">
              <span className="text-gray-600">BTW</span>
              <span className="font-medium">{formatCurrency(summary.tax)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-blue-700 text-white p-4 rounded-b-lg flex justify-between items-center">
          <span className="font-bold">Totaalprijs</span>
          <span className="font-bold text-xl">{formatCurrency(summary.total)}</span>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            <span>Kostenanalyse</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Materialen ({formatNumber(materialsPercentage)}%)</span>
                <span>{formatCurrency(summary.materialsCost)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${materialsPercentage}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Arbeid ({formatNumber(laborPercentage)}%)</span>
                <span>{formatCurrency(summary.laborCost)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${laborPercentage}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Materieel ({formatNumber(equipmentPercentage)}%)</span>
                <span>{formatCurrency(summary.equipmentCost)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${equipmentPercentage}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overige ({formatNumber(miscPercentage)}%)</span>
                <span>{formatCurrency(summary.miscCost)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${miscPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {roofArea > 0 && (
        <Card>
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>Prijsanalyse per m²</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Totale dakoppervlakte</span>
                <span className="font-semibold">{formatNumber(roofArea)} m²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Prijs per m² (excl. BTW)</span>
                <span className="font-semibold">{formatCurrency(summary.subtotalWithMargin / roofArea)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Prijs per m² (incl. BTW)</span>
                <span className="font-semibold">{formatCurrency(summary.pricePerSquareMeter)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChipData {
  label: string;
  value: string;
  change: number;
}

interface ChartLegendItem {
  label: string;
  color: string;
}

interface StatsCardWithChartProps {
  title: string;
  value: string;
  change: number;
  isNegativeChange?: boolean;
  tooltip?: string;
  viewReportLink?: string;
  chipData?: ChipData[];
  subTitle?: string;
  chart: React.ReactNode;
  chartLegend?: ChartLegendItem[];
}

export const StatsCardWithChart: React.FC<StatsCardWithChartProps> = ({
  title,
  value,
  change,
  isNegativeChange = false,
  tooltip,
  viewReportLink,
  chipData,
  subTitle,
  chart,
  chartLegend
}) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-medium text-gray-700">{title}</CardTitle>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {viewReportLink && (
          <Button variant="link" size="sm" className="text-sm text-blue-500 p-0">
            View report
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold">{value}</div>
          <div className={`flex items-center gap-1 text-sm ${isNegativeChange ? 'text-red-500' : 'text-green-500'}`}>
            {isNegativeChange ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUp className="h-3 w-3" />
            )}
            <span>{change}%</span>
          </div>
        </div>
        
        {chipData && (
          <div className="space-y-1">
            {chipData.map((chip, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{chip.label}</span>
                <div className="flex items-center gap-2">
                  <span>{chip.value}</span>
                  <span className={`flex items-center gap-0.5 ${chip.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {chip.change < 0 ? (
                      <ArrowDown className="h-3 w-3" />
                    ) : (
                      <ArrowUp className="h-3 w-3" />
                    )}
                    {Math.abs(chip.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {subTitle && (
          <div className="text-xs uppercase text-muted-foreground font-medium pt-2">
            {subTitle}
          </div>
        )}
        
        <div className="pt-2 h-[100px]">
          {chart}
        </div>
        
        {chartLegend && (
          <div className="flex items-center justify-center gap-4 pt-1">
            {chartLegend.map((item, index) => (
              <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                <div 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

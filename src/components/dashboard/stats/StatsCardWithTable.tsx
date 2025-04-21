
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TableItem {
  label: string;
  value: string;
  subLabel?: string;
  change?: number;
}

interface StatsCardWithTableProps {
  title: string;
  value?: string;
  change?: number;
  tooltip?: string;
  viewReportLink?: string;
  subTitle?: string;
  table: TableItem[];
}

export const StatsCardWithTable: React.FC<StatsCardWithTableProps> = ({
  title,
  value,
  change,
  tooltip,
  viewReportLink,
  subTitle,
  table
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
        {value && (
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">{value}</div>
            {change !== undefined && (
              <div className={`flex items-center gap-1 text-sm ${change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {change < 0 ? (
                  <ArrowDown className="h-3 w-3" />
                ) : (
                  <ArrowUp className="h-3 w-3" />
                )}
                <span>{change}%</span>
              </div>
            )}
          </div>
        )}
        
        {subTitle && (
          <div className="text-xs uppercase text-muted-foreground font-medium pt-2">
            {subTitle}
          </div>
        )}
        
        <div className="space-y-2 pt-2">
          {table.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm py-1 border-b border-gray-100 last:border-0">
              <span className="text-gray-600">{item.label}</span>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{item.value}</span>
                  {item.subLabel && (
                    <span className="text-xs text-muted-foreground">{item.subLabel}</span>
                  )}
                </div>
                {item.change !== undefined && (
                  <div className={`flex items-center gap-1 text-xs ${item.change < 0 ? 'text-red-500' : 'text-green-500'} min-w-[40px]`}>
                    {item.change < 0 ? (
                      <ArrowDown className="h-3 w-3 shrink-0" />
                    ) : (
                      <ArrowUp className="h-3 w-3 shrink-0" />
                    )}
                    <span>{Math.abs(item.change).toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

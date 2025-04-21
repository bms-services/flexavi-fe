
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: number;
  isNegativeChange?: boolean;
  tooltip?: string;
  viewReportLink?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  change,
  isNegativeChange,
  tooltip,
  viewReportLink
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
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold">{value}</div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${isNegativeChange ? 'text-red-500' : 'text-green-500'}`}>
              {isNegativeChange ? (
                <ArrowDown className="h-3 w-3" />
              ) : (
                <ArrowUp className="h-3 w-3" />
              )}
              <span>{change}%</span>
            </div>
          )}
        </div>
        {description && (
          <CardDescription className="mt-1 text-xs text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

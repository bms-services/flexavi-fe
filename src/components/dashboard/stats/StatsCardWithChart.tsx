
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chip } from "./Chip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChipData {
  label: string;
  value: string;
  change?: number;
}

interface StatsCardWithChartProps {
  title: string;
  value: string;
  change?: number;
  chipData?: ChipData[];
  subTitle?: string;
  chart?: React.ReactNode;
  viewReportLink?: string;
}

export const StatsCardWithChart = ({
  title,
  value,
  change,
  chipData,
  subTitle,
  chart,
  viewReportLink,
}: StatsCardWithChartProps) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {viewReportLink && (
          <a href={viewReportLink} className="text-xs text-primary hover:underline">
            Bekijk rapport
          </a>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="text-xl font-bold">{value}</div>
            {change && (
              <div className={cn(
                "text-xs",
                change > 0 ? "text-emerald-500" : "text-red-500"
              )}>
                {change > 0 ? "+" : ""}{change}%
              </div>
            )}
          </div>

          {chipData && chipData.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {chipData.map((chip, index) => (
                <Chip key={index} {...chip} />
              ))}
            </div>
          )}

          {subTitle && (
            <div className="text-xs text-muted-foreground uppercase">
              {subTitle}
            </div>
          )}

          {chart && (
            <div className={cn(
              "mt-3",
              isMobile ? "-mx-4" : "mx-0"
            )}>
              {chart}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { LeadConversionRate } from "@/components/dashboard/LeadConversionRate";

interface DashboardChartsProps {
  timeRange: string;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ timeRange }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2 h-[350px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div>
            <CardTitle className="text-base">Omzet overzicht</CardTitle>
            <CardDescription className="text-xs">Omzet per maand gebaseerd op facturen</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 pb-2">
          <div className="w-full h-full">
            <RevenueChart timeRange={timeRange} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="h-[350px] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Lead conversie</CardTitle>
          <CardDescription className="text-xs">Van lead naar betaalde factuur</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-2">
          <div className="w-full h-full">
            <LeadConversionRate timeRange={timeRange} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

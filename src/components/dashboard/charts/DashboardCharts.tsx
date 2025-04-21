
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { LeadConversionRate } from "@/components/dashboard/LeadConversionRate";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardChartsProps {
  timeRange: string;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ timeRange }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg md:text-xl">Omzet overzicht</CardTitle>
            <CardDescription>Omzet per maand gebaseerd op facturen</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 sm:p-4">
          <div className="h-[250px] md:h-[300px] w-full overflow-hidden">
            <RevenueChart timeRange={timeRange} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Lead conversie</CardTitle>
          <CardDescription>Van lead naar betaalde factuur</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-4">
          <div className="h-[200px] md:h-[250px] w-full overflow-hidden">
            <LeadConversionRate timeRange={timeRange} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

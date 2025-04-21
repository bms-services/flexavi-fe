
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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Omzet overzicht</CardTitle>
            <CardDescription>Omzet per maand gebaseerd op facturen</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <RevenueChart timeRange={timeRange} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Lead conversie</CardTitle>
          <CardDescription>Van lead naar betaalde factuur</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadConversionRate timeRange={timeRange} />
        </CardContent>
      </Card>
    </div>
  );
};

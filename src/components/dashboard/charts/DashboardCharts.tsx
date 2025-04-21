
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { LeadConversionRate } from "@/components/dashboard/LeadConversionRate";
import { ScrollContainer } from "@/components/ui/scroll-container";

interface DashboardChartsProps {
  timeRange: string;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ timeRange }) => {
  return (
    <div className="space-y-4">
      <ScrollContainer className="flex-none">
        <Button variant="outline" size="sm">Vandaag</Button>
        <Button variant="outline" size="sm">Deze week</Button>
        <Button variant="outline" size="sm">Deze maand</Button>
        <Button variant="outline" size="sm">Dit kwartaal</Button>
        <Button variant="outline" size="sm">Dit jaar</Button>
      </ScrollContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Omzet overzicht</CardTitle>
              <CardDescription>Omzet per maand gebaseerd op facturen</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px] w-full">
              <RevenueChart timeRange={timeRange} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Lead conversie</CardTitle>
            <CardDescription>Van lead naar betaalde factuur</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px] w-full">
              <LeadConversionRate timeRange={timeRange} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

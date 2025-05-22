
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { ShopifyStyleDashboard } from "@/components/dashboard/ShopifyStyleDashboard";
import { getUpcomingAppointments, getRecentLeads } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, PlusCircle } from "lucide-react";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { DashboardCharts } from "@/components/dashboard/charts/DashboardCharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAppDispatch } from "@/hooks/use-redux";
import CompanyCreateFullPage from "@/components/company/CompanyCreateFullPage";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [timeRange, setTimeRange] = useState("week");
  const [lastUpdated] = useState(new Date());
  const upcomingAppointments = getUpcomingAppointments();
  const recentLeads = getRecentLeads();
  const isMobile = useIsMobile();


  return (
    <div className="container py-3 md:py-6 px-2 md:px-6 space-y-4 md:space-y-6">
      <DashboardHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        lastUpdated={lastUpdated}
      />

      <ShopifyStyleDashboard timeRange={timeRange} />

      <DashboardCharts timeRange={timeRange} />

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className={`grid ${isMobile ? 'w-full' : 'md:w-auto'} grid-cols-2`}>
          <TabsTrigger value="appointments" className="flex items-center gap-1 md:gap-2">
            <Calendar className="h-3 md:h-4 w-3 md:w-4" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis text-xs md:text-sm">
              {isMobile ? "Afspraken" : "Aankomende afspraken"}
            </span>
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-1 md:gap-2">
            <PlusCircle className="h-3 md:h-4 w-3 md:w-4" />
            <span className="text-xs md:text-sm">Recente leads</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="appointments" className="mt-4">
          <UpcomingAppointments appointments={upcomingAppointments} />
        </TabsContent>
        <TabsContent value="leads" className="mt-4">
          <RecentLeads leads={recentLeads} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

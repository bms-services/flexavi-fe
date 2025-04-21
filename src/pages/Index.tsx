
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { ShopifyStyleDashboard } from "@/components/dashboard/ShopifyStyleDashboard";
import { getUpcomingAppointments, getRecentLeads } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, PlusCircle } from "lucide-react";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [lastUpdated] = useState(new Date());
  const upcomingAppointments = getUpcomingAppointments();
  const recentLeads = getRecentLeads();
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="container py-4 sm:py-6 px-4 sm:px-6 space-y-4 sm:space-y-6 max-w-full">
        <DashboardHeader 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          lastUpdated={lastUpdated}
        />

        <ShopifyStyleDashboard timeRange={timeRange} />
        
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className={`grid w-full grid-cols-2 ${isMobile ? 'text-xs' : ''}`}>
            <TabsTrigger value="appointments" className="flex items-center gap-1 sm:gap-2">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Aankomende afspraken</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-1 sm:gap-2">
              <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4" /> 
              <span>Recente leads</span>
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
    </Layout>
  );
};

export default Dashboard;

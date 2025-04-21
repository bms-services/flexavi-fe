
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { getUpcomingAppointments, getRecentLeads } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, PlusCircle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { OverviewStats } from "@/components/dashboard/stats/OverviewStats";
import { DashboardCharts } from "@/components/dashboard/charts/DashboardCharts";
import { InvoiceKPIs } from "@/components/invoices/InvoiceKPIs";
import { ProjectsKPIs } from "@/components/projects/ProjectsKPIs";
import { mockInvoices, mockProjects } from "@/data/mockData";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [lastUpdated] = useState(new Date());
  const upcomingAppointments = getUpcomingAppointments();
  const recentLeads = getRecentLeads();

  const totalInvoiceAmount = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = mockInvoices.filter(inv => inv.status === "paid");
  const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const outstandingAmount = totalInvoiceAmount - paidAmount;

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <DashboardHeader 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          lastUpdated={lastUpdated}
        />

        <DashboardStats timeRange={timeRange} />
        
        <OverviewStats />

        <InvoiceKPIs
          total={totalInvoiceAmount}
          paid={paidAmount}
          outstanding={outstandingAmount}
        />

        <ProjectsKPIs projects={mockProjects} />

        <DashboardCharts timeRange={timeRange} />

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Aankomende afspraken</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> 
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

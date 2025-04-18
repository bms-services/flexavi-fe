
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getUpcomingAppointments, getRecentLeads } from "@/data/mockData";

const Dashboard = () => {
  const upcomingAppointments = getUpcomingAppointments();
  const recentLeads = getRecentLeads();

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overzicht van je leads en aankomende afspraken.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nieuwe Lead
            </Button>
            <Button variant="outline">Rapportages</Button>
          </div>
        </div>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-2">
          <UpcomingAppointments appointments={upcomingAppointments} />
          <div className="space-y-6">
            <RecentLeads leads={recentLeads} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

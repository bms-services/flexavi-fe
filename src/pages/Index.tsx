
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Filter, PlusCircle, RefreshCw } from "lucide-react";
import { getUpcomingAppointments, getRecentLeads } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { LeadConversionRate } from "@/components/dashboard/LeadConversionRate";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const upcomingAppointments = getUpcomingAppointments();
  const recentLeads = getRecentLeads();
  const [timeRange, setTimeRange] = useState("week");
  const [lastUpdated] = useState(new Date());

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overzicht van je leads, omzet en aankomende afspraken
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center text-sm text-muted-foreground gap-1 sm:mr-2">
              <Clock className="h-3.5 w-3.5" />
              <span>Bijgewerkt: {format(lastUpdated, "d MMM HH:mm", { locale: nl })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                <span>Filters</span>
              </Button>
              <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px] h-9 text-sm">
                  <SelectValue placeholder="Periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Deze week</SelectItem>
                  <SelectItem value="month">Deze maand</SelectItem>
                  <SelectItem value="quarter">Dit kwartaal</SelectItem>
                  <SelectItem value="year">Dit jaar</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" className="gap-1.5">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Nieuwe Lead</span>
              </Button>
            </div>
          </div>
        </div>

        <DashboardStats timeRange={timeRange} />

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

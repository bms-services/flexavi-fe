import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Filter, PlusCircle, RefreshCw, Users, Star, Briefcase } from "lucide-react";
import { getUpcomingAppointments, getRecentLeads } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { LeadConversionRate } from "@/components/dashboard/LeadConversionRate";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockEmployees } from "@/data/mockEmployees";
import { mockReviews } from "@/data/mockReviews";
import { mockProjects } from "@/data/mockProjects";
import { mockInvoices } from "@/data/mockInvoices";
import { mockQuotes } from "@/data/mockQuotes";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { ProjectsKPIs } from "@/components/projects/ProjectsKPIs";
import { RecentReviewsWidget } from "@/components/reputation/widgets/RecentReviewsWidget";
import { useReputationManagement } from "@/hooks/useReputationManagement";
import { InvoiceKPIs } from "@/components/invoices/InvoiceKPIs";

const Dashboard = () => {
  const upcomingAppointments = getUpcomingAppointments();
  const recentLeads = getRecentLeads();
  const [timeRange, setTimeRange] = useState("week");
  const [lastUpdated] = useState(new Date());
  const reputation = useReputationManagement();

  const activeEmployees = mockEmployees.filter(emp => emp.active).length;
  const latestReviews = mockReviews.slice(0, 5);

  const totalInvoiceAmount = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = mockInvoices.filter(inv => inv.status === "paid");
  const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const outstandingAmount = totalInvoiceAmount - paidAmount;

  const acceptedQuotes = mockQuotes.filter(quote => quote.status === "accepted").length;
  const totalQuotes = mockQuotes.length;
  const quoteConversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;

  const totalWorkAgreements = mockWorkAgreements.length;
  const activeWorkAgreements = mockWorkAgreements.filter(wa => wa.status === "signed").length;

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
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Offertes</CardTitle>
              <CardDescription>Conversie ratio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quoteConversionRate.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">
                {acceptedQuotes} van {totalQuotes} geaccepteerd
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Werkbonnen</CardTitle>
              <CardDescription>Actieve werkbonnen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeWorkAgreements}</div>
              <p className="text-sm text-muted-foreground">
                Van {totalWorkAgreements} totaal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actieve Teams</CardTitle>
              <CardDescription>Beschikbare teams vandaag</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEmployees.filter(emp => emp.active && emp.teamIds.length > 0).length}</div>
              <p className="text-sm text-muted-foreground">
                Teams in het veld
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Gemiddelde Review</CardTitle>
              <CardDescription>Klanttevredenheid</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(mockReviews.reduce((sum, rev) => sum + rev.rating, 0) / mockReviews.length).toFixed(1)}★
              </div>
              <p className="text-sm text-muted-foreground">
                Over {mockReviews.length} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        <InvoiceKPIs
          total={totalInvoiceAmount}
          paid={paidAmount}
          outstanding={outstandingAmount}
        />

        <ProjectsKPIs projects={mockProjects} />

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

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Medewerkers
                </CardTitle>
                <CardDescription>Actieve medewerkers: {activeEmployees}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEmployees.slice(0, 5).map(employee => (
                  <div key={employee.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {employee.teamIds.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Recente Reviews
                </CardTitle>
                <CardDescription>Laatste klantbeoordelingen</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <RecentReviewsWidget 
                reviews={latestReviews} 
                onUpdateStatus={reputation.updateReviewStatus}
              />
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

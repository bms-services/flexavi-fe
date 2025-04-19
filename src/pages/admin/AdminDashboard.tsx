
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AdminStats } from '@/components/admin/AdminStats';
import { RecentMembers } from '@/components/admin/RecentMembers';
import { SubscriptionOverview } from '@/components/admin/SubscriptionOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Users, CreditCard } from 'lucide-react';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <AdminHeader title="Admin Dashboard" />
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-background border-b w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger 
              value="overview" 
              className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overzicht
            </TabsTrigger>
            <TabsTrigger 
              value="members" 
              className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Users className="h-4 w-4 mr-2" />
              Leden
            </TabsTrigger>
            <TabsTrigger 
              value="subscriptions" 
              className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Abonnementen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats />
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Omzet Overzicht</CardTitle>
                <Select
                  value={timeRange}
                  onValueChange={(value) => setTimeRange(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecteer periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Deze week</SelectItem>
                    <SelectItem value="month">Deze maand</SelectItem>
                    <SelectItem value="quarter">Dit kwartaal</SelectItem>
                    <SelectItem value="year">Dit jaar</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <RevenueChart timeRange={timeRange} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="members">
            <RecentMembers />
          </TabsContent>
          
          <TabsContent value="subscriptions">
            <SubscriptionOverview />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

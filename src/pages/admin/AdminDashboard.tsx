
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

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 space-y-6">
        <AdminHeader title="Admin Dashboard" />
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
        
        <Tabs defaultValue="members" className="space-y-4">
          <TabsList>
            <TabsTrigger value="members">Leden</TabsTrigger>
            <TabsTrigger value="subscriptions">Abonnementen</TabsTrigger>
          </TabsList>
          
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

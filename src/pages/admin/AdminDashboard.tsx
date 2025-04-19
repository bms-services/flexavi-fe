
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
      <div className="container mx-auto py-6 px-4">
        <AdminHeader title="Admin Dashboard" />
        
        <div className="flex gap-6 mt-6">
          <Tabs defaultValue="overview" orientation="vertical" className="w-full">
            <TabsList className="w-48 flex flex-col h-auto space-y-1">
              <TabsTrigger value="overview" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overzicht
              </TabsTrigger>
              <TabsTrigger value="members" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Leden
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Abonnementen
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 space-y-6">
              <TabsContent value="overview" className="m-0">
                <AdminStats />
                <Card className="mt-6">
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
              
              <TabsContent value="members" className="m-0">
                <RecentMembers />
              </TabsContent>
              
              <TabsContent value="subscriptions" className="m-0">
                <SubscriptionOverview />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

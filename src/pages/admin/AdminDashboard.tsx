
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { AdminStats } from '@/components/admin/AdminStats';
import { RecentMembers } from '@/components/admin/RecentMembers';
import { SubscriptionOverview } from '@/components/admin/SubscriptionOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 space-y-6">
        <AdminHeader title="Admin Dashboard" />
        <AdminStats />
        
        <Tabs defaultValue="members" className="space-y-4">
          <TabsList>
            <TabsTrigger value="members">Recent Leden</TabsTrigger>
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

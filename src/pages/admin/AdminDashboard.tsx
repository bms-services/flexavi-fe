import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AdminStats } from '@/components/admin/AdminStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, Users, CreditCard, Package, 
  Handshake, HeadphonesIcon, MessageSquare, Book 
} from 'lucide-react';
import { PackageManagement } from '@/components/admin/PackageManagement';
import { PartnersManagement } from '@/components/admin/PartnersManagement';
import { MembersManagement } from '@/components/admin/MembersManagement';
import { SupportManagement } from '@/components/admin/SupportManagement';
import { SubscriptionOverview } from '@/components/admin/SubscriptionOverview';
import { CommunityManagement } from '@/components/admin/CommunityManagement';
import { KnowledgeBaseManagement } from '@/components/admin/KnowledgeBaseManagement';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <AdminHeader title="Admin Dashboard" />
        
        <div className="flex mt-6 min-h-[calc(100vh-10rem)]">
          <Tabs defaultValue="overview" orientation="vertical" className="flex min-h-full">
            <div className="shrink-0">
              <TabsList className="flex flex-col h-auto space-y-1 min-w-[200px] bg-muted p-2 rounded-l-md">
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
                <TabsTrigger value="packages" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Pakketten
                </TabsTrigger>
                <TabsTrigger value="knowledge-base" className="w-full justify-start">
                  <Book className="h-4 w-4 mr-2" />
                  Kennisbank
                </TabsTrigger>
                <TabsTrigger value="partners" className="w-full justify-start">
                  <Handshake className="h-4 w-4 mr-2" />
                  Partners
                </TabsTrigger>
                <TabsTrigger value="community" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Community
                </TabsTrigger>
                <TabsTrigger value="support" className="w-full justify-start">
                  <HeadphonesIcon className="h-4 w-4 mr-2" />
                  Support
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 border-l bg-background ml-4 pl-6">
              
              <TabsContent value="overview" className="mt-0">
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
              
              <TabsContent value="members" className="mt-0">
                <MembersManagement />
              </TabsContent>
              
              <TabsContent value="subscriptions" className="mt-0">
                <SubscriptionOverview />
              </TabsContent>
              
              <TabsContent value="packages" className="mt-0">
                <PackageManagement />
              </TabsContent>
              
              <TabsContent value="knowledge-base" className="mt-0">
                <KnowledgeBaseManagement />
              </TabsContent>
              
              <TabsContent value="partners" className="mt-0">
                <PartnersManagement />
              </TabsContent>
              
              <TabsContent value="community" className="mt-0">
                <CommunityManagement />
              </TabsContent>
              
              <TabsContent value="support" className="mt-0">
                <SupportManagement />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}


import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReputationDashboard } from "@/components/reputation/ReputationDashboard";
import { ReviewsList } from "@/components/reputation/ReviewsList";
import { TemplatesSettings } from "@/components/reputation/TemplatesSettings";
import { IntegrationsSettings } from "@/components/reputation/IntegrationsSettings";
import { ReputationSettings } from "@/components/reputation/ReputationSettings";
import { useReputationManagement } from "@/hooks/useReputationManagement";

const ReputationManagement = () => {
  const reputation = useReputationManagement();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reputatiebeheer</h1>
            <p className="text-muted-foreground mt-2">
              Beheer en verbeter uw online reputatie door klantreviews
            </p>
          </div>

          <Tabs
            defaultValue="dashboard"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start border-b rounded-none px-0">
              <TabsTrigger value="dashboard" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="templates" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Email Templates
              </TabsTrigger>
              <TabsTrigger value="integrations" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Integraties
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Instellingen
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <ReputationDashboard reputation={reputation} />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewsList reputation={reputation} />
            </TabsContent>

            <TabsContent value="templates">
              <TemplatesSettings reputation={reputation} />
            </TabsContent>

            <TabsContent value="integrations">
              <IntegrationsSettings reputation={reputation} />
            </TabsContent>

            <TabsContent value="settings">
              <ReputationSettings reputation={reputation} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ReputationManagement;

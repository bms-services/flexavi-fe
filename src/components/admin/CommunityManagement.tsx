
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flag, MessageSquare, Shield, User, UserX } from 'lucide-react';
import { ReportedPostsList } from './community/ReportedPostsList';
import { CommunityRules } from './community/CommunityRules';
import { ModeratorsList } from './community/ModeratorsList';
import { BannedUsersList } from './community/BannedUsersList';

export function CommunityManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Community Beheer</h2>
      </div>
      
      <Tabs defaultValue="reports">
        <TabsList className="mb-4">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Meldingen
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Regels
          </TabsTrigger>
          <TabsTrigger value="moderators" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Moderators
          </TabsTrigger>
          <TabsTrigger value="banned" className="flex items-center gap-2">
            <UserX className="h-4 w-4" />
            Geblokkeerde gebruikers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Gerapporteerde berichten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReportedPostsList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Community Regels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CommunityRules />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="moderators">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Moderators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ModeratorsList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="banned">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-5 w-5" />
                Geblokkeerde gebruikers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BannedUsersList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentMembers } from './RecentMembers';

export function MembersManagement() {
  const handleMakeAdmin = (memberId: number) => {
    // In a real app, this would call an API to update user roles
    console.log('Making user admin:', memberId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Ledenbeheer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RecentMembers onMakeAdmin={handleMakeAdmin} />
      </CardContent>
    </Card>
  );
}

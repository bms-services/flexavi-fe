
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeadphonesIcon } from 'lucide-react';
import { useSupportTickets } from '@/hooks/useSupportTickets';
import { SupportTicketsTable } from '@/components/support/SupportTicketsTable';

export function SupportManagement() {
  const { tickets, loading, deleteTicket } = useSupportTickets();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeadphonesIcon className="h-5 w-5" />
          Support Tickets
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Support tickets laden...</p>
          </div>
        ) : (
          <SupportTicketsTable tickets={tickets} onDelete={deleteTicket} />
        )}
      </CardContent>
    </Card>
  );
}

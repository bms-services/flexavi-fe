
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard } from 'lucide-react';
import { SubscriptionTable } from './subscription/SubscriptionTable';
import { SubscriptionDialog } from './subscription/SubscriptionDialog';
import { Subscription } from '@/types/subscription';

export function SubscriptionOverview() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  // Mock data - replace with real data later
  const subscriptions: Subscription[] = [
    {
      id: '1',
      customerName: 'John Doe',
      email: 'john@example.com',
      plan: 'Professional',
      status: 'active',
      startDate: '2024-01-01',
      nextBilling: '2024-05-01',
      amount: 59.99,
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      plan: 'Enterprise',
      status: 'active',
      startDate: '2024-02-15',
      nextBilling: '2024-05-15',
      amount: 99.99,
    },
  ];

  const handleEdit = (id: string) => {
    const subscription = subscriptions.find(s => s.id === id) || null;
    setSelectedSubscription(subscription);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete subscription:', id);
  };

  const handleSave = (data: Subscription) => {
    // Implement save functionality
    console.log('Save subscription:', data);
    setDialogOpen(false);
    setSelectedSubscription(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Abonnementen Beheer
        </CardTitle>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nieuw Abonnement
        </Button>
      </CardHeader>
      <CardContent>
        <SubscriptionTable
          subscriptions={subscriptions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>

      <SubscriptionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        subscription={selectedSubscription}
      />
    </Card>
  );
}

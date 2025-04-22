
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format } from 'date-fns';

interface Subscription {
  id: string;
  customerName: string;
  email: string;
  plan: string;
  status: 'active' | 'cancelled' | 'past_due';
  startDate: Date;
  nextBilling: Date;
  amount: number;
}

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SubscriptionTable({ subscriptions, onEdit, onDelete }: SubscriptionTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      case 'past_due':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Klant</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Datum</TableHead>
            <TableHead>Volgende Facturering</TableHead>
            <TableHead>Bedrag</TableHead>
            <TableHead className="text-right">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell>{subscription.customerName}</TableCell>
              <TableCell>{subscription.email}</TableCell>
              <TableCell>{subscription.plan}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(subscription.status)}>
                  {subscription.status === 'active' ? 'Actief' : 
                   subscription.status === 'cancelled' ? 'Geannuleerd' : 'Te laat'}
                </Badge>
              </TableCell>
              <TableCell>{format(subscription.startDate, 'dd/MM/yyyy')}</TableCell>
              <TableCell>{format(subscription.nextBilling, 'dd/MM/yyyy')}</TableCell>
              <TableCell>€{subscription.amount.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(subscription.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(subscription.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

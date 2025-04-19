
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export function SubscriptionOverview() {
  const subscriptions = [
    { plan: 'Starter', total: 85, active: 80, revenue: '2,465' },
    { plan: 'Professional', total: 120, active: 115, revenue: '6,785' },
    { plan: 'Enterprise', total: 40, active: 38, revenue: '3,762' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Abonnementen Overzicht</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan</TableHead>
              <TableHead>Totaal Leden</TableHead>
              <TableHead>Actieve Leden</TableHead>
              <TableHead>Maandelijkse Omzet</TableHead>
              <TableHead>Bezettingsgraad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.plan}>
                <TableCell className="font-medium">{sub.plan}</TableCell>
                <TableCell>{sub.total}</TableCell>
                <TableCell>{sub.active}</TableCell>
                <TableCell>€{sub.revenue}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {Math.round((sub.active / sub.total) * 100)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function RecentMembers() {
  const members = [
    { id: 1, name: 'Jan Jansen', email: 'jan@dakbedrijf.nl', plan: 'Professional', status: 'active', joined: '2024-04-15' },
    { id: 2, name: 'Piet Peters', email: 'piet@dakwerk.nl', plan: 'Starter', status: 'active', joined: '2024-04-14' },
    { id: 3, name: 'Klaas Krol', email: 'klaas@dakexpert.nl', plan: 'Enterprise', status: 'active', joined: '2024-04-13' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recente Leden</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naam</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Abonnement</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lid Sinds</TableHead>
              <TableHead>Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.plan}</TableCell>
                <TableCell>
                  <Badge variant={member.status === 'active' ? 'success' : 'destructive'}>
                    {member.status === 'active' ? 'Actief' : 'Inactief'}
                  </Badge>
                </TableCell>
                <TableCell>{member.joined}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Beheren</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

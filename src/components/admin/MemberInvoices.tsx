
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface MemberInvoicesProps {
  memberId: number;
}

export function MemberInvoices({ memberId }: MemberInvoicesProps) {
  // Mock invoice data - in a real application, you would fetch this from your API
  const invoices = [
    { 
      id: 'INV-001', 
      date: '2025-04-01', 
      amount: 49.99, 
      status: 'paid', 
      description: 'Abonnement April 2025' 
    },
    { 
      id: 'INV-002', 
      date: '2025-03-01', 
      amount: 49.99, 
      status: 'paid', 
      description: 'Abonnement Maart 2025' 
    },
    { 
      id: 'INV-003', 
      date: '2025-02-01', 
      amount: 49.99, 
      status: 'paid', 
      description: 'Abonnement Februari 2025' 
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Betaald</Badge>;
      case 'unpaid':
        return <Badge variant="destructive">Onbetaald</Badge>;
      case 'processing':
        return <Badge variant="warning">In behandeling</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="py-4">
      {invoices.length === 0 ? (
        <p className="text-center text-muted-foreground">Geen facturen gevonden voor dit lid.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Factuur ID</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Omschrijving</TableHead>
              <TableHead>Bedrag</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>€{invoice.amount.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Bekijken
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

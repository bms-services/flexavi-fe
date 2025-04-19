
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Send, Mail, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface MemberInvoicesProps {
  memberId: number;
}

export function MemberInvoices({ memberId }: MemberInvoicesProps) {
  const { toast } = useToast();
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock invoice data - in a real application, you would fetch this from your API
  const invoices = [
    { 
      id: 'INV-001', 
      date: '2025-04-01', 
      amount: 49.99, 
      status: 'paid', 
      description: 'Abonnement April 2025',
      customerName: 'Jan Jansen',
      customerEmail: 'jan@example.com'
    },
    { 
      id: 'INV-002', 
      date: '2025-03-01', 
      amount: 49.99, 
      status: 'paid', 
      description: 'Abonnement Maart 2025',
      customerName: 'Jan Jansen',
      customerEmail: 'jan@example.com'
    },
    { 
      id: 'INV-003', 
      date: '2025-02-01', 
      amount: 49.99, 
      status: 'paid', 
      description: 'Abonnement Februari 2025',
      customerName: 'Jan Jansen',
      customerEmail: 'jan@example.com'
    },
  ];

  const handleSendInvoice = (invoiceId: string) => {
    // Here you would implement the actual email sending logic
    toast({
      title: "Factuur verstuurd",
      description: `Factuur ${invoiceId} is opnieuw naar de klant verstuurd.`
    });
  };

  const handleSendAllInvoices = () => {
    // Here you would implement sending all invoices
    toast({
      title: "Alle facturen verstuurd",
      description: "Alle facturen zijn opnieuw naar de klant verstuurd."
    });
  };

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

  const filteredInvoices = invoices.filter(invoice => {
    const matchesText = filterText.toLowerCase() === '' || 
      invoice.customerName.toLowerCase().includes(filterText.toLowerCase()) ||
      invoice.customerEmail.toLowerCase().includes(filterText.toLowerCase()) ||
      invoice.id.toLowerCase().includes(filterText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesText && matchesStatus;
  });

  return (
    <div className="py-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Zoeken op naam, email..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter op status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="paid">Betaald</SelectItem>
              <SelectItem value="unpaid">Onbetaald</SelectItem>
              <SelectItem value="processing">In behandeling</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          variant="outline" 
          onClick={handleSendAllInvoices}
          className="ml-4"
        >
          <Mail className="mr-2 h-4 w-4" />
          Stuur alle facturen
        </Button>
      </div>

      {filteredInvoices.length === 0 ? (
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
              <TableHead>Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>€{invoice.amount.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="ghost" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Bekijken
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSendInvoice(invoice.id)}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Stuur naar klant
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

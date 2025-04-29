
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockQuotes } from "@/data/mockQuotes";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { mockInvoices } from "@/data/mockInvoices";
import { WorkOrdersList } from '@/components/customer-portal/workorders/WorkOrdersList';
import { CustomerPortalLayout } from '@/components/customer-portal/layout/CustomerPortalLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronRight, Clipboard, CreditCard } from 'lucide-react';

// Mock data for work orders
const mockWorkOrders = [
  {
    id: "WO-001",
    description: "Installatie zonnepanelen",
    status: "planned",
    createdAt: "2025-04-20T10:00:00Z",
    plannedStartDate: "2025-05-01T08:00:00Z"
  },
  {
    id: "WO-002",
    description: "Dakrenovatie",
    status: "in_progress",
    createdAt: "2025-04-19T14:30:00Z",
    plannedStartDate: "2025-04-22T08:00:00Z"
  }
];

const CustomerDashboard = () => {
  const navigate = useNavigate();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const handleNavigateToQuote = (id: string) => {
    navigate(`/portal/quotes/${id}`);
  };

  const handleNavigateToInvoice = (id: string) => {
    navigate(`/portal/invoices/${id}`);
  };

  return (
    <CustomerPortalLayout
      title="Mijn Dashboard"
      subtitle="Bekijk uw lopende offertes, facturen en werkzaamheden"
    >
      <div className="space-y-8">
        {/* Welkom kaart */}
        <Card className="border shadow-sm bg-gradient-to-r from-primary/5 to-white">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Welkom bij uw persoonlijke portaal</h2>
            <p className="text-muted-foreground mb-4">
              Via dit dashboard kunt u uw offertes, facturen en werkzaamheden bekijken en beheren.
              Heeft u vragen? Neem gerust contact met ons op.
            </p>
            <Button variant="outline" className="mt-2">Contact Opnemen</Button>
          </CardContent>
        </Card>

        {/* Lopende Werkopdrachten */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Clipboard className="mr-2 h-5 w-5 text-primary" />
              Lopende Werkzaamheden
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Alle Werkzaamheden <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <WorkOrdersList workOrders={mockWorkOrders} />
        </div>

        {/* Recente Offertes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Recente Offertes
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Alle Offertes <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {mockQuotes.slice(0, 3).map((quote) => (
              <Card 
                key={quote.id}
                className="border shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleNavigateToQuote(quote.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    Offerte #{quote.id.replace("quote-", "")}
                  </CardTitle>
                  <CardDescription>{quote.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4 pt-0">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {new Date(quote.createdAt).toLocaleDateString('nl-NL')}
                    </div>
                    <div className="font-medium text-primary">
                      {formatCurrency(quote.amount)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recente Facturen */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Recente Facturen
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Alle Facturen <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {mockInvoices.slice(0, 3).map((invoice) => (
              <Card 
                key={invoice.id}
                className="border shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleNavigateToInvoice(invoice.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    Factuur #{invoice.id.replace("inv-", "")}
                  </CardTitle>
                  <CardDescription>{invoice.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4 pt-0">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {new Date(invoice.createdAt).toLocaleDateString('nl-NL')}
                    </div>
                    <div className="font-medium text-primary">
                      {formatCurrency(invoice.amount)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerDashboard;

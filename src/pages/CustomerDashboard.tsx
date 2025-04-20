
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockQuotes } from "@/data/mockQuotes";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { mockInvoices } from "@/data/mockInvoices";
import { WorkOrdersList } from '@/components/customer-portal/workorders/WorkOrdersList';

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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary">Klantportaal</h1>
            <p className="text-muted-foreground">
              Bekijk hier uw offertes, facturen en werkopdrachten.
            </p>
          </div>

          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-xl text-primary">Werkopdrachten</CardTitle>
              <CardDescription>
                Overzicht van al uw werkopdrachten
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white pt-6">
              <WorkOrdersList workOrders={mockWorkOrders} />
            </CardContent>
          </Card>

          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-xl text-primary">Offertes</CardTitle>
              <CardDescription>
                Bekijk en beheer uw offertes
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white pt-6">
              <div className="space-y-4">
                {mockQuotes.slice(0, 3).map((quote) => (
                  <div
                    key={quote.id}
                    className="p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer bg-white"
                    onClick={() => window.location.href = `/portal/quote/${quote.id}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-primary">{quote.description}</h3>
                        <p className="text-sm text-muted-foreground">
                          Offerte #{quote.id.replace("quote-", "")}
                        </p>
                      </div>
                      <p className="font-medium">{formatCurrency(quote.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-xl text-primary">Facturen</CardTitle>
              <CardDescription>
                Bekijk en beheer uw facturen
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white pt-6">
              <div className="space-y-4">
                {mockInvoices.slice(0, 3).map((invoice) => (
                  <div
                    key={invoice.id}
                    className="p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer bg-white"
                    onClick={() => window.location.href = `/portal/invoice/${invoice.id}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-primary">{invoice.description}</h3>
                        <p className="text-sm text-muted-foreground">
                          Factuur #{invoice.id.replace("invoice-", "")}
                        </p>
                      </div>
                      <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

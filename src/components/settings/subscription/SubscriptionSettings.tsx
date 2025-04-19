
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockInvoices } from "@/data/mockInvoices";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, FileText, ArrowUpCircle, AlertCircle } from "lucide-react";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";
import { InvoiceStatus } from "@/types";

export const SubscriptionSettings = () => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState("basic");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const plans = [
    { 
      id: "basic", 
      name: "Basis", 
      price: "€29,99", 
      period: "maand", 
      features: [
        "Maximaal 10 leads per maand",
        "Maximaal 5 offertes per maand",
        "Maximaal 5 facturen per maand",
        "Geen werkovereenkomsten",
        "Beperkte email templates"
      ],
      isCurrent: currentPlan === "basic"
    },
    { 
      id: "pro", 
      name: "Pro", 
      price: "€59,99", 
      period: "maand", 
      features: [
        "Onbeperkt aantal leads",
        "Maximaal 25 offertes per maand",
        "Maximaal 25 facturen per maand",
        "10 werkovereenkomsten",
        "Alle email templates"
      ],
      isCurrent: currentPlan === "pro"
    },
    { 
      id: "enterprise", 
      name: "Enterprise", 
      price: "€99,99", 
      period: "maand", 
      features: [
        "Onbeperkt aantal leads",
        "Onbeperkt aantal offertes",
        "Onbeperkt aantal facturen",
        "Onbeperkt aantal werkovereenkomsten",
        "Aangepaste email templates",
        "Prioriteit support",
        "Aangepaste branding"
      ],
      isCurrent: currentPlan === "enterprise"
    }
  ];

  const handleUpgrade = (planId: string) => {
    if (planId === currentPlan) {
      toast({
        title: "Dit is je huidige abonnement",
        description: "Je gebruikt dit abonnement al.",
      });
      return;
    }

    // Normally here we would make an API call to upgrade the subscription
    toast({
      title: "Abonnement gewijzigd",
      description: `Je abonnement is gewijzigd naar ${plans.find(p => p.id === planId)?.name}.`,
    });
    setCurrentPlan(planId);
  };

  const handleCancelSubscription = () => {
    // Show a confirmation dialog in a real application
    toast({
      title: "Abonnement opgezegd",
      description: "Je abonnement is opgezegd en loopt af aan het einde van de huidige periode.",
      variant: "destructive",
    });
  };

  // Filter invoices to show only the most recent 5
  const recentInvoices = mockInvoices.slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Abonnement</CardTitle>
              <CardDescription>
                Bekijk en beheer je huidige abonnement
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Huidige abonnement</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative overflow-hidden ${plan.isCurrent ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}`}
                >
                  {plan.isCurrent && (
                    <div className="absolute top-0 right-0">
                      <Badge className="rounded-tl-none rounded-br-none">Huidige plan</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-primary">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {plan.isCurrent ? (
                      <Button variant="outline" className="w-full" disabled>
                        Huidige plan
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => handleUpgrade(plan.id)}
                      >
                        <ArrowUpCircle className="mr-2 h-4 w-4" />
                        {currentPlan === "basic" && plan.id === "pro" && "Upgrade naar Pro"}
                        {currentPlan === "basic" && plan.id === "enterprise" && "Upgrade naar Enterprise"}
                        {currentPlan === "pro" && plan.id === "basic" && "Downgrade naar Basis"}
                        {currentPlan === "pro" && plan.id === "enterprise" && "Upgrade naar Enterprise"}
                        {currentPlan === "enterprise" && plan.id === "basic" && "Downgrade naar Basis"}
                        {currentPlan === "enterprise" && plan.id === "pro" && "Downgrade naar Pro"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              variant="destructive" 
              onClick={handleCancelSubscription}
              className="flex items-center"
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Abonnement opzeggen
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Bij opzegging blijft je abonnement actief tot het einde van de huidige facturatieperiode.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Factuurgeschiedenis</CardTitle>
              <CardDescription>
                Bekijk en download je eerdere facturen
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Factuurnr.</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Bedrag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((invoice) => {
                const statusBadge = useInvoiceStatusBadge(invoice.status as InvoiceStatus);
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.id.replace('inv-', 'FACT-')}
                    </TableCell>
                    <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`/portal/invoice/${invoice.id}`, '_blank')}
                      >
                        Bekijken
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {recentInvoices.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">
              Geen facturen gevonden.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

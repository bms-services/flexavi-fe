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

    toast({
      title: "Abonnement gewijzigd",
      description: `Je abonnement is gewijzigd naar ${plans.find(p => p.id === planId)?.name}.`,
    });
    setCurrentPlan(planId);
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Abonnement opgezegd",
      description: "Je abonnement is opgezegd en loopt af aan het einde van de huidige periode.",
      variant: "destructive",
    });
  };

  const recentInvoices = mockInvoices.slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-500" />
              <div>
                <CardTitle>Huidig abonnement</CardTitle>
                <CardDescription className="text-purple-700">
                  {plans.find(p => p.id === currentPlan)?.name} plan
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
              €{plans.find(p => p.id === currentPlan)?.price}/maand
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
              plan.isCurrent 
                ? 'border-purple-400 ring-2 ring-purple-100' 
                : 'hover:border-purple-200'
            }`}
          >
            {plan.isCurrent && (
              <div className="absolute -right-12 top-6 rotate-45 bg-purple-500 text-white px-12 py-1 text-sm">
                Actief
              </div>
            )}
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>{plan.name}</span>
                <Badge variant="secondary" className={
                  plan.isCurrent ? 'bg-purple-100 text-purple-700' : 'bg-gray-100'
                }>
                  {plan.price}/{plan.period}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 min-h-[280px]">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-purple-500 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-gray-50">
              <Button 
                className={`w-full ${
                  plan.isCurrent 
                    ? 'bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-default'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
                onClick={() => handleUpgrade(plan.id)}
                disabled={plan.isCurrent}
              >
                <ArrowUpCircle className="mr-2 h-4 w-4" />
                {plan.isCurrent ? 'Huidig plan' : 'Upgrade'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <div>
              <CardTitle>Factuurgeschiedenis</CardTitle>
              <CardDescription>
                Bekijk en download je eerdere facturen
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
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
                    <TableRow key={invoice.id} className="hover:bg-gray-50">
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
          </div>

          {recentInvoices.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">
              Geen facturen gevonden.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Abonnement opzeggen</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Bij opzegging blijft je abonnement actief tot het einde van de huidige facturatieperiode.
            Je kunt altijd weer een nieuw abonnement afsluiten.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="destructive" 
            onClick={handleCancelSubscription}
            className="flex items-center"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Abonnement opzeggen
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};


import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { formatEuro } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface DocumentsTabsPanelProps {
  activeTab: string;
  setActiveTab: (v: string) => void;
  quotes: any[];
  invoices: any[];
  workAgreements: any[];
  getStatusColor: (status: string) => string;
}

export const DocumentsTabsPanel: React.FC<DocumentsTabsPanelProps> = ({
  activeTab,
  setActiveTab,
  quotes,
  invoices,
  workAgreements,
  getStatusColor,
}) => {
  const navigate = useNavigate();
  
  const handleQuoteClick = (quoteId: string) => {
    navigate(`/quotes/edit/${quoteId}`);
  };
  
  const handleInvoiceClick = (invoiceId: string) => {
    navigate(`/invoices/edit/${invoiceId}`);
  };
  
  const handleWorkOrderClick = (workOrderId: string) => {
    navigate(`/workagreements/${workOrderId}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Documenten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quotes" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="quotes">Offertes ({quotes.length})</TabsTrigger>
            <TabsTrigger value="invoices">Facturen ({invoices.length})</TabsTrigger>
            <TabsTrigger value="workorders">Werkopdrachten ({workAgreements.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="quotes">
            {quotes.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Omschrijving</TableHead>
                    <TableHead>Bedrag</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map(quote => (
                    <TableRow 
                      key={quote.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleQuoteClick(quote.id)}
                    >
                      <TableCell className="font-medium truncate max-w-[200px]">{quote.description}</TableCell>
                      <TableCell>{formatEuro(quote.amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-muted-foreground italic text-sm">
                Geen offertes gevonden voor deze klant.
              </div>
            )}
          </TabsContent>
          <TabsContent value="invoices">
            {invoices.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Omschrijving</TableHead>
                    <TableHead>Bedrag</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map(invoice => (
                    <TableRow 
                      key={invoice.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleInvoiceClick(invoice.id)}
                    >
                      <TableCell className="font-medium truncate max-w-[200px]">{invoice.description}</TableCell>
                      <TableCell>{formatEuro(invoice.amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-muted-foreground italic text-sm">
                Geen facturen gevonden voor deze klant.
              </div>
            )}
          </TabsContent>
          <TabsContent value="workorders">
            {workAgreements.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Omschrijving</TableHead>
                    <TableHead>Bedrag</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workAgreements.map(agreement => (
                    <TableRow 
                      key={agreement.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleWorkOrderClick(agreement.id)}
                    >
                      <TableCell className="font-medium truncate max-w-[200px]">{agreement.description}</TableCell>
                      <TableCell>{formatEuro(agreement.totalAmount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(agreement.status)}>{agreement.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-muted-foreground italic text-sm">
                Geen werkopdrachten gevonden voor deze klant.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

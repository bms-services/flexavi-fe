
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { QuoteDetails } from "./QuoteDetails";
import { QuoteLineItems } from "./QuoteLineItems";
import { formatCurrency } from "@/utils/format";
import { GeneralTerms } from "@/components/workagreements/customer-portal/components/GeneralTerms";
import { WarrantySection } from "./WarrantySection";
import { Attachments } from "@/components/workagreements/customer-portal/components/Attachments";
import { Separator } from "@/components/ui/separator";
import { CompanyDetails } from "@/components/workagreements/customer-portal/components/CompanyDetails";
import { QuotePortalHeader } from "./QuotePortalHeader";

interface QuotePortalContentProps {
  quote: any;
  customer: any;
  companyDetails: any;
  demoAttachments: any[];
}

export const QuotePortalContent = ({ 
  quote, 
  customer, 
  companyDetails,
  demoAttachments 
}: QuotePortalContentProps) => {
  return (
    <Card className="border shadow-md bg-white">
      <CardHeader className="border-b pb-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <QuotePortalHeader 
          quoteId={quote.id}
          description={quote.description}
          status={quote.status}
        />
      </CardHeader>
      
      <CardContent className="py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CompanyDetails companyDetails={companyDetails} />
          <QuoteDetails customer={customer} quote={quote} formatCurrency={formatCurrency} />
        </div>
        
        <Separator className="my-8" />
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Specificatie</h3>
          <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
            <QuoteLineItems lineItems={quote.lineItems} formatCurrency={formatCurrency} />
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <WarrantySection warranty="Op alle installatie werkzaamheden geven wij 5 jaar garantie. Op de gebruikte materialen is de fabrieksgarantie van toepassing." />
        
        <Attachments defaultAttachments={demoAttachments} />
        
        <GeneralTerms />
      </CardContent>
      
      <CardFooter className="flex justify-between space-x-4 border-t py-6 bg-gray-50">
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Afdrukken
        </Button>
        <Button variant="default">
          <Download className="mr-2 h-4 w-4" />
          Download offerte
        </Button>
      </CardFooter>
    </Card>
  );
};

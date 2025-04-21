
import React from "react";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

interface InvoiceKPIsProps {
  total: number;
  paid: number;
  outstanding: number;
}

export const InvoiceKPIs: React.FC<InvoiceKPIsProps> = ({ total, paid, outstanding }) => (
  <div className="pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
    <Card>
      <CardContent className="py-4 flex flex-col items-center">
        <CardTitle className="text-lg">Totaal Gefactureerd</CardTitle>
        <span className="text-2xl font-bold">{formatCurrency(total)}</span>
        <CardDescription>Totaal bedrag gefactureerd</CardDescription>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="py-4 flex flex-col items-center">
        <CardTitle className="text-lg">Totaal Betaald</CardTitle>
        <span className="text-2xl font-bold">{formatCurrency(paid)}</span>
        <CardDescription>Betaalde facturen</CardDescription>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="py-4 flex flex-col items-center">
        <CardTitle className="text-lg">Nog te ontvangen</CardTitle>
        <span className="text-2xl font-bold">{formatCurrency(outstanding)}</span>
        <CardDescription>Openstaand & te laat</CardDescription>
      </CardContent>
    </Card>
  </div>
);


import React from "react";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatEuro } from "@/utils/format";
import { UseQueryResult } from "@tanstack/react-query";
import { ApiError, ApiSuccess } from "@/zustand/types/apiT";
import { InvoiceSummaryRes } from "@/zustand/types/invoiceT";

interface InvoiceKPIsProps {
  getInvoiceSummaryZ: UseQueryResult<ApiSuccess<InvoiceSummaryRes>, ApiError>;
}

export const InvoiceKPIs: React.FC<InvoiceKPIsProps> = ({ getInvoiceSummaryZ }) => {
  const { isLoading, isError, data } = getInvoiceSummaryZ;

  if (isLoading) return (
    // card
    <div className="pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Card className="animate-pulse">
        <CardContent className="py-4 flex flex-col items-center">
          <CardTitle className="text-lg">Loading...</CardTitle>
          <span className="text-2xl font-bold">€0,00</span>
          <CardDescription>Loading...</CardDescription>
        </CardContent>
      </Card>
      <Card className="animate-pulse">
        <CardContent className="py-4 flex flex-col items-center">
          <CardTitle className="text-lg">Loading...</CardTitle>
          <span className="text-2xl font-bold">€0,00</span>
          <CardDescription>Loading...</CardDescription>
        </CardContent>
      </Card>
      <Card className="animate-pulse">
        <CardContent className="py-4 flex flex-col items-center">
          <CardTitle className="text-lg">Loading...</CardTitle>
          <span className="text-2xl font-bold">€0,00</span>
          <CardDescription>Loading...</CardDescription>
        </CardContent>
      </Card>
    </div>
  );

  if (isError || !data) return <div></div>;

  const { total_amount, total_paid, total_open } = data.result;

  return (
    <div className="pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Card>
        <CardContent className="py-4 flex flex-col items-center">
          <CardTitle className="text-lg">Totaal Gefactureerd</CardTitle>
          <span className="text-2xl font-bold">{formatEuro(total_amount)}</span>
          <CardDescription>Totaal bedrag gefactureerd</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4 flex flex-col items-center">
          <CardTitle className="text-lg">Totaal Betaald</CardTitle>
          <span className="text-2xl font-bold">{formatEuro(total_paid)}</span>
          <CardDescription>Betaalde facturen</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4 flex flex-col items-center">
          <CardTitle className="text-lg">Nog te ontvangen</CardTitle>
          <span className="text-2xl font-bold">{formatEuro(total_open)}</span>
          <CardDescription>Openstaand & te laat</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};
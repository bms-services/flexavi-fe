
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockQuotes, mockWorkAgreements, mockEmployees, mockReviews } from "@/data/mockData";

export const OverviewStats = () => {
  const acceptedQuotes = mockQuotes.filter(quote => quote.status === "accepted").length;
  const totalQuotes = mockQuotes.length;
  const quoteConversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;

  const totalWorkAgreements = mockWorkAgreements.length;
  const activeWorkAgreements = mockWorkAgreements.filter(wa => wa.status === "signed").length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Offertes</CardTitle>
          <CardDescription>Conversie ratio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{quoteConversionRate.toFixed(1)}%</div>
          <p className="text-sm text-muted-foreground">
            {acceptedQuotes} van {totalQuotes} geaccepteerd
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Werkbonnen</CardTitle>
          <CardDescription>Actieve werkbonnen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeWorkAgreements}</div>
          <p className="text-sm text-muted-foreground">
            Van {totalWorkAgreements} totaal
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Actieve Teams</CardTitle>
          <CardDescription>Beschikbare teams vandaag</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockEmployees.filter(emp => emp.teamIds.length > 0).length}</div>
          <p className="text-sm text-muted-foreground">
            Teams in het veld
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Gemiddelde Review</CardTitle>
          <CardDescription>Klanttevredenheid</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(mockReviews.reduce((sum, rev) => sum + rev.rating, 0) / mockReviews.length).toFixed(1)}★
          </div>
          <p className="text-sm text-muted-foreground">
            Over {mockReviews.length} reviews
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

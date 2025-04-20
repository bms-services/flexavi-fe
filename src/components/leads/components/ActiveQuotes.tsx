
import React, { useState } from "react";
import { Quote } from "@/types";
import { formatCurrency } from "@/utils/leadStats";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { QuoteStatusBadge } from "../badges/QuoteStatusBadge";
import { QuoteDetailsDialog } from "../dialogs/QuoteDetailsDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActiveQuotesProps {
  quotes: Quote[];
}

export const ActiveQuotes: React.FC<ActiveQuotesProps> = ({ quotes }) => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  
  const activeQuotes = quotes.filter(
    quote => quote.status === 'sent' || quote.status === 'revised'
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-500" />
          Lopende Offertes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeQuotes.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">
            Geen lopende offertes
          </div>
        ) : (
          <div className="space-y-3">
            {activeQuotes.map(quote => (
              <div
                key={quote.id}
                className="bg-white p-4 rounded-md border border-gray-100 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setSelectedQuote(quote)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{quote.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(quote.createdAt), "d MMMM yyyy", { locale: nl })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-primary">
                      {formatCurrency(quote.amount)}
                    </p>
                    <QuoteStatusBadge status={quote.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {selectedQuote && (
        <QuoteDetailsDialog
          quote={selectedQuote}
          open={Boolean(selectedQuote)}
          onOpenChange={(open) => !open && setSelectedQuote(null)}
        />
      )}
    </Card>
  );
};

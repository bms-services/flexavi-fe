
import React, { useState } from "react";
import { Quote, Invoice } from "@/types";
import { Activity } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { formatCurrency } from "@/utils/leadStats";
import { Badge } from "@/components/ui/badge";
import { useQuoteStatusBadge, useInvoiceStatusBadge } from "@/hooks/useStatusBadge";
import { QuoteDetailsDialog } from "../dialogs/QuoteDetailsDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivitiesProps {
  activities: (Quote | Invoice)[];
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const [selectedActivity, setSelectedActivity] = useState<Quote | Invoice | null>(null);
  
  const recentActivities = activities
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const handleClick = (activity: Quote | Invoice) => {
    setSelectedActivity(activity);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Recente Activiteiten
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentActivities.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">
            Geen recente activiteiten
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const isQuote = 'description' in activity;
              const statusConfig = isQuote 
                ? useQuoteStatusBadge((activity as Quote).status)
                : useInvoiceStatusBadge((activity as Invoice).status);
              
              return (
                <div
                  key={activity.id}
                  className="bg-white p-4 rounded-md border border-gray-100 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleClick(activity)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {isQuote ? 'Offerte:' : 'Factuur:'} {activity.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(activity.createdAt), "d MMMM yyyy", { locale: nl })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(activity.amount)}</p>
                      {statusConfig && <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      {selectedActivity && 'description' in selectedActivity && (
        <QuoteDetailsDialog
          quote={selectedActivity as Quote}
          open={Boolean(selectedActivity)}
          onOpenChange={(open) => !open && setSelectedActivity(null)}
        />
      )}
    </Card>
  );
};

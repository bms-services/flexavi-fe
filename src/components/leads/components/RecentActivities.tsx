
import React from "react";
import { Quote, Invoice, QuoteStatus, InvoiceStatus } from "@/types";
import { Activity } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { formatCurrency } from "@/utils/leadStats";
import { Badge } from "@/components/ui/badge";
import { useQuoteStatusBadge, useInvoiceStatusBadge } from "@/hooks/useStatusBadge";

interface RecentActivitiesProps {
  activities: (Quote | Invoice)[];
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const recentActivities = activities
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="mt-6 bg-white/70 p-4 rounded-lg border border-gray-100">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-500" />
        Recente Activiteiten
      </h3>
      <div className="space-y-3">
        {recentActivities.map((activity) => {
          const isQuote = 'description' in activity;
          const statusConfig = isQuote 
            ? useQuoteStatusBadge((activity as Quote).status)
            : useInvoiceStatusBadge((activity as Invoice).status);
          
          return (
            <div key={activity.id} className="flex justify-between items-center bg-white p-3 rounded-md border border-gray-100">
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
          );
        })}
      </div>
    </div>
  );
};

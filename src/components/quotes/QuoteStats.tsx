
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

// Dummy data for views, we'll use this until we implement real tracking
const getDummyViews = (quoteId: string) => {
  // Use consistent seed based on quoteId to get the same views every time
  const seed = quoteId.charCodeAt(quoteId.length - 1);
  const viewCount = (seed % 5) + 1;
  
  return Array.from({ length: viewCount }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index - 1);
    
    return {
      id: `view-${quoteId}-${index}`,
      date: date.toISOString(),
      ipAddress: `192.168.${seed}.${index + 1}`,
      userAgent: index % 2 === 0 
        ? "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)" 
        : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    };
  });
};

interface QuoteStatsProps {
  quoteId: string;
}

export const QuoteStats: React.FC<QuoteStatsProps> = ({ quoteId }) => {
  const views = getDummyViews(quoteId);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Offerte statistieken</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Deze offerte is {views.length}x bekeken door de klant</p>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Tijd</TableHead>
                <TableHead className="hidden md:table-cell">IP Adres</TableHead>
                <TableHead className="hidden md:table-cell">Apparaat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {views.map((view) => (
                <TableRow key={view.id}>
                  <TableCell>{format(new Date(view.date), "dd-MM-yyyy", { locale: nl })}</TableCell>
                  <TableCell>{format(new Date(view.date), "HH:mm", { locale: nl })}</TableCell>
                  <TableCell className="hidden md:table-cell">{view.ipAddress}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {view.userAgent.includes("iPhone") ? "Mobile (iOS)" : "Desktop (Windows)"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

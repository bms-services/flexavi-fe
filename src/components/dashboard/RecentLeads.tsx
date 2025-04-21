
import React from "react";
import { Lead } from "@/types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecentLeadsProps {
  leads: Lead[];
}

const getStatusBadge = (status: Lead["status"]) => {
  const statusConfig = {
    new: { label: "Nieuw", variant: "default" as const },
    contacted: { label: "Contact", variant: "secondary" as const },
    qualified: { label: "Gekwalificeerd", variant: "outline" as const },
    proposal: { label: "Offerte", variant: "primary" as const },
    negotiation: { label: "Onderhandeling", variant: "warning" as const },
    won: { label: "Gewonnen", variant: "success" as const },
    lost: { label: "Verloren", variant: "destructive" as const },
  };

  const config = statusConfig[status] || statusConfig.new;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const RecentLeads: React.FC<RecentLeadsProps> = ({ leads }) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recente Leads</CardTitle>
        <CardDescription>
          Nieuwe leads van de afgelopen 7 dagen
        </CardDescription>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center">
            Geen recente leads gevonden.
          </p>
        ) : (
          <ScrollArea className="w-full">
            <div className={isMobile ? "-mx-4" : "mx-0"}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Naam</TableHead>
                    <TableHead>Status</TableHead>
                    {!isMobile && <TableHead>Bron</TableHead>}
                    <TableHead>Toegevoegd</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/leads/${lead.id}`}
                          className="text-primary hover:underline"
                        >
                          {lead.name}
                        </Link>
                      </TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      {!isMobile && <TableCell>{lead.source}</TableCell>}
                      <TableCell className="whitespace-nowrap">
                        {formatDistanceToNow(new Date(lead.createdAt), {
                          addSuffix: true,
                          locale: nl,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

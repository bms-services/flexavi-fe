
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Calendar, FileText, FileCheck } from "lucide-react";
import { mockLeads, mockAppointments, mockQuotes, mockInvoices } from "@/data/mockData";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  className,
}) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

export const DashboardStats: React.FC = () => {
  // Count active appointments (not canceled or completed)
  const activeAppointments = mockAppointments.filter(
    (a) => a.status !== "canceled" && a.status !== "completed"
  ).length;

  // Count sent quotes
  const pendingQuotes = mockQuotes.filter(
    (q) => q.status !== "accepted" && q.status !== "rejected"
  ).length;

  // Count unpaid invoices
  const unpaidInvoices = mockInvoices.filter(
    (i) => i.status !== "paid" && i.status !== "canceled"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Totaal Leads"
        value={mockLeads.length}
        description="Actieve leadcontacten"
        icon={<Users className="h-4 w-4 text-roof-500" />}
      />
      <StatCard
        title="Geplande Afspraken"
        value={activeAppointments}
        description="Komende afspraken"
        icon={<Calendar className="h-4 w-4 text-roof-500" />}
      />
      <StatCard
        title="Openstaande Offertes"
        value={pendingQuotes}
        description="Wachtend op akkoord"
        icon={<FileText className="h-4 w-4 text-roof-500" />}
      />
      <StatCard
        title="Onbetaalde Facturen"
        value={unpaidInvoices}
        description="Nog te ontvangen"
        icon={<FileCheck className="h-4 w-4 text-roof-500" />}
      />
    </div>
  );
};


import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Calendar, FileText, FileCheck, TrendingUp, TrendingDown } from "lucide-react";
import { mockLeads, mockAppointments, mockQuotes, mockInvoices } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}) => (
  <Card className={cn("overflow-hidden", className)}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center justify-between">
        <CardDescription>{description}</CardDescription>
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-medium",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {trend.value}%
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

interface DashboardStatsProps {
  timeRange: string;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ timeRange }) => {
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

  // Total paid invoices amount
  const totalRevenue = mockInvoices
    .filter(i => i.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Actieve Leads"
        value={mockLeads.length}
        description="Potentiële klanten"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Geplande Afspraken"
        value={activeAppointments}
        description="Komende afspraken"
        icon={<Calendar className="h-4 w-4" />}
        trend={{ value: 5, isPositive: true }}
      />
      <StatCard
        title="Openstaande Offertes"
        value={pendingQuotes}
        description={`Totaal: ${formatCurrency(mockQuotes.reduce((sum, q) => sum + q.amount, 0))}`}
        icon={<FileText className="h-4 w-4" />}
        trend={{ value: 3, isPositive: false }}
      />
      <StatCard
        title="Omzet"
        value={formatCurrency(totalRevenue)}
        description={`${unpaidInvoices} onbetaalde facturen`}
        icon={<FileCheck className="h-4 w-4" />}
        trend={{ value: 18, isPositive: true }}
      />
    </div>
  );
};

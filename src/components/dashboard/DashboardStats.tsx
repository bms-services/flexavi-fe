
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, FileCheck, Briefcase } from "lucide-react";
import { mockLeads, mockQuotes, mockInvoices, mockWorkAgreements, mockProjects } from "@/data/mockData";
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
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

interface DashboardStatsProps {
  timeRange: string;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ timeRange }) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Count quotes by status
  const pendingQuotes = mockQuotes.filter(q => q.status === "sent").length;
  const acceptedQuotes = mockQuotes.filter(q => q.status === "accepted").length;
  const totalQuotesValue = mockQuotes
    .filter(q => q.status !== "rejected")
    .reduce((sum, q) => sum + q.amount, 0);

  // Count work agreements
  const pendingAgreements = mockWorkAgreements.filter(wa => wa.status === "sent").length;
  const signedAgreements = mockWorkAgreements.filter(wa => wa.status === "signed").length;
  const totalAgreementsValue = mockWorkAgreements
    .filter(wa => wa.status !== "rejected")
    .reduce((sum, wa) => sum + wa.totalAmount, 0);

  // Count invoices
  const unpaidInvoices = mockInvoices.filter(i => i.status === "sent" || i.status === "overdue").length;
  const totalRevenue = mockInvoices
    .filter(i => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  // Count projects
  const activeProjects = mockProjects.filter(p => p.status === "active").length;
  const completedProjects = mockProjects.filter(p => p.status === "completed").length;
  const totalProjectValue = mockProjects
    .filter(p => p.status !== "cancelled")
    .reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Quotes Stats */}
      <StatCard
        title="Offertes"
        value={formatCurrency(totalQuotesValue)}
        description={`${pendingQuotes} open, ${acceptedQuotes} geaccepteerd`}
        icon={<FileText className="h-4 w-4" />}
      />

      {/* Work Agreements Stats */}
      <StatCard
        title="Werkovereenkomsten"
        value={formatCurrency(totalAgreementsValue)}
        description={`${pendingAgreements} open, ${signedAgreements} ondertekend`}
        icon={<FileText className="h-4 w-4" />}
      />

      {/* Invoices Stats */}
      <StatCard
        title="Facturen"
        value={formatCurrency(totalRevenue)}
        description={`${unpaidInvoices} openstaand`}
        icon={<FileCheck className="h-4 w-4" />}
      />

      {/* Projects Stats */}
      <StatCard
        title="Projecten"
        value={activeProjects}
        description={`${completedProjects} afgerond, ${formatCurrency(totalProjectValue)} totaal`}
        icon={<Briefcase className="h-4 w-4" />}
      />
    </div>
  );
};

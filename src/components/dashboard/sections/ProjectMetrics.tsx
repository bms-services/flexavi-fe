
import React from "react";
import { StatsCardWithTable } from "../stats/StatsCardWithTable";
import { Project } from "@/types/project";
import { Briefcase } from "lucide-react";

interface ProjectMetricsProps {
  projects: Project[];
  formatCurrency: (amount: number) => string;
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ projects, formatCurrency }) => {
  // Filter projects based on status
  const activeProjects = projects.filter(p => p.status === "active");
  const completedProjects = projects.filter(p => p.status === "completed");
  
  // Calculate metrics
  const totalRevenue = projects.reduce((sum, p) => sum + p.revenue, 0);
  const totalProfit = projects.reduce((sum, p) => sum + p.profit, 0);
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  // Prepare table data
  const projectData = [
    { 
      label: "Actieve projecten", 
      value: activeProjects.length.toString(),
      change: 5.2
    },
    { 
      label: "Afgeronde projecten", 
      value: completedProjects.length.toString(),
      change: 2.8
    },
    { 
      label: "Totale omzet", 
      value: formatCurrency(totalRevenue),
      change: 6.1
    },
    { 
      label: "Winst marge", 
      value: `${profitMargin.toFixed(1)}%`,
      change: 3.4
    }
  ];

  return (
    <StatsCardWithTable
      title="Projecten"
      value={formatCurrency(totalProfit)}
      change={4.6}
      tooltip="Overzicht van actieve en afgeronde projecten"
      viewReportLink="/projects"
      subTitle="PROJECT OVERZICHT"
      table={projectData}
    />
  );
};

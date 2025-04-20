
import React from "react";
import { StatCard } from "./StatCard";
import { Briefcase } from "lucide-react";
import { Project } from "@/types";

interface ProjectStatsProps {
  projects: Project[];
  formatCurrency: (amount: number) => string;
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ projects, formatCurrency }) => {
  const activeProjects = projects.filter(p => p.status === "active").length;
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const totalProjectValue = projects
    .filter(p => p.status !== "cancelled")
    .reduce((sum, p) => sum + p.budget, 0);

  return (
    <StatCard
      title="Projecten"
      value={activeProjects}
      description={`${completedProjects} afgerond, ${formatCurrency(totalProjectValue)} totaal`}
      icon={<Briefcase className="h-4 w-4" />}
    />
  );
};

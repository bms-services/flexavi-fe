
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, Briefcase, BarChart } from "lucide-react";
import { Project } from "@/types/project";
import { formatCurrency } from "@/utils/format";

interface ProjectsKPIsProps {
  projects: Project[];
}

export const ProjectsKPIs: React.FC<ProjectsKPIsProps> = ({ projects }) => {
  // Calculate KPIs
  const activeProjects = projects.filter(p => p.status === "active").length;
  
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const totalProjects = projects.length;
  const successRate = totalProjects > 0 
    ? Math.round((completedProjects / totalProjects) * 100) 
    : 0;
  
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const averageProjectValue = totalProjects > 0 
    ? totalBudget / totalProjects 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Active Projects KPI */}
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Actieve projecten</p>
            <h3 className="text-2xl font-bold">{activeProjects}</h3>
          </div>
        </CardContent>
      </Card>
      
      {/* Success Rate KPI */}
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
            <BarChart className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Succesvolle projecten</p>
            <h3 className="text-2xl font-bold">{successRate}%</h3>
          </div>
        </CardContent>
      </Card>
      
      {/* Average Project Value KPI */}
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
            <CircleDollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Gemiddelde projectwaarde</p>
            <h3 className="text-2xl font-bold">{formatCurrency(averageProjectValue)}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

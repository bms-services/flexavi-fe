import React, { useState } from "react";
import { mockProjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { LeadTablePagination } from "@/components/leads/LeadTablePagination";

interface ProjectsTabProps {
  leadId: string;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ leadId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const leadProjects = mockProjects.filter(project => project.leads.includes(leadId));
  
  const totalPages = Math.ceil(leadProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = leadProjects.slice(startIndex, endIndex);

  if (leadProjects.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Geen projecten gevonden</h3>
        <p className="text-gray-500 mb-4">Er zijn nog geen projecten gekoppeld aan deze lead.</p>
        <Link to="/projects">
          <Button>
            Nieuw project aanmaken
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {currentProjects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{project.name}</h3>
              <p className="text-gray-500">{project.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>Startdatum: {format(new Date(project.startDate), "d MMMM yyyy", { locale: nl })}</span>
                <span>Locatie: {project.location}</span>
                <span>Budget: {formatCurrency(project.budget)}</span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <ProjectStatusBadge status={project.status} />
              <Link to={`/projects/${project.id}`}>
                <Button variant="outline" size="sm">
                  Details bekijken
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <LeadTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

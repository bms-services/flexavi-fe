
import React, { useState, useEffect, useMemo } from "react";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsTable } from "./ProjectsTable";
import { ProjectsCardView } from "./ProjectsCardView";
import { ProjectsFilters } from "./ProjectsFilters";
import { ProjectsPagination } from "./ProjectsPagination";
import { ProjectsKPIs } from "./ProjectsKPIs";
import { Project, ProjectStatus } from "@/types/project";
import { ProjectWizard } from "./wizard/ProjectWizard";

interface ProjectsListProps {
  projects: Project[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"table" | "card">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    status: "all" as ProjectStatus | "all",
    startDateFrom: "",
    startDateTo: "",
    budgetMin: "",
    budgetMax: ""
  });
  
  // Reset to first page when filters or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, itemsPerPage]);
  
  // Apply filters to projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search filter (name and description)
      const searchMatch = !filters.search || 
        project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.search.toLowerCase());
      
      // Location filter
      const locationMatch = !filters.location || 
        project.location.toLowerCase().includes(filters.location.toLowerCase());
      
      // Status filter
      const statusMatch = filters.status === "all" || project.status === filters.status;
      
      // Date range filter
      const startDateMatch = 
        (!filters.startDateFrom || new Date(project.startDate) >= new Date(filters.startDateFrom)) &&
        (!filters.startDateTo || new Date(project.startDate) <= new Date(filters.startDateTo));
      
      // Budget range filter
      const budgetMinValue = filters.budgetMin ? parseFloat(filters.budgetMin) : 0;
      const budgetMaxValue = filters.budgetMax ? parseFloat(filters.budgetMax) : Infinity;
      const budgetMatch = project.budget >= budgetMinValue && project.budget <= budgetMaxValue;
      
      return searchMatch && locationMatch && statusMatch && startDateMatch && budgetMatch;
    });
  }, [projects, filters]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);
  
  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      search: "",
      location: "",
      status: "all",
      startDateFrom: "",
      startDateTo: "",
      budgetMin: "",
      budgetMax: ""
    });
  };

  return (
    <div className="space-y-6">
      <ProjectsHeader 
        onCreateClick={() => setIsWizardOpen(true)} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <ProjectsKPIs projects={projects} />
      
      <ProjectsFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
      
      {currentView === "table" ? (
        <ProjectsTable projects={paginatedProjects} />
      ) : (
        <ProjectsCardView projects={paginatedProjects} />
      )}
      
      <ProjectsPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredProjects.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
      
      <ProjectWizard 
        isOpen={isWizardOpen} 
        onOpenChange={setIsWizardOpen}
      />
    </div>
  );
};

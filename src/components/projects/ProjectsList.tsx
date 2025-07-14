
import React, { useState, useEffect, useMemo } from "react";
import { ProjectsHeader } from "./ProjectsHeader";
import { Layout } from "../layout/Layout";

import { ProjectsTable } from "./ProjectsTable";
import { ProjectsCardView } from "./ProjectsCardView";
import { ProjectsFilters } from "./ProjectsFilters";
import { ProjectsPagination } from "./ProjectsPagination";
import { ProjectsKPIs } from "./ProjectsKPIs";
import { ProjectWizard } from "./wizard/ProjectWizard";
import { useDeleteProject, useGetProjects } from "@/zustand/hooks/useProject";
import { ParamGlobal } from "@/zustand/types/apiT";
import { ProjectRes } from "@/zustand/types/projectT";
import { useNavigate } from "react-router-dom";
import { create } from "domain";



export const ProjectsList: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<"table" | "card">("table");
  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });
  const [modal, setModal] = useState({
    create: false,
  })

  const getProjectsZ = useGetProjects(params);
  const deleteProjectZ = useDeleteProject();

  const handleCreate = () => {
    setModal({ ...modal, create: true });
  }

  const handleEdit = (data: ProjectRes) => {
    navigate(`/projects/edit/${data.id}`);
  }

  const handleShow = (data: ProjectRes) => {
    navigate(`/projects/${data.id}`);
  }

  const handleDelete = async (ids: ProjectRes[]) => {
    const projectIds = ids.map(id => id.id).filter((id): id is string => typeof id === "string");
    await deleteProjectZ.mutateAsync({
      ids: projectIds,
      force: false
    });
  };



  const handleViewChange = (view: "table" | "card") => {
    setCurrentView(view);
  };

  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <ProjectsHeader
          onCreateClick={handleCreate}
          currentView={currentView}
          onViewChange={handleViewChange}
        />

        {/* <ProjectsKPIs projects={projects} /> */}

        {/* <ProjectsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      /> */}

        <ProjectsTable
          params={params}
          setParams={setParams}
          onEdit={handleEdit}
          onShow={handleShow}
          onDelete={handleDelete}
          getProjectsZ={getProjectsZ}
        />


        {/* {currentView === "table" ? (
        ) : (
          <ProjectsCardView projects={paginatedProjects} />
      )} */}

        {/* <ProjectsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredProjects.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      /> */}

        <ProjectWizard
          isOpen={modal.create}
          onOpenChange={(open) => setModal({ ...modal, create: open })}
        />
      </div>
    </Layout>
  );
};

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectOverview } from "./tabs/ProjectOverview";
import { ProjectExpensesTab } from "./tabs/ProjectExpensesTab";
import { ProjectPersonnelTab } from "./tabs/ProjectPersonnelTab";
import { ProjectDocumentsTab } from "./tabs/ProjectDocumentsTab";
import { ProjectPhotosTab } from "./tabs/ProjectPhotosTab";
import { ProjectProfitTab } from "./tabs/ProjectProfitTab";
import { ProjectAppointmentsTab } from "./tabs/ProjectAppointmentsTab";
import { ProjectEmployeeRes, ProjectNoteRes, ProjectOverviewRes, ProjectRes, ProjectSummaryRes, ProjectTaskRes } from "@/zustand/types/projectT";

interface ProjectTabsProps {
  projectOverview: ProjectOverviewRes;
  projectTasks: ProjectTaskRes[];
  onOpenCreateTask: () => void;
  projectNotes: ProjectNoteRes[];
  onOpenCreateNote: () => void;
  onOpenCreateEmployee?: () => void;
}

export const ProjectTabs: React.FC<ProjectTabsProps> = ({
  projectOverview,
  onOpenCreateTask,
  projectTasks,
  projectNotes,
  onOpenCreateNote,
  onOpenCreateEmployee
}) => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid grid-cols-4 md:grid-cols-7 w-full">
        <TabsTrigger value="overview">Overzicht</TabsTrigger>
        <TabsTrigger value="appointments">Afspraken</TabsTrigger>
        <TabsTrigger value="expenses">Kosten</TabsTrigger>
        <TabsTrigger value="personnel">Personeel</TabsTrigger>
        <TabsTrigger value="documents">Documenten</TabsTrigger>
        <TabsTrigger value="photos">Foto's</TabsTrigger>
        <TabsTrigger value="profit">Winstberekening</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <ProjectOverview
          projectOverview={projectOverview}
          projectTasks={projectTasks}
          onOpenCreateTask={onOpenCreateTask}
          projectNotes={projectNotes}
          onOpenCreateNote={onOpenCreateNote}
        />
      </TabsContent>

      {/* <TabsContent value="appointments" className="space-y-4">
        <ProjectAppointmentsTab project={project} />
      </TabsContent> */}

      {/* <TabsContent value="expenses" className="space-y-4">
        <ProjectExpensesTab />
      </TabsContent> */}

      <TabsContent value="personnel" className="space-y-4">
        <ProjectPersonnelTab
          onOpenCreateEmployee={onOpenCreateEmployee}
        />
      </TabsContent>

      {/* <TabsContent value="documents" className="space-y-4">
        <ProjectDocumentsTab project={project} />
      </TabsContent> */}

      {/* <TabsContent value="photos" className="space-y-4">
        <ProjectPhotosTab project={project} />
      </TabsContent> */}

      {/* <TabsContent value="profit" className="space-y-4">
        <ProjectProfitTab project={project} />
      </TabsContent> */}
    </Tabs>
  );
};

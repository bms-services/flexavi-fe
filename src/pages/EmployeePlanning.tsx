
import React, { useState } from "react";
import { mockAppointments } from "@/data/mockAppointments";
import { TeamDetails, Appointment } from "@/types";
import { format, addDays } from "date-fns";
import { EmployeePlanningTabs } from "@/components/employee/EmployeePlanningTabs";
import { Layout } from "@/components/layout/Layout";
import { Users, Calendar, ListCheck } from "lucide-react";
import { ProjectOpenTasksCard } from "@/components/projects/detail/tabs/ProjectOpenTasksCard";
import { mockProjects } from "@/data/mockProjects";
import { ProjectNote } from "@/types/project";
import { useIsMobile } from "@/hooks/use-mobile";

const teams: TeamDetails[] = [
  { id: "1", name: "Verkoop Team A", type: "sales", environmentId: "1", color: "#0EA5E9" },
  { id: "3", name: "Uitvoerende Ploeg 1", type: "installation", environmentId: "1", color: "#0EA5E9" }
];

export default function EmployeePlanningPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string>("1");
  const isMobile = useIsMobile();

  const openTasks: ProjectNote[] = mockProjects.flatMap(project =>
    (project.notes ?? [])
      .filter(note => note.type === "task" && note.status === "open")
      .map(task => ({
        ...task,
        createdFor: project.name
      }))
  );

  const getAppointmentsForDay = (dayOffset: number) => {
    const dateString = format(addDays(new Date(), dayOffset), "yyyy-MM-dd");
    return mockAppointments.filter(app => app.teamId === selectedTeamId && app.date === dateString);
  };

  const days = [
    { label: "Gisteren", offset: -1 },
    { label: "Vandaag", offset: 0 },
    { label: "Morgen", offset: 1 }
  ];

  const selectedTeam = teams.find(t => t.id === selectedTeamId);

  return (
    <Layout>
      <div className="w-full px-2 sm:px-4 py-2 sm:py-6">
        <div className="space-y-3 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="bg-roof-100 p-1 sm:p-2 rounded-full">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-roof-600" />
              </div>
              <h1 className="text-base sm:text-2xl font-bold text-roof-800">Mijn planning</h1>
            </div>
            
            <div className="bg-white rounded-lg p-2 sm:p-4 shadow-sm border flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Users className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-roof-500" /> 
                <span className="text-xs sm:text-sm font-medium">Actief team:</span>
                <span className="text-roof-600 font-semibold text-xs sm:text-base">{selectedTeam?.name}</span>
              </div>
              
              <div className="flex items-center gap-1.5 sm:gap-2">
                <label htmlFor="team-select" className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  Wissel team:
                </label>
                <select
                  id="team-select"
                  value={selectedTeamId}
                  onChange={e => setSelectedTeamId(e.target.value)}
                  className="border rounded-md px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-roof-400 min-w-[120px] sm:min-w-[140px]"
                >
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <ProjectOpenTasksCard 
              openTasks={openTasks}
              onAddTaskClick={() => {}}
              onToggleTaskStatus={() => {}}
            />
            
            <EmployeePlanningTabs 
              days={days} 
              getAppointmentsForDay={getAppointmentsForDay} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

import React, { useState } from "react";
import { mockAppointments } from "@/data/mockAppointments";
import { TeamDetails, Appointment } from "@/types";
import { format, addDays, isToday, isTomorrow, parseISO } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import { ProjectOpenTasksCard } from "@/components/projects/detail/tabs/ProjectOpenTasksCard";
import { mockProjects } from "@/data/mockProjects";
import { ProjectNote } from "@/types/project";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { EmployeePlanningTabs } from "@/components/employee/EmployeePlanningTabs";
import { Card, CardContent } from "@/components/ui/card";

const teams: TeamDetails[] = [
  { id: "1", name: "Verkoop Team A", type: "sales", environmentId: "1", color: "#0EA5E9" },
  { id: "3", name: "Uitvoerende Ploeg 1", type: "installation", environmentId: "1", color: "#0EA5E9" }
];

export default function EmployeePlanningPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string>("1");
  const [activeTab, setActiveTab] = useState("upcoming");

  const openTasks: ProjectNote[] = mockProjects.flatMap(project =>
    (project.notes ?? [])
      .filter(note => note.type === "task" && note.status === "open")
      .map(task => ({
        ...task,
        createdFor: project.name
      }))
  );

  // Generate days for the tabs
  const days = [
    { label: "Vandaag", offset: 0 },
    { label: "Morgen", offset: 1 },
    { label: "Overmorgen", offset: 2 },
    { label: format(addDays(new Date(), 3), "EEEE d MMM"), offset: 3 },
    { label: format(addDays(new Date(), 4), "EEEE d MMM"), offset: 4 },
  ];

  // Function to get appointments for a specific day
  const getAppointmentsForDay = (offset: number) => {
    const targetDate = format(addDays(new Date(), offset), "yyyy-MM-dd");
    return mockAppointments
      .filter(app => app.teamId === selectedTeamId && app.date === targetDate)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-20 py-6 sm:py-8">
        <div className="space-y-6">
          {/* Header and Team Selection */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Planning</h1>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Beheer uw dagelijkse afspraken en taken
              </p>
            </div>
            
            <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map(team => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Day Tabs and Appointments */}
          <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <EmployeePlanningTabs
              days={days}
              getAppointmentsForDay={getAppointmentsForDay}
            />
          </Card>

          {/* Open Tasks */}
          <Card className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <CardContent className="p-0">
              <ProjectOpenTasksCard 
                openTasks={openTasks}
                onAddTaskClick={() => {}}
                onToggleTaskStatus={() => {}}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

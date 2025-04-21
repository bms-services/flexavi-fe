
import React, { useState } from "react";
import { mockAppointments } from "@/data/mockAppointments";
import { TeamDetails, Appointment } from "@/types";
import { format, addDays } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import { ProjectOpenTasksCard } from "@/components/projects/detail/tabs/ProjectOpenTasksCard";
import { mockProjects } from "@/data/mockProjects";
import { ProjectNote } from "@/types/project";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const getAppointmentsForTeam = () => {
    return mockAppointments.filter(app => app.teamId === selectedTeamId);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
            <p className="mt-2 text-gray-600">
              See your scheduled events from your calendar events links.
            </p>
          </div>

          {/* Team Selection */}
          <div className="flex items-center gap-4">
            <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
              <SelectTrigger className="w-[200px]">
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

          {/* Tabs */}
          <Tabs defaultValue="upcoming" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border-b w-full justify-start rounded-none p-0 h-12">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none h-12"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none h-12"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="recurring"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none h-12"
              >
                Recurring
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none h-12"
              >
                Past
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none h-12"
              >
                Cancelled
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Appointments List */}
          <div className="space-y-4">
            {getAppointmentsForTeam().map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>

          {/* Open Tasks */}
          <div className="mt-8">
            <ProjectOpenTasksCard 
              openTasks={openTasks}
              onAddTaskClick={() => {}}
              onToggleTaskStatus={() => {}}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-start justify-between">
        <div className="flex gap-6">
          {/* Date */}
          <div className="text-center">
            <div className="text-orange-500 font-medium">{format(new Date(appointment.date), 'EEE')}</div>
            <div className="text-4xl font-bold">{format(new Date(appointment.date), 'dd')}</div>
          </div>
          
          {/* Appointment Details */}
          <div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <span>{appointment.startTime} - {appointment.endTime}</span>
              <span>•</span>
              <span>{appointment.location || 'Online'}</span>
            </div>
            <h3 className="font-medium text-lg mb-2">{appointment.title}</h3>
            <div className="flex -space-x-2">
              {/* This is a placeholder for the avatars - you'll need to implement actual user avatars */}
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button className="text-gray-600 hover:text-gray-900">
          Edit
        </button>
      </div>
    </div>
  );
};

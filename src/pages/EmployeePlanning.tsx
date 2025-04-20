
import React, { useState } from "react";
import { mockAppointments } from "@/data/mockAppointments";
import { TeamDetails, Appointment } from "@/types";
import { format, addDays } from "date-fns";
import { EmployeePlanningTabs } from "@/components/employee/EmployeePlanningTabs";
import { Layout } from "@/components/layout/Layout";
import { Users, Calendar } from "lucide-react";

// Teams hardcoded for now (can be fetched from API later)
const teams: TeamDetails[] = [
  { id: "1", name: "Verkoop Team A", type: "sales", environmentId: "1", color: "#0EA5E9" },
  { id: "3", name: "Uitvoerende Ploeg 1", type: "installation", environmentId: "1", color: "#0EA5E9" }
];

export default function EmployeePlanningPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string>("1");

  // Filter appointments for the selected team by day
  const getAppointmentsForDay = (dayOffset: number) => {
    const dateString = format(addDays(new Date(), dayOffset), "yyyy-MM-dd");
    return mockAppointments.filter(app => app.teamId === selectedTeamId && app.date === dateString);
  };

  // Tab definitions
  const days = [
    { label: "Gisteren", offset: -1 },
    { label: "Vandaag", offset: 0 },
    { label: "Morgen", offset: 1 }
  ];

  const selectedTeam = teams.find(t => t.id === selectedTeamId);

  return (
    <Layout>
      <div className="container py-4 px-2 sm:px-4">
        <div className="mb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 mb-4">
            <div className="bg-roof-100 p-2 rounded-full flex items-center justify-center w-10 h-10 mb-2 sm:mb-0">
              <Calendar className="h-6 w-6 text-roof-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-roof-800 text-center sm:text-left">Mijn planning</h1>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-roof-500" /> 
                <span className="text-sm font-medium">Actief team:</span>
                <span className="text-roof-600 font-semibold">{selectedTeam?.name}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="team-select" className="text-sm font-medium mr-2">
                Wissel team:
              </label>
              <select
                id="team-select"
                value={selectedTeamId}
                onChange={e => setSelectedTeamId(e.target.value)}
                className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-roof-400 min-w-[140px] bg-white"
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
        
        <div className="w-full overflow-x-auto">
          <EmployeePlanningTabs days={days} getAppointmentsForDay={getAppointmentsForDay} />
        </div>
      </div>
    </Layout>
  );
}


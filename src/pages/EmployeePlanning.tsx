
import React, { useState } from "react";
import { mockAppointments } from "@/data/mockAppointments";
import { TeamDetails, Appointment } from "@/types";
import { format, subDays, addDays } from "date-fns";
import { EmployeePlanningTabs } from "@/components/employee/EmployeePlanningTabs";
import { Layout } from "@/components/layout/Layout";

// Voor nu: teams hardcoded (later kun je dit via settings/data halen!)
const teams: TeamDetails[] = [
  { id: "1", name: "Verkoop Team A", type: "sales", environmentId: "1", color: "#0EA5E9" },
  { id: "3", name: "Uitvoerende Ploeg 1", type: "installation", environmentId: "1", color: "#0EA5E9" }
];

export default function EmployeePlanningPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string>("1");

  // Per dag filteren we de afspraken voor het gekozen team
  const getAppointmentsForDay = (dayOffset: number) => {
    const dateString = format(addDays(new Date(), dayOffset), "yyyy-MM-dd");
    return mockAppointments.filter(app => app.teamId === selectedTeamId && app.date === dateString);
  };

  // Voor tabs
  const days = [
    { label: "Gisteren", offset: -1 },
    { label: "Vandaag", offset: 0 },
    { label: "Morgen", offset: 1 }
  ];

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6">Mijn planning - {teams.find(t => t.id === selectedTeamId)?.name}</h1>
        <div className="mb-4">
          <label className="mr-2 text-sm font-medium">Selecteer team:</label>
          <select
            value={selectedTeamId}
            onChange={e => setSelectedTeamId(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <EmployeePlanningTabs days={days} getAppointmentsForDay={getAppointmentsForDay} />
      </div>
    </Layout>
  );
}

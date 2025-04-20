
import { Appointment, TeamDetails } from "@/types";
import { findClosestUnassignedAppointment } from "./distance";
import { optimizeAssigned } from "./team-optimization";

export const optimizeUnassigned = (appointments: Appointment[], teams: TeamDetails[]): Appointment[] => {
  const result = [...appointments];
  
  const unassignedAppointments = appointments.filter(app => !app.teamId);
  if (unassignedAppointments.length === 0) return result;
  
  const unassignedSales = unassignedAppointments.filter(app => app.teamType === "sales");
  const unassignedInstallation = unassignedAppointments.filter(app => app.teamType === "installation");
  
  const salesTeams = teams.filter(team => team.type === "sales");
  const installationTeams = teams.filter(team => team.type === "installation");
  
  const assignAppointmentsToTeams = (
    unassignedApps: Appointment[],
    availableTeams: TeamDetails[]
  ) => {
    availableTeams.forEach(team => {
      const teamAppointments = result.filter(app => app.teamId === team.id);
      let stillUnassigned = [...unassignedApps];
      
      while (stillUnassigned.length > 0) {
        const closest = findClosestUnassignedAppointment(teamAppointments, stillUnassigned);
        if (!closest) break;
        
        const appointmentIndex = result.findIndex(app => app.id === closest.id);
        if (appointmentIndex !== -1) {
          result[appointmentIndex] = { ...result[appointmentIndex], teamId: team.id };
          teamAppointments.push(result[appointmentIndex]);
        }
        
        stillUnassigned = stillUnassigned.filter(app => app.id !== closest.id);
      }
    });
  };
  
  if (salesTeams.length > 0 && unassignedSales.length > 0) {
    assignAppointmentsToTeams(unassignedSales, salesTeams);
  }
  
  if (installationTeams.length > 0 && unassignedInstallation.length > 0) {
    assignAppointmentsToTeams(unassignedInstallation, installationTeams);
  }
  
  return optimizeAssigned(result, teams);
};

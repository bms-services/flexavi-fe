
import { Appointment, TeamDetails } from "@/types";
import { findClosestAppointment, findClosestUnassignedAppointment } from "./distance";

// Helper to optimize the order of appointments for a single team
export const optimizeTeamAppointments = (teamAppointments: Appointment[]): Appointment[] => {
  if (teamAppointments.length <= 1) return [...teamAppointments];
  
  const optimizedAppointments: Appointment[] = [];
  const remaining = [...teamAppointments];
  const processedIds = new Set<string>();
  
  // Start with the first appointment
  let current = remaining.shift();
  if (!current) return optimizedAppointments;
  
  optimizedAppointments.push(current);
  processedIds.add(current.id);
  
  while (remaining.length > 0) {
    const next = findClosestAppointment(current, remaining, processedIds);
    if (!next) break;
    
    optimizedAppointments.push(next);
    processedIds.add(next.id);
    current = next;
    
    const index = remaining.findIndex(a => a.id === next.id);
    if (index !== -1) {
      remaining.splice(index, 1);
    }
  }
  
  return optimizedAppointments;
};

// Function to optimize route for team-assigned appointments
export const optimizeAssigned = (appointments: Appointment[], teams: TeamDetails[]): Appointment[] => {
  const result = [...appointments];
  
  teams.forEach(team => {
    const teamAppointments = result.filter(app => app.teamId === team.id);
    if (teamAppointments.length <= 1) return;
    
    const optimizedTeamAppointments = optimizeTeamAppointments(teamAppointments);
    
    optimizedTeamAppointments.forEach((app, index) => {
      const appointmentIndex = result.findIndex(a => a.id === app.id);
      if (appointmentIndex !== -1) {
        result[appointmentIndex] = { 
          ...result[appointmentIndex], 
          order: index 
        };
      }
    });
  });
  
  return result;
};

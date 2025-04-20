
import { Appointment, TeamDetails } from "@/types";

// Function to calculate distance between two locations (simplified)
// In a real implementation, this would use geocoding and actual distance calculations
const calculateDistance = (locationA: string = "", locationB: string = ""): number => {
  // This is a dummy implementation
  // In a real app, you'd use coordinates and the Haversine formula or a mapping API
  if (!locationA || !locationB) return 999; // Large number for unknown locations
  
  // Simple hash-based distance calculation for demo purposes
  const hashA = locationA.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const hashB = locationB.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  
  return Math.abs(hashA - hashB) / 100;
};

// Function to find closest appointment to a given appointment
const findClosestAppointment = (
  current: Appointment,
  appointments: Appointment[],
  excludeIds: Set<string>
): Appointment | null => {
  let closest: Appointment | null = null;
  let minDistance = Infinity;
  
  for (const appointment of appointments) {
    if (excludeIds.has(appointment.id)) continue;
    
    const distance = calculateDistance(current.location, appointment.location);
    if (distance < minDistance) {
      minDistance = distance;
      closest = appointment;
    }
  }
  
  return closest;
};

// Function to find the closest unassigned appointment to any appointment in a team
const findClosestUnassignedAppointment = (
  teamAppointments: Appointment[],
  unassignedAppointments: Appointment[]
): Appointment | null => {
  let closestAppointment: Appointment | null = null;
  let minDistance = Infinity;
  
  for (const teamAppointment of teamAppointments) {
    for (const unassignedAppointment of unassignedAppointments) {
      const distance = calculateDistance(teamAppointment.location, unassignedAppointment.location);
      if (distance < minDistance) {
        minDistance = distance;
        closestAppointment = unassignedAppointment;
      }
    }
  }
  
  return closestAppointment;
};

// Helper to optimize the order of appointments for a single team
const optimizeTeamAppointments = (teamAppointments: Appointment[]): Appointment[] => {
  if (teamAppointments.length <= 1) return [...teamAppointments];
  
  const optimizedAppointments: Appointment[] = [];
  const remaining = [...teamAppointments];
  const processedIds = new Set<string>();
  
  // Start with the first appointment
  let current = remaining.shift();
  if (!current) return optimizedAppointments;
  
  optimizedAppointments.push(current);
  processedIds.add(current.id);
  
  // Find the closest appointment to the current one until all are processed
  while (remaining.length > 0) {
    const next = findClosestAppointment(current, remaining, processedIds);
    if (!next) break;
    
    optimizedAppointments.push(next);
    processedIds.add(next.id);
    current = next;
    
    // Remove the processed appointment from remaining
    const index = remaining.findIndex(a => a.id === next.id);
    if (index !== -1) {
      remaining.splice(index, 1);
    }
  }
  
  return optimizedAppointments;
};

// Function to optimize route for all appointments
const optimizeAll = (
  appointments: Appointment[], 
  teams: TeamDetails[]
): Appointment[] => {
  const result = [...appointments];
  
  // First, separate sales and installation appointments
  const salesTeams = teams.filter(team => team.type === "sales");
  const installationTeams = teams.filter(team => team.type === "installation");
  
  // Get unassigned appointments for each type
  const unassignedSales = appointments.filter(
    app => !app.teamId && app.teamType === "sales"
  );
  
  const unassignedInstallation = appointments.filter(
    app => !app.teamId && app.teamType === "installation"
  );
  
  // Assign sales appointments to sales teams
  if (salesTeams.length > 0 && unassignedSales.length > 0) {
    salesTeams.forEach(team => {
      // Get current team appointments
      const teamAppointments = result.filter(app => app.teamId === team.id);
      
      // Find and assign closest unassigned appointments
      let stillUnassigned = [...unassignedSales];
      while (stillUnassigned.length > 0) {
        const closest = findClosestUnassignedAppointment(teamAppointments, stillUnassigned);
        if (!closest) break;
        
        // Assign the appointment to this team
        const appointmentIndex = result.findIndex(app => app.id === closest.id);
        if (appointmentIndex !== -1) {
          result[appointmentIndex] = { ...result[appointmentIndex], teamId: team.id };
          // Add to team appointments for next iteration
          teamAppointments.push(result[appointmentIndex]);
        }
        
        // Remove from unassigned
        stillUnassigned = stillUnassigned.filter(app => app.id !== closest.id);
      }
      
      // Optimize the order of team appointments
      const optimizedTeamAppointments = optimizeTeamAppointments(teamAppointments);
      
      // Update the order in the result
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
  }
  
  // Assign installation appointments to installation teams
  if (installationTeams.length > 0 && unassignedInstallation.length > 0) {
    installationTeams.forEach(team => {
      // Get current team appointments
      const teamAppointments = result.filter(app => app.teamId === team.id);
      
      // Find and assign closest unassigned appointments
      let stillUnassigned = [...unassignedInstallation];
      while (stillUnassigned.length > 0) {
        const closest = findClosestUnassignedAppointment(teamAppointments, stillUnassigned);
        if (!closest) break;
        
        // Assign the appointment to this team
        const appointmentIndex = result.findIndex(app => app.id === closest.id);
        if (appointmentIndex !== -1) {
          result[appointmentIndex] = { ...result[appointmentIndex], teamId: team.id };
          // Add to team appointments for next iteration
          teamAppointments.push(result[appointmentIndex]);
        }
        
        // Remove from unassigned
        stillUnassigned = stillUnassigned.filter(app => app.id !== closest.id);
      }
      
      // Optimize the order of team appointments
      const optimizedTeamAppointments = optimizeTeamAppointments(teamAppointments);
      
      // Update the order in the result
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
  }
  
  return result;
};

// Function to optimize route for team-assigned appointments
const optimizeAssigned = (appointments: Appointment[], teams: TeamDetails[]): Appointment[] => {
  const result = [...appointments];
  
  // For each team, optimize their assigned appointments
  teams.forEach(team => {
    // Get all appointments assigned to this team
    const teamAppointments = result.filter(app => app.teamId === team.id);
    if (teamAppointments.length <= 1) return; // No need to optimize
    
    // Optimize the order of team appointments
    const optimizedTeamAppointments = optimizeTeamAppointments(teamAppointments);
    
    // Update the order in the result
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

// Function to optimize route for unassigned appointments
const optimizeUnassigned = (appointments: Appointment[], teams: TeamDetails[]): Appointment[] => {
  const result = [...appointments];
  
  // Get all unassigned appointments
  const unassignedAppointments = appointments.filter(app => !app.teamId);
  if (unassignedAppointments.length === 0) return result;
  
  // Separate by team type
  const unassignedSales = unassignedAppointments.filter(app => app.teamType === "sales");
  const unassignedInstallation = unassignedAppointments.filter(app => app.teamType === "installation");
  
  // Get teams by type
  const salesTeams = teams.filter(team => team.type === "sales");
  const installationTeams = teams.filter(team => team.type === "installation");
  
  // Assign sales appointments to sales teams
  if (salesTeams.length > 0 && unassignedSales.length > 0) {
    salesTeams.forEach(team => {
      // Get current team appointments
      const teamAppointments = result.filter(app => app.teamId === team.id);
      
      // Find and assign closest unassigned appointments
      let stillUnassigned = [...unassignedSales];
      while (stillUnassigned.length > 0) {
        const closest = findClosestUnassignedAppointment(teamAppointments, stillUnassigned);
        if (!closest) break;
        
        // Assign the appointment to this team
        const appointmentIndex = result.findIndex(app => app.id === closest.id);
        if (appointmentIndex !== -1) {
          result[appointmentIndex] = { ...result[appointmentIndex], teamId: team.id };
          // Add to team appointments for next iteration
          teamAppointments.push(result[appointmentIndex]);
        }
        
        // Remove from unassigned
        stillUnassigned = stillUnassigned.filter(app => app.id !== closest.id);
      }
    });
  }
  
  // Assign installation appointments to installation teams
  if (installationTeams.length > 0 && unassignedInstallation.length > 0) {
    installationTeams.forEach(team => {
      // Get current team appointments
      const teamAppointments = result.filter(app => app.teamId === team.id);
      
      // Find and assign closest unassigned appointments
      let stillUnassigned = [...unassignedInstallation];
      while (stillUnassigned.length > 0) {
        const closest = findClosestUnassignedAppointment(teamAppointments, stillUnassigned);
        if (!closest) break;
        
        // Assign the appointment to this team
        const appointmentIndex = result.findIndex(app => app.id === closest.id);
        if (appointmentIndex !== -1) {
          result[appointmentIndex] = { ...result[appointmentIndex], teamId: team.id };
          // Add to team appointments for next iteration
          teamAppointments.push(result[appointmentIndex]);
        }
        
        // Remove from unassigned
        stillUnassigned = stillUnassigned.filter(app => app.id !== closest.id);
      }
    });
  }
  
  // Now that we've assigned all unassigned appointments, optimize each team's route
  return optimizeAssigned(result, teams);
};

// Main function to optimize routes based on the selected type
export const optimizeRoutes = (
  appointments: Appointment[],
  teams: TeamDetails[],
  type: "all" | "assigned" | "unassigned"
): Appointment[] => {
  switch (type) {
    case "all":
      return optimizeAll(appointments, teams);
    case "assigned":
      return optimizeAssigned(appointments, teams);
    case "unassigned":
      return optimizeUnassigned(appointments, teams);
    default:
      return appointments;
  }
};

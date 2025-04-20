
import { Appointment } from "@/types";

// Function to calculate distance between two locations (simplified)
export const calculateDistance = (locationA: string = "", locationB: string = ""): number => {
  if (!locationA || !locationB) return 999;
  
  const hashA = locationA.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const hashB = locationB.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  
  return Math.abs(hashA - hashB) / 100;
};

// Helper function to find closest appointment
export const findClosestAppointment = (
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

export const findClosestUnassignedAppointment = (
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

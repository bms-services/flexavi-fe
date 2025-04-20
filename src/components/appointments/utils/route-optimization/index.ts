
import { Appointment, TeamDetails } from "@/types";
import { optimizeAll } from "./all-optimization";
import { optimizeAssigned } from "./team-optimization";
import { optimizeUnassigned } from "./unassigned-optimization";

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

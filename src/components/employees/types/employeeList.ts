
export interface DayOff {
  id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  reason: string;
}

export const roleLabels = {
  sales: "Verkoper",
  roofer: "Dakdekker",
  office: "Kantoor",
  driver: "Chauffeur",
} as const;

export const teamLabels = {
  sales: "Verkoop team",
  installation: "Uitvoerend team",
  management: "Management team",
  administration: "Administratie team"
} as const;

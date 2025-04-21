
export type EmployeeRole = 
  | "sales" // Verkoper
  | "roofer" // Dakdekker
  | "office" // Kantoor medewerker
  | "driver"; // Chauffeur

export type WorkDay = {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  projectId?: string;
  description?: string;
  type: "work" | "sick" | "vacation" | "training";
};

export type EmployeeRate = {
  hourlyRate: number;
  dailyRate: number;
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  role: EmployeeRole;
  email: string;
  phoneNumber?: string;
  startDate: string;
  rates: EmployeeRate;
  availableDays: string[]; // Array of weekday numbers (0-6)
  active: boolean;
};

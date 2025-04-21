export type EmployeeRole = 
  | "sales" // Verkoper
  | "roofer" // Dakdekker
  | "office" // Kantoor medewerker
  | "driver"; // Chauffeur

export type WorkingHours = {
  start: string; // Format: "HH:mm"
  end: string;   // Format: "HH:mm"
};

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
  workingDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  workingHours: WorkingHours;
  availableDays: string[]; // Array of weekday numbers (1-5)
  active: boolean;
  teamIds: string[]; // Array of team IDs ("sales" | "installation")
};

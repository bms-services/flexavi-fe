
import { Employee } from "@/types/employee-management";

export const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "sales",
    phoneNumber: "0612345678",
    startDate: "2022-01-01",
    rates: {
      hourlyRate: 25,
      dailyRate: 200
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    availableDays: ["1", "2", "3", "4", "5"],
    active: true,
    teamIds: ["sales"]
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "roofer",
    phoneNumber: "",
    startDate: "2022-03-15",
    rates: {
      hourlyRate: 22,
      dailyRate: 180
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    workingHours: {
      start: "08:00",
      end: "16:00"
    },
    availableDays: ["1", "2", "3", "4", "5"],
    active: true,
    teamIds: ["installation"]
  },
  {
    id: "3",
    firstName: "Piet",
    lastName: "Janssen",
    email: "piet@example.com",
    role: "driver",
    phoneNumber: "0623456789",
    startDate: "2022-05-01",
    rates: {
      hourlyRate: 20,
      dailyRate: 160
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    workingHours: {
      start: "08:00",
      end: "16:00"
    },
    availableDays: ["1", "2", "3", "4", "5"],
    active: true,
    teamIds: ["installation", "sales"]
  }
];

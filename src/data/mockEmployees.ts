
import { Employee, WorkDay } from "@/types/employee-management";

export const mockWorkDays: WorkDay[] = [];

export const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "sales",
    startDate: "2024-01-01",
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
    phoneNumber: "0612345678",
    teamIds: ["sales"]
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "roofer",
    startDate: "2024-02-01",
    rates: {
      hourlyRate: 30,
      dailyRate: 240
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
    startDate: "2024-03-01",
    rates: {
      hourlyRate: 22,
      dailyRate: 180
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: false
    },
    workingHours: {
      start: "07:30",
      end: "16:30"
    },
    availableDays: ["1", "2", "3", "5"],
    active: true,
    phoneNumber: "0623456789",
    teamIds: ["installation"]
  }
];

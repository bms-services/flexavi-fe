
import { WorkDay } from "@/types/employee-management";

export const mockWorkDays: WorkDay[] = [
  {
    id: "wd-001",
    employeeId: "1",
    date: "2023-05-01",
    status: "scheduled",
    startTime: "08:00",
    endTime: "17:00"
  },
  {
    id: "wd-002",
    employeeId: "1",
    date: "2023-05-02",
    status: "scheduled",
    startTime: "08:00",
    endTime: "17:00"
  },
  {
    id: "wd-003",
    employeeId: "2",
    date: "2023-05-01",
    status: "day_off",
    reason: "Vacation"
  },
  {
    id: "wd-004",
    employeeId: "3",
    date: "2023-05-01",
    status: "scheduled",
    startTime: "09:00",
    endTime: "18:00"
  }
];

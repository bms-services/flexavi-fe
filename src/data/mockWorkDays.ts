
import { WorkDay } from "@/types/employee-management";

export const mockWorkDays: WorkDay[] = [
  {
    id: "wd-001",
    employeeId: "1",
    date: "2023-05-01",
    hours: 8,
    type: "work"
  },
  {
    id: "wd-002",
    employeeId: "1",
    date: "2023-05-02",
    hours: 8,
    type: "work"
  },
  {
    id: "wd-003",
    employeeId: "2",
    date: "2023-05-01",
    hours: 0,
    type: "vacation",
    description: "Vacation"
  },
  {
    id: "wd-004",
    employeeId: "3",
    date: "2023-05-01",
    hours: 8,
    type: "work"
  }
];

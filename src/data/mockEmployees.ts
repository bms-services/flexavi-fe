
import { Employee } from "@/types/employee";

export const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "sales",
    phoneNumber: "0612345678",
    teamIds: ["sales"]
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "installation",
    teamIds: ["installation"]
  },
  {
    id: "3",
    firstName: "Piet",
    lastName: "Janssen",
    email: "piet@example.com",
    role: "both",
    phoneNumber: "0623456789",
    teamIds: ["installation", "sales"]
  }
];

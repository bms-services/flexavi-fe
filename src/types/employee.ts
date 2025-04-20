
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: "sales" | "installation" | "both";
  teamIds: string[];
  avatar?: string;
}

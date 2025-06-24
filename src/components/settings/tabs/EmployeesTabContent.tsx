
import { EmployeeInvitationSettings } from "../employees/EmployeeInvitationSettings";
import { EmployeeSettings } from "../employees/EmployeeSettings";

export const EmployeesTabContent = ({ isInvitation }: { isInvitation: boolean }): JSX.Element => {
  return isInvitation ? <EmployeeInvitationSettings /> : <EmployeeSettings />;
};


import { EmployeeInvitationSettings } from "../employees/EmployeeInvitationSettings";
import { EmployeeSettings } from "../employees/EmployeeSettings";

export const EmployeesTabContent = ({ isInvitation }: { isInvitation: boolean }): JSX.Element => {

  console.log(`EmployeesTabContent isInvitation: ${isInvitation}`);

  return isInvitation ? <EmployeeInvitationSettings /> : <EmployeeSettings />;
};

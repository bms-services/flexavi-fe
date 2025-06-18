import { Badge } from "@/components/ui/badge";
import { EmployeeInvitationStatus, EmployeeInvitationStatusMap } from "@/zustand/types/employeeT";

export default function EmployeeInvitationStatusBadge({ status }: { status?: EmployeeInvitationStatus }) {
    if (!status || !EmployeeInvitationStatusMap[status]) return "-";

    const { label, variant } = EmployeeInvitationStatusMap[status];
    return (
        <Badge variant={variant} className="capitalize">
            {label}
        </Badge>
    );
}

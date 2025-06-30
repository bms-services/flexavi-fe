import { Badge } from "@/components/ui/badge";
import { EmployeeStatus, EmployeeStatusMap } from "@/zustand/types/employeeT";

export default function EmployeeUserStatusBadge({ status }: { status?: EmployeeStatus }) {
    if (!status || !EmployeeStatusMap[status]) return "-";

    const { label, variant } = EmployeeStatusMap[status];
    return (
        <Badge variant={variant} className="capitalize">
            {label}
        </Badge>
    );
}

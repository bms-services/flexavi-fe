
import { Badge } from "@/components/ui/badge";
import { LeadStatus, leadStatusMap } from "@/types/leads";
export default function LeadStatusBadge({ status }: { status?: LeadStatus }) {
    if (!status) return null;

    const { label, variant } = leadStatusMap[status];
    return (
        <Badge variant={variant} className="capitalize">
            {label}
        </Badge>
    );
}

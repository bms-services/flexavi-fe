
import { Badge } from "@/components/ui/badge";
import { WorkAgreementStatusMap, WorkAgreementStatus } from "@/zustand/types/workAgreementT";
export default function WorkAgreementStatusBadge({ status }: { status?: WorkAgreementStatus }) {
  if (!status) return null;

  const { label, variant } = WorkAgreementStatusMap[status];
  return (
    <Badge variant={variant} className="capitalize">
      {label}
    </Badge>
  );
}

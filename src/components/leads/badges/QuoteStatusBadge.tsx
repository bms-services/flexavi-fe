
import { Badge } from "@/components/ui/badge";
import { QuotationStatus, quotationStatusMap } from "@/zustand/types/quotationT";
export default function QuoteStatusBadge({ status }: { status?: QuotationStatus }) {
  if (!status) return null;

  const { label, variant } = quotationStatusMap[status];
  return (
    <Badge variant={variant} className="capitalize">
      {label}
    </Badge>
  );
}

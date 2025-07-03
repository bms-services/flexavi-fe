import { Badge } from "@/components/ui/badge";
import { InvoiceStatusMap, InvoiceStatus } from "@/zustand/types/invoiceT";

export default function InvoiceStatusBadge({ status }: { status?: InvoiceStatus }) {
  if (!status) return null;

  const { label, variant } = InvoiceStatusMap[status];
  return (
    <Badge variant={variant} className="capitalize">
      {label}
    </Badge>
  );
}

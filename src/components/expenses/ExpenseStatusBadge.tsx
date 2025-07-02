import { Badge } from "@/components/ui/badge";
import { ExpenseStatusMap, ExpenseStatus } from "@/zustand/types/expenseT";

export default function ExpenseStatusBadge({ status }: { status?: ExpenseStatus }) {
  if (!status) return null;

  const { label, variant } = ExpenseStatusMap[status];
  return (
    <Badge variant={variant} className="capitalize">
      {label}
    </Badge>
  );
}

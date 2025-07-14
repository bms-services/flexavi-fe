import { Badge } from "@/components/ui/badge";
import { ProjectStatus, projectStatusMap } from "@/zustand/types/projectT";

export default function ProjectStatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) return null;

  const { label, variant } = projectStatusMap[status];
  return (
    <Badge variant={variant} className="capitalize">
      {label}
    </Badge>
  );
}

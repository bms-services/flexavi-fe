
import React from "react";
import { RequestStatus } from "@/types/requests";
import { cn } from "@/lib/utils";

interface StatusFilterProps {
  selectedStatus: RequestStatus | "all";
  onStatusChange: (status: RequestStatus | "all") => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  const statuses: { value: RequestStatus | "all"; label: string }[] = [
    { value: "all", label: "Alle requests" },
    { value: "idea", label: "Ideeën" },
    { value: "planned", label: "Gepland" },
    { value: "in_progress", label: "In ontwikkeling" },
    { value: "beta", label: "Beta" },
    { value: "rolled_out", label: "Uitgerold" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => onStatusChange(status.value)}
          className={cn(
            "px-3 py-1 text-sm rounded-full transition-colors",
            selectedStatus === status.value
              ? "bg-primary text-primary-foreground font-medium"
              : "bg-muted hover:bg-muted/80 text-foreground"
          )}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

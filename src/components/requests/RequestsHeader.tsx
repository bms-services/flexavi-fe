
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RequestStatus } from "@/types/requests";
import { Plus } from "lucide-react";

interface RequestsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: RequestStatus | "all";
  onStatusChange: (status: RequestStatus | "all") => void;
  onCreateRequest: () => void;
}

export const RequestsHeader: React.FC<RequestsHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onCreateRequest,
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
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Feature Requests</h1>
        <p className="text-muted-foreground">
          Stem op ideeën of doe een suggestie voor een nieuwe functionaliteit
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Zoeken..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-[200px]"
        />
        <Button onClick={onCreateRequest}>
          <Plus className="h-4 w-4 mr-2" />
          Nieuw idee
        </Button>
      </div>
    </div>
  );
};


import React from "react";
import { User, Shield, Calendar } from "lucide-react";
import type { PipelineItem } from "@/types/pipeline";

type Props = { item: PipelineItem };

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("nl", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

export const ProjectInfoCard: React.FC<Props> = ({ item }) => (
  <>
    <div className="flex items-center gap-2 text-sm">
      <User className="h-4 w-4 text-muted-foreground" />
      <span>Klant: {item.name}</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <Shield className="h-4 w-4 text-muted-foreground" />
      <span>Garantie: Dakwerk</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <span>Project datum: {formatDate(item.createdAt)}</span>
    </div>
  </>
);


import React from "react";
import { User, FileMinus, Calendar } from "lucide-react";
import type { PipelineItem } from "@/types/pipeline";

type Props = { item: PipelineItem };

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("nl", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

export const InvoiceInfoCard: React.FC<Props> = ({ item }) => {
  // Calculate payment term (+14 days)
  const createdDate = new Date(item.createdAt);
  const payDue = new Date(createdDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();

  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <User className="h-4 w-4 text-muted-foreground" />
        <span>Klant: {item.name}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <FileMinus className="h-4 w-4 text-muted-foreground" />
        <span>Factuur #INV-{Math.floor(Math.random() * 1000)}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>Betaaltermijn: {formatDate(payDue)}</span>
      </div>
    </>
  );
};

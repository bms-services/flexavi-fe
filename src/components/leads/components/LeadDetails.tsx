
import React from "react";
import { LeadDetail } from "@/types";
import { FileText, Calendar } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface LeadDetailsProps {
  lead: LeadDetail;
}

export const LeadDetailsCard: React.FC<LeadDetailsProps> = ({ lead }) => {
  const formatDate = (date: string) => {
    return format(new Date(date), "d MMMM yyyy", { locale: nl });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">Lead Details</h3>
        <p className="text-sm text-muted-foreground">Algemene informatie over de lead</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bron</p>
            <p className="font-medium">{lead.source}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Aangemaakt op</p>
            <p className="font-medium">{formatDate(lead.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Laatste update</p>
            <p className="font-medium">{formatDate(lead.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

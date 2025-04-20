
import React from "react";
import { Calendar, FileText, MapPin, Phone, User, Mail, Info } from "lucide-react";
import { Appointment } from "@/types";
import { Button } from "@/components/ui/button";

interface ModernCardProps {
  app: Appointment;
  lead: any;
  notes?: string[];
  historyEntries?: Array<{ type: string; description: string; date: string }>;
  onMapOpen: (address: string) => void;
  digitalQuote?: any;
  digitalInvoice?: any;
  digitalAgreement?: any;
  onProcess?: () => void;
}

export const ModernEmployeeAppointmentCard: React.FC<ModernCardProps> = ({
  app,
  lead,
  notes,
  historyEntries,
  onMapOpen,
  digitalQuote,
  digitalInvoice,
  digitalAgreement,
  onProcess,
}) => (
  <div className="rounded-3xl shadow-xl p-0 bg-gradient-to-br from-[#f6f6f7] via-[#e5deff] to-[#e7f0fd] border-2 border-white/50 relative overflow-hidden 
      flex flex-col md:flex-row gap-0 md:gap-3 max-w-3xl mx-auto animate-fade-in">
    <div className="flex-1 flex flex-col gap-4 p-6 md:p-8">
      <div className="flex items-center gap-3">
        <User className="h-8 w-8 text-[#9b87f5]" />
        <div>
          <div className="text-xl font-bold text-[#221F26]">{lead?.name}</div>
          <div className="flex items-center gap-2 text-[#7E69AB] text-[15px]">
            <Mail className="h-4 w-4" />
            <span>{lead?.email}</span>
            <Phone className="h-4 w-4 ml-4" />
            <span>{lead?.phone}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onMapOpen(lead?.address || "")}
        className="flex items-center gap-2 rounded-full bg-[#9b87f5]/10 hover:bg-[#6E59A5]/10 
          text-[#6E59A5] px-4 py-1 font-medium w-fit transition"
      >
        <MapPin className="h-4 w-4" />
        <span className="truncate max-w-[160px]">{lead?.address}</span>
      </button>

      <div className="rounded-2xl p-4 mt-2 bg-white/60 shadow 
        grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-1 text-xs text-[#8B5CF6] font-bold uppercase">
            <Calendar className="h-4 w-4" />
            Datum
          </div>
          <div className="text-sm text-[#333] font-medium">
            {app.date}
          </div>
          <div className="mt-1 text-xs text-[#1EAEDB]">
            {app.startTime} - {app.endTime}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-xs text-[#8B5CF6] font-bold uppercase">
            <FileText className="h-4 w-4" />
            Beschrijving
          </div>
          <div className="text-sm text-[#222] min-h-[38px]">{app.description}</div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-xs text-[#8B5CF6] font-bold uppercase">
            <MapPin className="h-4 w-4" />
            Locatie
          </div>
          <button type="button"
            className="w-full text-left truncate text-[#1EAEDB] hover:underline font-medium bg-transparent p-0"
            onClick={() => onMapOpen(app.location || "")}
          >
            {app.location}
          </button>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button variant="outline" size="sm" className="border-[#9b87f5] text-[#7E69AB]">
          Notities ({notes?.length ?? 0})
        </Button>
        <Button variant="outline" size="sm" className="border-[#9b87f5] text-[#7E69AB]">
          Geschiedenis ({historyEntries?.length ?? 0})
        </Button>
      </div>
    </div>
    <div className="flex flex-col justify-between min-w-[230px] max-w-xs bg-gradient-to-tr from-[#D6BCFA] to-[#FDE1D3] border-l border-[#C8C8C9]/40 py-6 px-4">
      <div>
        <div className="font-bold text-[#6E59A5] tracking-wide text-center mb-2">
          Documenten
        </div>
        <div className="flex flex-col gap-2">
          <DocumentCardItem label="Offerte" available={!!digitalQuote} />
          <DocumentCardItem label="Factuur" available={!!digitalInvoice} />
          <DocumentCardItem label="Werkovereenkomst" available={!!digitalAgreement} />
        </div>
      </div>
      <Button
        onClick={onProcess}
        className="mt-6 w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white shadow font-bold rounded-lg"
        size="lg"
      >
        <Info className="mr-2 h-5 w-5" />
        Verwerken
      </Button>
    </div>
  </div>
);

function DocumentCardItem({ label, available }: { label: string; available: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${available ? "bg-white/90" : "bg-[#E5DEFF]/40"}`}>
      <FileText className={`h-4 w-4 ${available ? "text-[#0EA5E9]" : "text-[#aaa]"}`} />
      <span className={`text-sm font-medium ${available ? "text-[#1A1F2C]" : "text-[#aaa]"}`}>
        {label}
      </span>
      <span className={`ml-auto text-xs px-2 rounded-full ${available ? "bg-[#F2FCE2] text-[#34a853]" : "bg-[#FDE1D3] text-[#aaa]"}`}>
        {available ? "Beschikbaar" : "Niet beschikbaar"}
      </span>
    </div>
  );
}

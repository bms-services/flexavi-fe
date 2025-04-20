
import React from "react";
import { BlockCard } from "./BlockCard";
import { NotesHistory, HistoryEntry } from "./NotesHistory";
import { EmployeeAppointmentDocuments } from "./EmployeeAppointmentDocuments";
import { User, MapPin, Phone, Mail, Calendar, FileText } from "lucide-react";
import { Appointment } from "@/types";

interface EmployeeAppointmentInfoProps {
  app: Appointment;
  lead: any;
  notes: string[];
  historyEntries: HistoryEntry[];
  onMapOpen: (address: string) => void;
  digitalQuote?: any;
  digitalInvoice?: any;
  digitalAgreement?: any;
}

export const EmployeeAppointmentInfo: React.FC<EmployeeAppointmentInfoProps> = ({
  app,
  lead,
  notes,
  historyEntries,
  onMapOpen,
  digitalQuote,
  digitalInvoice,
  digitalAgreement,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    <BlockCard className="col-span-1">
      <div className="flex items-center gap-2 mb-1">
        <User className="h-6 w-6 text-[#189BE7]" />
        <span className="font-bold text-lg text-[#183d5c]">{lead?.name}</span>
      </div>
      <div className="flex flex-col gap-1 text-[#4496D1] text-[15px] mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{lead?.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>{lead?.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{lead?.email}</span>
        </div>
      </div>
      <button
        onClick={() => onMapOpen(lead?.address || "")}
        className="w-full flex items-center justify-center gap-2 rounded-md border border-[#189BE7] text-[#2196F3] px-3 py-1 mt-1 mb-2 font-medium bg-white hover:bg-[#E6F2FC] transition"
        type="button"
      >
        <MapPin className="h-4 w-4" />
        Bekijk op kaart
      </button>
      <NotesHistory notes={notes} historyEntries={historyEntries} />
    </BlockCard>

    <BlockCard className="col-span-1">
      <div className="mb-2">
        <span className="block text-sm font-bold text-[#189BE7] flex items-center gap-1 mb-0.5">
          <Calendar className="h-4 w-4" />
          Tijdsbestek
        </span>
        <span className="text-[15px] text-[#183d5c] font-medium">
          {app.date} · {app.startTime} - {app.endTime}
        </span>
      </div>
      <div className="mb-2">
        <span className="block text-sm font-bold text-[#189BE7] flex items-center gap-1 mb-0.5">
          <MapPin className="h-4 w-4" />
          Locatie
        </span>
        <span
          className="text-[15px] text-[#2196F3] font-medium hover:underline cursor-pointer flex items-center gap-1"
          onClick={() => onMapOpen(app.location || "")}
          tabIndex={0}
          role="button"
        >
          {app.location}
          <MapPin className="inline h-4 w-4 text-[#2196F3] ml-1" />
        </span>
      </div>
      <div>
        <span className="block text-sm font-bold text-[#189BE7] flex items-center gap-1 mb-0.5">
          <FileText className="h-4 w-4" />
          Beschrijving
        </span>
        <span className="block text-[15px] text-[#222]">{app.description}</span>
      </div>
    </BlockCard>

    <BlockCard className="col-span-1 items-center">
      <EmployeeAppointmentDocuments
        digitalQuote={digitalQuote}
        digitalInvoice={digitalInvoice}
        digitalAgreement={digitalAgreement}
      />
    </BlockCard>
  </div>
);

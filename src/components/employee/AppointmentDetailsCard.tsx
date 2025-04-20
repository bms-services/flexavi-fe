
import React from "react";
import { Calendar, MapPin, FileText } from "lucide-react";
import { Appointment } from "@/types";

interface AppointmentDetailsCardProps {
  app: Appointment;
  onMapOpen: (address: string) => void;
}

export const AppointmentDetailsCard: React.FC<AppointmentDetailsCardProps> = ({
  app,
  onMapOpen,
}) => (
  <div className="bg-[#F1F0FB] rounded-xl p-3 border flex flex-col gap-2 h-full min-w-[200px]">
    <div>
      <span className="block text-[11px] font-semibold text-[#0A8AD0] mb-0.5">
        <Calendar className="inline h-4 w-4 mr-1" />
        Tijdsbestek
      </span>
      <span className="text-[13px] text-[#0A8AD0] font-medium">
        {app.date} · {app.startTime} - {app.endTime}
      </span>
    </div>
    <div>
      <span className="block text-[11px] font-semibold text-[#0A8AD0] mb-0.5">
        <MapPin className="inline h-4 w-4 mr-1" />
        Locatie
      </span>
      <button
        onClick={() => onMapOpen(app.location || "")}
        className="text-[13px] font-medium text-[#33C3F0] hover:underline flex items-center gap-1 bg-transparent p-0 m-0"
        tabIndex={0}
        type="button"
      >
        <span>{app.location}</span>
        <span className="ml-1">
          <MapPin className="inline h-4 w-4 text-[#33C3F0]" />
        </span>
      </button>
    </div>
    <div>
      <span className="block text-[11px] font-semibold text-[#0A8AD0] mb-0.5">
        <FileText className="inline h-4 w-4 mr-1" />
        Beschrijving
      </span>
      <span className="block text-[13px] text-[#1A1F2C]">{app.description}</span>
    </div>
  </div>

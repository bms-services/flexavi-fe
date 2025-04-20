
import React from "react";
import { Calendar, MapPin, FileText, Phone, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";

interface RoofingAppointmentCardProps {
  app: Appointment;
  lead: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  onMapOpen: (address: string) => void;
  onProcess: () => void;
}

const COLORS = {
  card: "bg-[#F1F1F1]",
  border: "border-[#8E9196]",
  title: "text-[#1A1F2C]",
  label: "text-[#8E9196]",
  action: "bg-[#1A1F2C] text-white",
  accent: "text-[#0FA0CE]",
  shadow: "shadow-lg"
};

// De hoofdcard is volledig mobile-first opgezet, met rustige style en grote tap targets
export const RoofingAppointmentCard: React.FC<RoofingAppointmentCardProps> = ({
  app,
  lead,
  onMapOpen,
  onProcess,
}) => (
  <div className={`
    w-full max-w-md mx-auto rounded-xl ${COLORS.card} ${COLORS.border} border ${COLORS.shadow}
    flex flex-col p-4 gap-4 animate-fade-in
    sm:max-w-lg
  `}>
    {/* Lead-informatie */}
    <div className="flex gap-3 items-center">
      <User className="h-10 w-10 text-[#1A1F2C]" />
      <div>
        <div className={`font-bold text-lg ${COLORS.title}`}>{lead?.name || "Onbekende klant"}</div>
        <div className="flex flex-col text-xs gap-1 mt-1">
          <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{lead?.phone || "-"}</span>
        </div>
      </div>
    </div>

    {/* Afspraak details */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <InfoBlock icon={<Calendar className="h-5 w-5" />} label="Datum">
        <span className={`font-medium ${COLORS.title}`}>{app.date}</span>
      </InfoBlock>
      <InfoBlock icon={<FileText className="h-5 w-5" />} label="Beschrijving">
        <span className="line-clamp-2 text-sm">{app.description || "-"}</span>
      </InfoBlock>
      <InfoBlock icon={<MapPin className="h-5 w-5" />} label="Locatie">
        <button
          type="button"
          className={`${COLORS.accent} underline font-semibold text-left truncate`}
          onClick={() => onMapOpen(lead?.address || "")}
        >
          {lead?.address || "-"}
        </button>
      </InfoBlock>
    </div>

    {/* Duidelijke actie */}
    <div className="flex flex-col gap-3 mt-2">
      <Button
        className={`w-full h-12 rounded-lg text-base font-semibold ${COLORS.action} hover:bg-[#37395b] transition`}
        onClick={onProcess}
        size="lg"
      >
        <Info className="h-5 w-5 mr-2" /> Verwerk deze afspraak
      </Button>
    </div>
  </div>
);

function InfoBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-white p-3 border border-[#eee]">
      <div className="flex items-center gap-1 text-xs font-semibold text-[#8E9196] uppercase">
        {icon}
        {label}
      </div>
      <div className="text-[#1A1F2C]">{children}</div>
    </div>
  );
}

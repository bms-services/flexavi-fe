
import React from "react";
import { Calendar, MapPin, FileText, Phone, Mail, User, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";

// Nieuwe interface zodat we toekomstbestendig kunnen uitbreiden (incl. email etc.)
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
  onHistory?: () => void;
  onReschedule?: () => void;
}

// Kleurenpalet volgens huisstijl
const COLORS = {
  card: "bg-[#F1F0FB]",
  border: "border-[#EBE8FA]",
  icon: "text-[#1A1F2C]",
  title: "text-[#1A1F2C]",
  label: "text-[#8E9196]",
  value: "text-[#1A1F2C]",
  accent: "text-[#0EA5E9]",
  chip: "bg-[#E0E7FF] text-[#37395b]",
  button:"bg-[#1A1F2C] text-white",
  shadow: "shadow-lg"
};

export const RoofingAppointmentCard: React.FC<RoofingAppointmentCardProps> = ({
  app,
  lead,
  onMapOpen,
  onProcess,
  onHistory,
  onReschedule,
}) => (
  <div
    className={`
      w-full max-w-md mx-auto rounded-xl
      ${COLORS.card} border ${COLORS.border} ${COLORS.shadow}
      flex flex-col p-4 gap-5
      animate-fade-in
      sm:max-w-lg
    `}
  >
    {/* Klantinformatie */}
    <div className="flex gap-3 items-center">
      <User className="h-10 w-10 text-[#1A1F2C]" />
      <div>
        <div className="font-bold text-lg text-[#1A1F2C]">{lead?.name || "Onbekende klant"}</div>
        <div className="flex flex-wrap gap-2 items-center text-xs mt-1">
          <span className="flex items-center gap-1 text-[#0EA5E9]"><Phone className="h-4 w-4"/>{lead?.phone || "-"}</span>
          <span className="mx-1">·</span>
          <span className="flex items-center gap-1 text-[#0EA5E9]"><Mail className="h-4 w-4"/>{lead?.email || "-"}</span>
        </div>
      </div>
    </div>
    {/* Adres */}
    <div className="flex items-center gap-2 text-sm font-medium mt-1 text-[#37395b]">
      <MapPin className="h-5 w-5 text-[#0EA5E9]" />
      <button
        type="button"
        className="underline text-left truncate hover:text-[#176ca7] transition"
        onClick={() => onMapOpen(lead?.address || "")}
      >
        {lead?.address || "-"}
      </button>
    </div>
    {/* Afspraak details */}
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm">
      <InfoBlock
        icon={<Calendar className="h-5 w-5 text-[#1A1F2C]" />}
        label="Datum"
      >
        <span className="font-semibold">
          {app.date} <span className="font-normal text-xs text-[#8E9196] ml-1">{app.startTime} - {app.endTime}</span>
        </span>
      </InfoBlock>
      <InfoBlock
        icon={<FileText className="h-5 w-5 text-[#1A1F2C]" />}
        label="Beschrijving"
      >
        <span className="line-clamp-3">{app.description || "-"}</span>
      </InfoBlock>
    </div>
    {/* BELANGRIJK: Actieknoppen onderaan, goed te bedienen met duim */}
    <div className="flex flex-col gap-2 mt-1">
      <Button
        className="w-full h-11 rounded-lg text-base font-semibold bg-[#1A1F2C] text-white hover:bg-[#37395b] transition"
        onClick={onProcess}
        size="lg"
      >
        <Info className="h-5 w-5 mr-1" /> Verwerken
      </Button>
      <div className="flex gap-2">
        <Button
          className="flex-1 font-medium border border-[#0EA5E9] text-[#0EA5E9] bg-white hover:bg-[#e3f2fd] rounded-lg"
          variant="outline"
          onClick={onHistory}
          size="sm"
        >
          Geschiedenis
        </Button>
        <Button
          className="flex-1 font-medium border border-[#f59e42] text-[#f59e42] bg-white hover:bg-[#fff6eb] rounded-lg"
          variant="outline"
          onClick={onReschedule}
          size="sm"
        >
          Verzetten
        </Button>
      </div>
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
      <div className={COLORS.value}>{children}</div>
    </div>
  );
}

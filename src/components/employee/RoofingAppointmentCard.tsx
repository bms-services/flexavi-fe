
import React from "react";
import {
  Calendar,
  MapPin,
  FileText,
  Phone,
  Mail,
  User,
  History,
  Home,
  Briefcase,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Appointment } from "@/types";

interface HistoryEntry {
  date: string;
  reason: string;
}

interface RoofingAppointmentCardProps {
  app: Appointment;
  lead: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    source?: string;
    status?: string;
    roofType?: string;
    jobType?: string;
    desiredWork?: string;
  };
  onMapOpen: (address: string) => void;
  onProcess: () => void;
  onHistory?: () => void;
  onReschedule?: () => void;
  historyEntries?: HistoryEntry[];
  rescheduleReason?: string;
}

const COLORS = {
  card: "bg-white",
  border: "border-[#EBE8FA]",
  value: "text-[#1A1F2C]",
  label: "text-[#8E9196]",
  accent: "text-[#7E69AB]",
  chip: "bg-[#E0E7FF] text-[#37395b]",
  button: "bg-[#9b87f5] text-white",
  shadow: "shadow-xl",
};

export const RoofingAppointmentCard: React.FC<RoofingAppointmentCardProps> = ({
  app,
  lead = {},
  onMapOpen,
  onProcess,
  onHistory,
  onReschedule,
  historyEntries = [],
  rescheduleReason,
}) => (
  <div
    className={`
      max-w-full w-full rounded-3xl
      ${COLORS.card}
      border ${COLORS.border}
      ${COLORS.shadow}
      flex flex-col gap-7
      animate-fade-in
      px-5 py-7 sm:px-8 sm:py-8
      transition-shadow duration-200 hover:shadow-2xl
    `}
    style={{
      background:
        "linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)",
      border: "1px solid #EBE8FA",
    }}
  >
    {/* 1. Datum & Tijd van afspraak */}
    <SectionTitle icon={<Calendar className="h-5 w-5 text-roof-500" />} label="Afspraakdatum & tijd" />
    <div className="flex flex-col gap-1.5 mb-1">
      <span className="font-semibold text-lg text-roof-700">{app.date}</span>
      <span className="text-xs text-muted-foreground">{app.startTime} - {app.endTime}</span>
    </div>
    <Separator className="my-0" />

    {/* 2. Klantnaam, contact gegevens, volledig adres */}
    <SectionTitle icon={<User className="h-5 w-5 text-roof-500" />} label="Klantinformatie" />
    <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start md:items-center">
      <div className="flex flex-col gap-1 min-w-[220px]">
        <span className="text-lg font-bold text-roof-900">{lead.name || "Onbekende klant"}</span>
        <span className="mt-1 px-2 py-0.5 text-xs rounded shadow-inner bg-roof-100 text-roof-600 font-medium w-fit">
          {lead.status || "Status onbekend"}
        </span>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-roof-600 font-medium mt-2">
          <span className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <a href={lead?.phone ? `tel:${lead.phone}` : "#"} className="hover:underline">{lead?.phone || "-"}</a>
          </span>
          <span className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <a href={lead?.email ? `mailto:${lead.email}` : "#"} className="hover:underline">{lead?.email || "-"}</a>
          </span>
        </div>
        <div className="flex flex-col gap-1 mt-1 text-xs text-muted-foreground">
          <div><b>Bron:</b> {lead.source || "-"}</div>
        </div>
      </div>
      {/* Adres */}
      <div className="flex-1 flex flex-col items-start mt-2 md:mt-0">
        <span className="flex gap-2 items-center text-roof-600 text-sm font-semibold truncate max-w-xs">
          <MapPin className="h-5 w-5 mr-1" />
          <button
            type="button"
            className="underline text-left truncate hover:text-roof-700 transition max-w-xs"
            onClick={() => onMapOpen(lead?.address || "")}
            title={lead?.address}
          >
            {lead?.address || "-"}
          </button>
        </span>
      </div>
    </div>
    <Separator className="my-0" />

    {/* 3. Uitgebreide afspraak info */}
    <SectionTitle icon={<FileText className="h-5 w-5 text-roof-500" />} label="Uitgebreide afspraakinformatie" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <InfoField icon={<Home className="h-4 w-4 text-roof-500" />} label="Type dak">
        <span>{lead?.roofType || <span className="text-muted-foreground">Onbekend</span>}</span>
      </InfoField>
      <InfoField icon={<Briefcase className="h-4 w-4 text-roof-500" />} label="Type opdracht">
        <span>{lead?.jobType || <span className="text-muted-foreground">Onbekend</span>}</span>
      </InfoField>
      <InfoField icon={<Wrench className="h-4 w-4 text-roof-500" />} label="Gewenste werkzaamheden">
        <span>{lead?.desiredWork || <span className="text-muted-foreground">Niet ingevuld</span>}</span>
      </InfoField>
      <InfoField icon={<FileText className="h-4 w-4 text-roof-500" />} label="Omschrijving">
        <span className="whitespace-pre-line">{app.description || <span className="text-muted-foreground">-</span>}</span>
      </InfoField>
    </div>
    {rescheduleReason && (
      <div className="mt-3 py-2 px-3 text-xs bg-amber-50 border-l-4 border-amber-400 rounded text-[#eb9e34] flex items-center gap-2">
        <History className="h-4 w-4" />
        <b>Afspraak verzet:</b>
        <span>{rescheduleReason}</span>
      </div>
    )}
    <Separator className="my-0" />

    {/* 4. Klantgeschiedenis */}
    <SectionTitle icon={<History className="h-4 w-4 text-roof-500" />} label="Klantgeschiedenis" />
    <div className="flex flex-col gap-1 mb-2">
      {historyEntries && historyEntries.length > 0 ? (
        <ul className="list-disc pl-5 text-xs text-[#222]">
          {historyEntries.map((h, i) => (
            <li key={i} className="mb-0.5">
              <span className="font-semibold">Op {h.date}:</span> {h.reason}
            </li>
          ))}
        </ul>
      ) : (
        <span className="italic text-gray-400 text-xs">Geen eerdere acties bekend.</span>
      )}
    </div>

    {/* Actieknoppen */}
    <div className="flex flex-col md:flex-row gap-3 mt-4 w-full">
      <Button
        className="w-full md:w-auto h-12 rounded-lg text-base font-semibold bg-roof-500 text-white hover:bg-roof-700 transition shadow-md"
        onClick={onProcess}
        size="lg"
      >
        <FileText className="h-5 w-5 mr-1" /> Verwerken
      </Button>
      <Button
        className="flex-1 font-medium border border-roof-600 text-roof-700 bg-white hover:bg-roof-100 rounded-lg"
        variant="outline"
        onClick={onHistory}
        size="lg"
      >
        <History className="h-5 w-5 mr-1" /> Geschiedenis
      </Button>
      <Button
        className="flex-1 font-medium border border-[#faad13] text-[#faad13] bg-white hover:bg-[#fff7ec] rounded-lg"
        variant="outline"
        onClick={onReschedule}
        size="lg"
      >
        Verzetten
      </Button>
    </div>
  </div>
);

// ----- Kleine helpers -----
function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="mb-2 flex items-center gap-2 text-base font-semibold text-roof-600 uppercase tracking-wide">
      {icon}
      {label}
    </div>
  );
}

function InfoField({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl bg-[#F8F7FD] p-3 gap-1 border border-[#eee] min-h-[62px]">
      <div className="flex items-center gap-1 text-xs font-semibold text-roof-600">
        {icon}
        {label}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

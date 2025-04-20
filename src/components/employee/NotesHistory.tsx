
import React from "react";
import { FileText, History } from "lucide-react";

export interface HistoryEntry {
  type: string;
  description: string;
  date: string;
}

interface NotesHistoryProps {
  notes: string[];
  historyEntries: HistoryEntry[];
}

export const NotesHistory: React.FC<NotesHistoryProps> = ({
  notes,
  historyEntries,
}) => (
  <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full">
    <div className="flex-1">
      <div className="flex items-center gap-1 mb-1 text-sm font-semibold text-[#2196F3]">
        <FileText className="h-4 w-4" /> Notities
      </div>
      {notes.length > 0 ? (
        <ul className="list-disc pl-4 text-[13px] text-[#222]">
          {notes.map((n, i) => (
            <li key={i} className="whitespace-pre-wrap">{n}</li>
          ))}
        </ul>
      ) : (
        <span className="italic text-gray-400 text-[13px]">Geen notities</span>
      )}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-1 mb-1 text-sm font-semibold text-[#2196F3]">
        <History className="h-4 w-4" /> Geschiedenis
      </div>
      {historyEntries.length > 0 ? (
        <ul className="list-disc pl-4 text-[13px] text-[#222]">
          {historyEntries.map((entry, i) => (
            <li key={i}>
              <span className="font-semibold">{entry.type}</span>: {entry.description}{" "}
              <span className="text-gray-400 text-[12px]">{entry.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="italic text-gray-400 text-[13px]">Geen geschiedenis</span>
      )}
    </div>
  </div>
);


import React from "react";
import { KnowledgeBaseEntry } from "@/types/knowledge-base";
import { FAQCard } from "./FAQCard";

interface FAQGridProps {
  entries: KnowledgeBaseEntry[];
  onSelectEntry: (entry: KnowledgeBaseEntry) => void;
}

export function FAQGrid({ entries, onSelectEntry }: FAQGridProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">Geen FAQ items gevonden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map(entry => (
        <FAQCard 
          key={entry.id} 
          entry={entry} 
          onClick={onSelectEntry}
        />
      ))}
    </div>
  );
}

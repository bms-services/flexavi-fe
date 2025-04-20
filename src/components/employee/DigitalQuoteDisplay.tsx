
import React from "react";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";

interface DigitalQuoteDisplayProps {
  quote: ReceiptData;
  title?: string;
}

export const DigitalQuoteDisplay: React.FC<DigitalQuoteDisplayProps> = ({ 
  quote, 
  title = "Offerte (digitaal)" 
}) => (
  <div className="bg-accent/30 border border-accent rounded-md p-3 text-sm mt-1 shadow-sm">
    <div className="font-medium mb-1 text-accent-foreground flex items-center gap-2">
      <span className="text-xs bg-accent px-2 py-0.5 rounded font-semibold">{title}</span>
    </div>
    <ul className="list-disc ml-4 text-xs text-muted-foreground mt-1">
      {Object.entries(quote || {}).map(([key, val]) => (
        <li key={key}><b>{key}:</b> {String(val)}</li>
      ))}
    </ul>
  </div>
);

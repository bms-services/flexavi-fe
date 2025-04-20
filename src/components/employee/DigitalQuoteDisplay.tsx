
import React from "react";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";

export const DigitalQuoteDisplay: React.FC<{ quote: ReceiptData }> = ({ quote }) => (
  <div className="bg-accent/50 rounded p-3 text-sm mt-2">
    <div className="font-medium mb-1">Digitale Offerte (geëxtraheerd)</div>
    <ul className="list-disc ml-4">
      {Object.entries(quote || {}).map(([key, val]) => (
        <li key={key}><b>{key}</b>: {String(val)}</li>
      ))}
    </ul>
  </div>
);

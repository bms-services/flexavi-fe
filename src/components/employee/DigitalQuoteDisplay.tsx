
import React from "react";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { FileText } from "lucide-react";

interface DigitalQuoteDisplayProps {
  quote: ReceiptData;
  title?: string;
}

export const DigitalQuoteDisplay: React.FC<DigitalQuoteDisplayProps> = ({ 
  quote, 
  title = "Document" 
}) => (
  <div className="bg-gray-50 border rounded-md p-3 text-sm shadow-sm hover:bg-gray-100 transition-colors">
    <div className="flex items-center gap-2 mb-1.5">
      <FileText className="h-3.5 w-3.5 text-roof-500" />
      <span className="text-xs font-medium text-roof-600">{title}</span>
    </div>
    
    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
      {Object.entries(quote || {}).map(([key, val]) => (
        <div key={key} className="text-xs overflow-hidden text-ellipsis">
          <span className="font-medium text-gray-500">{key}:</span>{" "}
          <span className="text-gray-700">{String(val)}</span>
        </div>
      ))}
    </div>
  </div>
);


import React from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface QuoteDatesInfoProps {
  quote: {
    createdAt: string;
    plannedStartDate?: string;
  };
}

export const QuoteDatesInfo = ({ quote }: QuoteDatesInfoProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Offerte details</h3>
      <div className="bg-gray-50 p-4 rounded-md space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Datum: {format(new Date(quote.createdAt), "d MMMM yyyy", {
            locale: nl,
          })}</span>
        </div>
        {quote.plannedStartDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Geplande startdatum: {format(new Date(quote.plannedStartDate), "d MMMM yyyy", {
              locale: nl,
            })}</span>
          </div>
        )}
      </div>
    </div>
  );
};

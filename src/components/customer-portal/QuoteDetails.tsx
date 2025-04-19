
import React from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { User, MapPin, Calendar } from "lucide-react";

interface QuoteDetailsProps {
  customer: any;
  quote: any;
  formatCurrency: (amount: number) => string;
}

const QuoteDetails = ({ customer, quote, formatCurrency }: QuoteDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Klantgegevens</h3>
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{customer.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{customer.address}</span>
          </div>
        </div>
      </div>
      
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
    </div>
  );
};

export default QuoteDetails;

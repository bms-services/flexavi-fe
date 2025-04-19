
import React from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { User, MapPin, Calendar, FileText, Clock } from "lucide-react";

interface WorkAgreementDetailsProps {
  customer: {
    name: string;
    address: string;
  };
  workAgreement: {
    createdAt: string;
    startDate: string;
    workDescription: string;
    warranty: string;
  };
  formatCurrency: (amount: number) => string;
}

export const WorkAgreementDetails = ({ 
  customer, 
  workAgreement, 
  formatCurrency 
}: WorkAgreementDetailsProps) => {
  return (
    <div className="space-y-6">
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
          <h3 className="text-sm font-medium text-gray-500 mb-2">Werkovereenkomst details</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Datum overeenkomst: {format(new Date(workAgreement.createdAt), "d MMMM yyyy", {
                locale: nl,
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>Geplande startdatum: {format(new Date(workAgreement.startDate), "d MMMM yyyy", {
                locale: nl,
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <span>Garantie: {workAgreement.warranty} jaar</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Beschrijving werkzaamheden</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="whitespace-pre-line">{workAgreement.workDescription}</p>
        </div>
      </div>
    </div>
  );
};


import React from "react";
import { User, MapPin, Mail, Phone, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CompanyDetailsProps {
  companyDetails: {
    name: string;
    address: string;
    email: string;
    phone: string;
    taxId: string;
  };
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({ companyDetails }) => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
        <User className="h-4 w-4" />
        Opdrachtnemer (Bedrijf)
      </h3>
      <div className="space-y-3">
        <p className="font-medium">{companyDetails.name}</p>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-gray-400 mt-1" />
          <span>{companyDetails.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-400" />
          <a href={`mailto:${companyDetails.email}`} className="hover:underline">
            {companyDetails.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-400" />
          <a href={`tel:${companyDetails.phone}`} className="hover:underline">
            {companyDetails.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span>BTW: {companyDetails.taxId}</span>
        </div>
      </div>
    </Card>
  );
};

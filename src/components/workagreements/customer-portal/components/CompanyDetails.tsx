
import React from "react";
import { User } from "lucide-react";
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
      <div className="space-y-2">
        <p className="font-medium">{companyDetails.name}</p>
        <p>{companyDetails.address}</p>
        <p>Email: {companyDetails.email}</p>
        <p>Tel: {companyDetails.phone}</p>
        <p>BTW: {companyDetails.taxId}</p>
      </div>
    </Card>
  );
};

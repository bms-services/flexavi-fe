
import React from "react";
import { User, MapPin, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CustomerInfoCardProps {
  customer: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
}

export const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({ customer }) => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
        <User className="h-4 w-4" />
        Opdrachtgever
      </h3>
      <div className="space-y-3">
        <p className="font-medium">{customer.name}</p>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-gray-400 mt-1" />
          <span>{customer.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-400" />
          <a href={`mailto:${customer.email}`} className="hover:underline">
            {customer.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-400" />
          <a href={`tel:${customer.phone}`} className="hover:underline">
            {customer.phone}
          </a>
        </div>
      </div>
    </Card>
  );
};

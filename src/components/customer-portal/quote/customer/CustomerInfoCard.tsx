
import React from "react";
import { User, MapPin } from "lucide-react";

interface CustomerInfoCardProps {
  customer: {
    name: string;
    address: string;
  };
}

export const CustomerInfoCard = ({ customer }: CustomerInfoCardProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Klantgegevens</h3>
      <div className="bg-white border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow space-y-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <span className="font-medium">{customer.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{customer.address}</span>
        </div>
      </div>
    </div>
  );
};

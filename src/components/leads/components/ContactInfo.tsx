
import React from "react";
import { LeadDetail } from "@/types";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface ContactInfoProps {
  lead: LeadDetail;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ lead }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">Contact Informatie</h3>
        <p className="text-sm text-muted-foreground">Belangrijke contactgegevens van de lead</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Naam</p>
            <p className="font-medium">{lead.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="font-medium">{lead.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Telefoon</p>
            <p className="font-medium">{lead.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Adres</p>
            <p className="font-medium">{lead.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

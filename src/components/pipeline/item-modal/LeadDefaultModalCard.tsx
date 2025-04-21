
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export const LeadDefaultModalCard: React.FC = () => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-base font-semibold">
      <Phone className="h-4 w-4 text-muted-foreground" />
      <span>06-12345678</span>
    </div>
    <div className="flex items-center gap-2 text-base font-semibold">
      <Mail className="h-4 w-4 text-muted-foreground" />
      <span>contact@voorbeeld.nl</span>
    </div>
    <div className="flex items-center gap-2 text-base font-semibold">
      <MapPin className="h-4 w-4 text-muted-foreground" />
      <span>Amsterdam, Nederland</span>
    </div>
  </div>
);

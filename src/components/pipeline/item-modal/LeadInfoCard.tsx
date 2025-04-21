
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export const LeadInfoCard: React.FC = () => (
  <>
    <div className="flex items-center gap-2 text-sm">
      <Phone className="h-4 w-4 text-muted-foreground" />
      <span>06-12345678</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <Mail className="h-4 w-4 text-muted-foreground" />
      <span>contact@voorbeeld.nl</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <MapPin className="h-4 w-4 text-muted-foreground" />
      <span>Amsterdam, Nederland</span>
    </div>
  </>
);

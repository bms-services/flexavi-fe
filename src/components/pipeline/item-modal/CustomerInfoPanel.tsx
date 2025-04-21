
import React from "react";
import { User, MapPin, Phone, Mail, Info, Home, BadgeEuro } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LeadLocationMap } from "@/components/leads/components/LeadLocationMap";
import { formatEuro } from "@/lib/utils";

interface CustomerInfoPanelProps {
  lead: {
    name: string;
    address: string;
    phone: string;
    email: string;
    requestReason: string;
    wozValue: number;
    estimatedProjectValue: number;
  };
}

export const CustomerInfoPanel: React.FC<CustomerInfoPanelProps> = ({ lead }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        Klantinformatie
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
            <div>
              <p className="font-medium">{lead.name}</p>
              <p className="text-sm text-muted-foreground">{lead.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${lead.phone}`} className="text-sm hover:underline">{lead.phone}</a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${lead.email}`} className="text-sm hover:underline">{lead.email}</a>
          </div>
          <div className="flex items-start gap-3">
            <Info className="h-4 w-4 text-muted-foreground mt-1" />
            <div>
              <p className="text-sm font-medium">Reden van aanvraag</p>
              <p className="text-sm">{lead.requestReason}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Home className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">WOZ Waarde</p>
              <p className="text-sm">{formatEuro(lead.wozValue)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BadgeEuro className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Geschatte opdrachtwaarde (AI)</p>
              <p className="text-sm font-semibold text-green-600">{formatEuro(lead.estimatedProjectValue)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <LeadLocationMap address={lead.address} />
      </div>
    </CardContent>
  </Card>
);

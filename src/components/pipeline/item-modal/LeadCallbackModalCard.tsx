
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

interface LeadCallbackModalCardProps {
  lead: {
    name: string;
    address: string;
    phone: string;
    email: string;
    objectId: string;
  };
}

function getWozWaarde(address: string) {
  return 315000;
}

function getAanvraagReden(objectId: string) {
  return "Daklekkage";
}

function getAiWaarde(woz: number, reden: string) {
  let factor = reden.toLowerCase().includes("lekkage") ? 1.2 : 1;
  return Math.round(woz * 0.04 * factor);
}

export const LeadCallbackModalCard: React.FC<LeadCallbackModalCardProps> = ({ lead }) => {
  const woz = getWozWaarde(lead.address);
  const reden = getAanvraagReden(lead.objectId);
  const aiEstimate = getAiWaarde(woz, reden);

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(lead.address)}&zoom=15&size=600x300&maptype=roadmap&markers=color:blue%7C${encodeURIComponent(lead.address)}&key=DEMO_KEY`;

  return (
    <div className="flex gap-8 flex-col lg:flex-row">
      <div className="flex-1 space-y-3 min-w-[250px]">
        <div className="flex items-center gap-2 text-base font-semibold">{lead.name}</div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{lead.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <a className="hover:underline" href={`tel:${lead.phone}`}>{lead.phone}</a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a className="hover:underline" href={`mailto:${lead.email}`}>{lead.email}</a>
        </div>
        <div className="text-sm mt-2">
          <span className="font-semibold">Reden van aanvraag:</span>
          <span className="ml-2">{reden}</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold">WOZ-waarde woning:</span>
          <span className="ml-2">€ {woz.toLocaleString("nl-NL")}</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold">AI-inschatting opdrachtwaarde:</span>
          <span className="ml-2">€ {aiEstimate.toLocaleString("nl-NL")}</span>
        </div>
      </div>
      <div className="flex-[1.3] min-w-[280px]">
        <div className="rounded-lg overflow-hidden border shadow-sm aspect-video bg-muted flex items-center justify-center">
          <img
            src={mapUrl}
            alt="Adres locatie"
            className="object-cover w-full h-full"
            style={{ minHeight: 180, maxHeight: 240 }}
            onError={e => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x300?text=Google+Maps+hier";
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Google Maps Streetview (API key nodig, DEMO_KEY vervangen)
        </p>
      </div>
    </div>
  );
};

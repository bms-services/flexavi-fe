
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

// Dummy/mock data functies (hier kun je later API calls gebruiken)
function getWozWaarde(address: string) {
  // Dummy waarde, bv. 315.000 euro
  return 315000;
}

function getAanvraagReden(objectId: string) {
  // Dummy waarde, bv. "Daklekkage"
  return "Daklekkage";
}

function getAiWaarde(woz: number, reden: string) {
  // Dummy: stel dat AI opdrachtwaarde 4% van de WOZ is, bij lekkage factor 1.2
  let factor = reden.toLowerCase().includes("lekkage") ? 1.2 : 1;
  return Math.round(woz * 0.04 * factor);
}

interface LeadCallbackInfoCardProps {
  lead: {
    name: string;
    address: string;
    phone: string;
    email: string;
    objectId: string;
  };
}

export const LeadCallbackInfoCard: React.FC<LeadCallbackInfoCardProps> = ({ lead }) => {
  const woz = getWozWaarde(lead.address);
  const reden = getAanvraagReden(lead.objectId);
  const aiEstimate = getAiWaarde(woz, reden);

  // Google Maps static image (vervang eventueel met embed, API key nodig)
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(lead.address)}&zoom=15&size=600x300&maptype=roadmap&markers=color:blue%7C${encodeURIComponent(lead.address)}&key=DEMO_KEY`;

  return (
    <div className="flex gap-6 flex-col lg:flex-row">
      <div className="flex-1 space-y-3 min-w-[230px]">
        <div className="flex items-center gap-2 text-base font-semibold">
          {lead.name}
        </div>
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
        <div className="flex flex-col gap-1 text-sm mt-2">
          <span className="font-semibold">Reden van aanvraag:</span>
          <span>{reden}</span>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-semibold">WOZ-waarde woning:</span>
          <span>€ {woz.toLocaleString("nl-NL")}</span>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-semibold">AI-inschatting opdrachtwaarde:</span>
          <span>€ {aiEstimate.toLocaleString("nl-NL")}</span>
        </div>
      </div>
      <div className="flex-[1.2] min-w-[250px]">
        <div className="rounded-lg overflow-hidden border shadow-sm aspect-video bg-muted flex items-center justify-center">
          {/* Demo: vervang DEMO_KEY door je eigen Google Static Maps API key */}
          <img
            src={mapUrl}
            alt="Adres locatie"
            className="object-cover w-full h-full"
            style={{ minHeight: 180, maxHeight: 240 }}
            onError={e => {
              // Fall back/simple output bij demo gebruik
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x300?text=Google+Maps+hier";
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Google Maps Streetview (API key nodig). Voer je eigen API key in om echte data te tonen.
        </p>
      </div>
    </div>
  );
};

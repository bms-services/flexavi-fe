
import React from "react";
import { Card } from "@/components/ui/card";

export const GeneralTerms: React.FC = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Algemene Voorwaarden</h3>
      <div className="space-y-4 text-sm">
        <p>
          Op deze overeenkomst van opdracht zijn de algemene voorwaarden van Dakspecialist.nu van toepassing, 
          welke u terug kunt vinden op onze website www.dakspecialist.nu (deze zijn ook ter hand gereikt) 
          daarvan ook onlosmakelijk deel uitmaken.
        </p>
        <p>
          Indien werkzaamheden zien op het herstellen van lekkages, dan geldt voor wat betreft het herstel 
          daarvan expliciet dat er sprake is van een inspanningsplicht en niet van een resultaatverplichting.
        </p>
        <p>
          Onvoorziene werkzaamheden, benodigd ter uitvoering van de originele werkzaamheden, zullen uitsluitend, 
          tegen een overeengekomen meerprijs, door ons uitgevoerd worden.
        </p>
        <p>
          Door ondertekening ziet u af van de wettelijke bedenktijd van 14 dagen.
        </p>
      </div>
    </Card>
  );
};

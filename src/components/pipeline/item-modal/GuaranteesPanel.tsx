
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Guarantee {
  id: string;
  objectId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface GuaranteesPanelProps {
  guarantees: Guarantee[];
  getStatusColor: (status: string) => string;
}

export const GuaranteesPanel: React.FC<GuaranteesPanelProps> = ({ guarantees, getStatusColor }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        Garanties
      </CardTitle>
    </CardHeader>
    <CardContent>
      {guarantees.length > 0 ? (
        <div className="space-y-4">
          {guarantees.map(guarantee => (
            <div key={guarantee.id} className="bg-slate-50 rounded-md p-3 border">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{guarantee.title}</h4>
                <Badge className={getStatusColor(guarantee.status)}>
                  {guarantee.status === "active" ? "Actief" : "Verlopen"}
                </Badge>
              </div>
              <p className="text-sm mt-1">{guarantee.description}</p>
              <div className="text-xs text-muted-foreground mt-2">
                Geldig tot: {new Date(guarantee.endDate).toLocaleDateString("nl")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground italic text-sm">
          Geen lopende garanties gevonden voor deze klant.
        </div>
      )}
    </CardContent>
  </Card>
);

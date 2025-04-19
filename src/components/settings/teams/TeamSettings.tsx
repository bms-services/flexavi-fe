
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, Plus } from "lucide-react";

export const TeamSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams beheren</CardTitle>
        <CardDescription>
          Voeg nieuwe teams toe of bewerk bestaande teams.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" /> Verkoop Teams
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Voeg verkoop team toe
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5" /> Uitvoerende Teams
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Voeg uitvoerend team toe
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

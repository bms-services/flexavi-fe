
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CalendarColorSettingsProps {
  colors: {
    emptyBorder: string;
    fullBorder: string;
  };
  onColorsChange: (colors: { emptyBorder: string; fullBorder: string }) => void;
  onSave: () => void;
}

export const CalendarColorSettings: React.FC<CalendarColorSettingsProps> = ({
  colors,
  onColorsChange,
  onSave,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agenda weergave</CardTitle>
        <CardDescription>
          Pas de kleuren aan voor verschillende agenda statussen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Kleur voor lege agenda</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={colors.emptyBorder}
                onChange={(e) =>
                  onColorsChange({ ...colors, emptyBorder: e.target.value })
                }
              />
              <span className="text-sm text-muted-foreground">
                {colors.emptyBorder}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Kleur voor volle agenda</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={colors.fullBorder}
                onChange={(e) =>
                  onColorsChange({ ...colors, fullBorder: e.target.value })
                }
              />
              <span className="text-sm text-muted-foreground">
                {colors.fullBorder}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} className="ml-auto">
          Kleuren opslaan
        </Button>
      </CardFooter>
    </Card>
  );
};


import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const PasswordSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wachtwoord Wijzigen</CardTitle>
        <CardDescription>
          Update je wachtwoord voor veiligheid.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Huidig Wachtwoord</Label>
            <Input id="current-password" type="password" />
          </div>
          <div />
          <div className="space-y-2">
            <Label htmlFor="new-password">Nieuw Wachtwoord</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Bevestig Nieuw Wachtwoord</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Wachtwoord Wijzigen</Button>
      </CardFooter>
    </Card>
  );
};

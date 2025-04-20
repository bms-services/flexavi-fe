
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PaymentMethodSelect } from "@/components/workagreements/forms/payment-terms/components/PaymentMethodSelect";
import { WorkAgreementExclusionsForm } from "@/components/workagreements/forms/WorkAgreementExclusionsForm";
import { Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PaymentMethod } from "@/types";

export const WorkAgreementSettingsForm = () => {
  const [warranty, setWarranty] = useState("5");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [exclusions, setExclusions] = useState<string[]>([
    "Verwijderen van asbest",
    "Schilderwerk",
    "Stucwerk"
  ]);
  const [defaultInstallments] = useState([
    { percentage: 40, description: "Bij aanvang werkzaamheden", dueType: "start" as const },
    { percentage: 50, description: "Tijdens werkzaamheden", dueType: "during" as const },
    { percentage: 10, description: "Bij oplevering", dueType: "completion" as const }
  ]);

  const handleSave = () => {
    // Here you would save the settings to your backend
    toast.success("Instellingen opgeslagen");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Werkovereenkomst instellingen</CardTitle>
            <CardDescription>
              Beheer de standaard instellingen voor nieuwe werkovereenkomsten
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="warranty">Standaard garantie periode (jaren)</Label>
          <Input
            id="warranty"
            type="number"
            value={warranty}
            onChange={(e) => setWarranty(e.target.value)}
            min="0"
            max="30"
          />
        </div>

        <div>
          <Label>Standaard betaalmethode</Label>
          <PaymentMethodSelect
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>

        <div>
          <Label>Standaard betaaltermijnen</Label>
          <div className="space-y-2 mt-2">
            {defaultInstallments.map((installment, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md">
                <span>{installment.description}</span>
                <span className="font-medium">{installment.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Standaard uitsluitingen</Label>
          <div className="mt-2">
            <WorkAgreementExclusionsForm
              exclusions={exclusions}
              onChange={setExclusions}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Instellingen opslaan
        </Button>
      </CardContent>
    </Card>
  );
};

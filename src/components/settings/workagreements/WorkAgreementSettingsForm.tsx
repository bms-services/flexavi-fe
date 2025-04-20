
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WorkAgreementExclusionsForm } from "@/components/workagreements/forms/WorkAgreementExclusionsForm";
import { PaymentTermsForm } from "@/components/workagreements/forms/payment-terms/PaymentTermsForm";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { PaymentMethod, PaymentInstallment } from "@/types";

export const WorkAgreementSettingsForm = () => {
  // Standaardwaarden voor instellingen
  const [warranty, setWarranty] = useState("5");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [cashPaymentAmount, setCashPaymentAmount] = useState(0);
  const [paymentInstallments, setPaymentInstallments] = useState<PaymentInstallment[]>([
    { percentage: 40, description: "Bij aanvang werkzaamheden", dueType: "start" },
    { percentage: 50, description: "Tijdens werkzaamheden", dueType: "during" },
    { percentage: 10, description: "Bij oplevering", dueType: "completion" }
  ]);
  const [exclusions, setExclusions] = useState<string[]>([
    "Verwijderen van asbest",
    "Schilderwerk",
    "Stucwerk"
  ]);
  // Dit bedrag is alleen visueel, je kan evt. totaalbedrag aanpassen voor test
  const DUMMY_TOTAL = 10000; // Alleen voor het formulier

  const handleSave = () => {
    // Hier zou je de standaardinstellingen versturen naar een backend endpoint
    toast.success("Standaard werkovereenkomst-instellingen opgeslagen");
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
          <Label>Standaard betaalvoorwaarden</Label>
          <div className="mt-2">
            <PaymentTermsForm
              paymentMethod={paymentMethod}
              cashPaymentAmount={cashPaymentAmount}
              paymentInstallments={paymentInstallments}
              totalAmount={DUMMY_TOTAL}
              onPaymentMethodChange={setPaymentMethod}
              onCashPaymentAmountChange={setCashPaymentAmount}
              onPaymentInstallmentsChange={setPaymentInstallments}
              disabled={false}
            />
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

        {/* Hier kun je later aanvullende secties toevoegen zoals Algemene Voorwaarden en Bijlagen */}

        <Button onClick={handleSave} className="w-full">
          Instellingen opslaan
        </Button>
      </CardContent>
    </Card>
  );
};

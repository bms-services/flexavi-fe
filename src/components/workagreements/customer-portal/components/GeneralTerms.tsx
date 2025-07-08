
import React from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { WorkAgreementReq } from "@/zustand/types/workAgreementT";
import { useFormContext } from "react-hook-form";

export const GeneralTerms = ({ name = "general_term_conditions" }: { name?: string }) => {
  const {
    formState: { errors },
    register
  } = useFormContext<WorkAgreementReq>();

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500">Algemene Voorwaarden</h3>
      <Textarea
        className="mt-4"
        placeholder="Eventuele aanvullende opmerkingen of voorwaarden..."
        rows={8}
        rules={{
          register,
          name: name as keyof WorkAgreementReq,
          options: {
            required: "Dit veld is verplicht",
            maxLength: {
              value: 500,
              message: "Maximaal 500 tekens"
            }
          },
          errors,
        }}
      />
    </Card>
  );
};

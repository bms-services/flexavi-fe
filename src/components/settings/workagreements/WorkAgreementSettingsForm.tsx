
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WorkAgreementExclusionsForm } from "@/components/workagreements/forms/WorkAgreementExclusionsForm";
import { PaymentTermsForm } from "@/components/workagreements/forms/payment-terms/PaymentTermsForm";
import { Settings } from "lucide-react";

import { WorkAgreementPaymentMethod, WorkAgreementsExclusionsReq, WorkAgreementTemplateReq } from "@/zustand/types/workAgreementT";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetWorkAgreementTemplate, useUpdateWorkAgreementTemplate } from "@/zustand/hooks/useWorkAgreement";
import { GeneralTerms } from "@/components/workagreements/customer-portal/components/GeneralTerms";

const defaultWorkAgreement: WorkAgreementTemplateReq = {
  warranty: 0,
  terms_and_conditions: "",
  total_amount: 1000,
  payment: {
    payment_method: "bank_transfer",
    total_cash: 0,
    terms: [],
    total_percentage: 0
  },
  exclusions: []
};


export const WorkAgreementSettingsForm = () => {
  const { t } = useTranslation();
  const methods = useForm<WorkAgreementTemplateReq>({
    defaultValues: defaultWorkAgreement,
  });

  const getWorkAgreementTemplateZ = useGetWorkAgreementTemplate(true);
  const updateWorkAgreementTemplateZ = useUpdateWorkAgreementTemplate();

  const onSubmit = (data: WorkAgreementTemplateReq) => {
    const newData = {
      ...data,
      exclusions: data.exclusions?.map((e) => e.description) as unknown as WorkAgreementsExclusionsReq[],
    };
    updateWorkAgreementTemplateZ.mutateAsync(newData);
  };

  useEffect(() => {
    if (getWorkAgreementTemplateZ.isSuccess && getWorkAgreementTemplateZ.data?.result) {
      const data = getWorkAgreementTemplateZ.data.result;

      methods.setValue("warranty", Number(data.warranty ?? 0));
      methods.setValue("exclusions", data.exclusions.map((e) => ({ description: e.description })));
      methods.setValue("payment.payment_method", data.payment.payment_method as WorkAgreementPaymentMethod);
      methods.setValue("payment.total_cash", Number(data.payment.total_cash ?? 0));
      methods.setValue("payment.total_percentage", 0);
      methods.setValue("terms_and_conditions", data.terms_and_conditions ?? "");

    }
  }, [getWorkAgreementTemplateZ.isSuccess, getWorkAgreementTemplateZ.data]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            <Input
              label="Garantie (jaren)"
              id="warranty"
              type="number"
              min="0"
              max="30"
              rules={{
                register: methods.register,
                name: "warranty",
                options: {
                  required: t('workAgreement.error.required.warranty'),
                },
                errors: methods.formState.errors,
              }}
            />
            <div>
              <Label>Standaard betaalvoorwaarden</Label>
              <div className="mt-2">
                <PaymentTermsForm />
              </div>
            </div>

            <div>
              <Label>Standaard uitsluitingen</Label>
              <div className="mt-2">
                <WorkAgreementExclusionsForm />
              </div>
            </div>
            <GeneralTerms name="terms_and_conditions" />
            <Button type="submit" className="w-full">
              Instellingen opslaan
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

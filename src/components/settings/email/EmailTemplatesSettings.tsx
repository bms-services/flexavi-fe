import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Mail, PenLine } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useGetMailTemplates, useUpdateMailTemplates } from "@/zustand/hooks/useSetting";
import { MailReq, MailType, MailTypeMap } from "@/zustand/types/mailT";
import { ParamGlobal } from "@/zustand/types/apiT";

const defaultType: MailType = "agreement";
const defaultMailTemplate: MailReq = {
  subject: "",
  content: "",
  type: defaultType,
};

export const EmailTemplatesSettings = () => {
  const { t } = useTranslation();
  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    type: defaultType,
  });

  const getMailTemplateZ = useGetMailTemplates(params);
  const updateMailTemplateZ = useUpdateMailTemplates();
  const methods = useForm<MailReq>({ defaultValues: defaultMailTemplate });

  // sync tab type to form
  useEffect(() => {
    if (params.type) {
      methods.setValue("type", params.type as MailType);

      const current = getMailTemplateZ.data?.result.data.find(
        template => template.type === (params.type as MailType)
      );

      if (current) {
        methods.setValue("subject", current.subject);
        methods.setValue("content", current.content);
      }
    }
  }, [params.type, getMailTemplateZ.data, methods]);

  const handleTabChange = (value: string) => {
    setParams(prev => ({ ...prev, type: value as MailType }));
  };

  const onSubmit = async (data: MailReq) => {
    try {
      const formData = new FormData();

      formData.append("_method", "patch");
      formData.append("type", data.type);
      formData.append("subject", data.subject);
      formData.append("content", data.content);

      await updateMailTemplateZ.mutateAsync(formData);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Email templates</CardTitle>
                <CardDescription>
                  Beheer standaard emails voor verschillende situaties
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs
              defaultValue={defaultType}
              value={params.type}
              onValueChange={handleTabChange}
              className="space-y-4"
            >
              <TabsList>
                {Object.entries(MailTypeMap).map(([key, label]) => (
                  <TabsTrigger key={key} value={key}>
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.keys(MailTypeMap).map((key) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <PenLine className="h-4 w-4" />
                      <h3 className="font-medium">{MailTypeMap[key as MailType]} verzenden</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`${key}-subject`}>Onderwerp</Label>
                      <Input id={`${key}-subject`} {...methods.register("subject")} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`${key}-template`}>Email tekst</Label>
                      <Textarea
                        id={`${key}-template`}
                        className="min-h-[200px]"
                        {...methods.register("content")}
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>Beschikbare variabelen:</p>
                      <ul className="list-disc list-inside">
                        <li>[Naam] - Naam van de klant</li>
                        <li>[Bedrijfsnaam] - Naam van je bedrijf</li>
                        <li>[Referentie] - Referentienummer</li>
                        <li>[Datum] - Huidige datum</li>
                      </ul>
                    </div>

                    <div className="flex justify-end items-center">
                      <Button type="submit" disabled={updateMailTemplateZ.isPending}>
                        {updateMailTemplateZ.isPending ? t("common.loading") : "Opslaan"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};
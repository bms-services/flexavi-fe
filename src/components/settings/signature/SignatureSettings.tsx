import { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Upload, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Signature from "@/components/customer/Signature";

import { SignatureReq } from "@/zustand/types/signatureT";
import { useGetMySignature, useUpdateMySignature } from "@/zustand/hooks/useSetting";
import { ParamGlobal } from "@/zustand/types/apiT";

const defaultValues: SignatureReq = {
  mail_signature: "",
  attachments: null,
  blob: "",
};

const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const SignatureSettings = () => {
  const methods = useForm<SignatureReq>({ defaultValues });
  const { watch, setValue, handleSubmit, control, register } = methods;

  const [params] = useState<ParamGlobal>({ page: 1, per_page: 10, search: "" });
  const getMySignatureZ = useGetMySignature(params);
  const updateSignatureTemplateZ = useUpdateMySignature();

  const attachments = watch("attachments");
  const blob = watch("blob");
  const mailSignatureHTML = watch("mail_signature");

  useEffect(() => {
    const fetched = getMySignatureZ.data?.result?.data[0];
    if (fetched) {
      if (fetched.url) {
        setValue("attachments", fetched.url);
      }
      if (fetched.mail_signature) {
        setValue("mail_signature", fetched.mail_signature);
      }
    }
  }, [getMySignatureZ.data, setValue]);

  const onSubmit = async (data: SignatureReq) => {
    const formData = new FormData();
    formData.append("_method", "patch");
    formData.append("mail_signature", data.mail_signature || "");

    if (data.blob && typeof data.blob === "string") {
      const file = base64ToFile(data.blob, "signature.png");
      formData.append("attachments", file);
    }
    await updateSignatureTemplateZ.mutateAsync(formData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Upload Signature */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Document Handtekening</CardTitle>
                <CardDescription>
                  Upload je handtekening voor gebruik op offertes, facturen en werkovereenkomsten
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Controller
                name="blob"
                control={control}
                render={({ field }) => (
                  <Signature onSignatureChange={field.onChange} />
                )}
              />
              <div className="flex items-center gap-2">
                {attachments && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Huidige handtekening:</p>
                    <img
                      src={attachments instanceof File ? URL.createObjectURL(attachments) : attachments}
                      alt="Huidige handtekening"
                      className="border rounded-md p-2 max-w-[200px]"
                    />
                  </div>
                )}
                {blob && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">New handtekening:</p>
                    <img
                      src={blob}
                      alt="Handtekening voorbeeld"
                      className="border rounded-md p-2 max-w-[200px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Signature */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>E-mail Handtekening</CardTitle>
                <CardDescription>
                  Professionele e-mail handtekening met bedrijfslogo
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Preview */}
              <div className="border rounded-lg p-4 bg-white">
                <div dangerouslySetInnerHTML={{ __html: mailSignatureHTML || "" }} />
              </div>

              {/* Editable Textarea */}
              <div className="space-y-2">
                <label htmlFor="mail_signature" className="text-sm font-medium">
                  HTML e-mail handtekening
                </label>
                <Textarea
                  id="mail_signature"
                  {...register("mail_signature")}
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>

              {/* Variable Info */}
              <div className="text-sm text-muted-foreground">
                <p>Beschikbare variabelen:</p>
                <ul className="list-disc list-inside">
                  <li>[Naam] - Je volledige naam</li>
                  <li>[Functie] - Je functietitel</li>
                  <li>[Bedrijfsnaam] - Naam van je bedrijf</li>
                  <li>[Telefoonnummer] - Je telefoonnummer</li>
                  <li>[E-mailadres] - Je e-mailadres</li>
                  <li>[Website] - Je website URL</li>
                </ul>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <Button type="submit" disabled={updateSignatureTemplateZ.isPending}>
                  {updateSignatureTemplateZ.isPending ? "Bezig met opslaan..." : "Handtekening opslaan"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};
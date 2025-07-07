import { useState, useEffect } from "react";
import { useForm, FormProvider, Control, FieldValues, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { File } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropZoneAlpha } from "@/components/ui/drop-zone-alpha/DropZoneAlpha";

import { useCreateMyAttachments, useDeleteMyAttachment, useGetMyAttachments } from "@/zustand/hooks/useSetting";
import { AttachmentReq, AttachmentType, AttachmentTypesMap } from "@/zustand/types/attachmentT";
import { ParamGlobal } from "@/zustand/types/apiT";

interface ExtendParams extends ParamGlobal {
  type: AttachmentType;
}

const defaultType: AttachmentType = "agreement";

const defaultAttachment: AttachmentReq = {
  attachments: [],
  type: defaultType,
};

export const DefaultAttachmentsSettings = () => {
  const { t } = useTranslation();
  const [params, setParams] = useState<ExtendParams>({
    page: 1,
    per_page: 10,
    search: "",
    type: defaultType,
  });

  const getMyAttachmentsZ = useGetMyAttachments(params);
  const createMyAttachmentsZ = useCreateMyAttachments();
  const deleteMyAttachmentsZ = useDeleteMyAttachment();

  const methods = useForm<AttachmentReq>({ defaultValues: defaultAttachment });

  // sync active type from tab to form
  useEffect(() => {
    methods.setValue("type", params.type);
  }, [params.type, methods]);

  const handleTabChange = (value: string) => {
    setParams(prev => ({ ...prev, type: value as AttachmentType }));
  };

  const handleRemoveAttachment = async (id: string) => {
    await deleteMyAttachmentsZ.mutateAsync({ ids: [id], force: false });
  };

  const onSubmit = async (data: AttachmentReq) => {
    const formData = new FormData();
    data.attachments.forEach(file => {
      formData.append("attachments[]", file);
    });
    formData.append("type", params.type);

    try {
      await createMyAttachmentsZ.mutateAsync(formData);
      methods.reset({ ...defaultAttachment, type: params.type });
    } catch (err) {
      console.error("Error uploading attachments:", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <File className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Standaard bijlages</CardTitle>
                <CardDescription>
                  Beheer de standaard bijlages die automatisch worden toegevoegd
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
                {Object.entries(AttachmentTypesMap).map(([key, label]) => (
                  <TabsTrigger key={key} value={key as AttachmentType}>
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.keys(AttachmentTypesMap).map((key) => (
                <AttachmentTabPanel
                  key={key}
                  type={key as AttachmentType}
                  isActive={params.type === key}
                  formMethods={methods}
                  uploadedData={params.type === key ? getMyAttachmentsZ : undefined}
                  onRemoveUploaded={params.type === key ? handleRemoveAttachment : undefined}
                  isSubmitting={createMyAttachmentsZ.isPending || methods.formState.isSubmitting}
                  t={t}
                />
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};


interface AttachmentTabPanelProps {
  type: AttachmentType;
  isActive: boolean;
  formMethods: ReturnType<typeof useForm<AttachmentReq>>;
  uploadedData?: ReturnType<typeof useGetMyAttachments>;
  onRemoveUploaded?: (id: string) => void;
  isSubmitting: boolean;
  t: ReturnType<typeof useTranslation>["t"];
}

const AttachmentTabPanel: React.FC<AttachmentTabPanelProps> = ({
  type,
  isActive,
  formMethods,
  uploadedData,
  onRemoveUploaded,
  isSubmitting,
  t,
}) => {
  if (!isActive) return null;

  return (
    <TabsContent value={type} className="space-y-4">
      <DropZoneAlpha
        label={t("settings.attachment.label.upload")}
        multiple={true}
        accept={{
          "image/*": [".jpg", ".jpeg", ".png", ".webp"],
          "application/pdf": [".pdf"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
          "application/vnd.ms-excel": [".xls", ".xlsx"],
          "text/plain": [".txt"],
        }}
        maxFiles={5}
        maxSize={2 * 1024 * 1024}
        rules={{
          name: "attachments",
          control: formMethods.control as unknown as Control<FieldValues>,
          options: {
            required: t("settings.attachment.error.required.files"),
            validate: {
              maxFiles: (value) => {
                const files = value as File[];
                return files.length <= 5 || t("settings.attachment.error.maxFiles.files");
              },
            },
          },
          errors: formMethods.formState.errors as FieldErrors<FieldValues>,
        }}
        listUploaded={uploadedData}
        onRemoveUploaded={onRemoveUploaded}
      />

      <div className="flex justify-end items-center">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("common.loading") : t("settings.attachment.button.save")}
        </Button>
      </div>
    </TabsContent>
  );
};
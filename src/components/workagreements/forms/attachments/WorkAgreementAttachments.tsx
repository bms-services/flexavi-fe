import { Control, FieldValues, useFormContext } from "react-hook-form";
import {
  WorkAgreementReq,
} from "@/zustand/types/workAgreementT";
import { DropZoneAlpha } from "@/components/ui/drop-zone-alpha/DropZoneAlpha";
import { useGetMyAttachments } from "@/zustand/hooks/useSetting";
import { useTranslation } from "react-i18next";

interface WorkAgreementAttachmentsProps {
  defaultAttachments?: ReturnType<typeof useGetMyAttachments>;
  disabled?: boolean;
}

// const getFileType = (url: string): string => {
//   const extension = url.split(".").pop()?.toLowerCase();
//   switch (extension) {
//     case "pdf":
//       return "application/pdf";
//     case "jpg":
//     case "jpeg":
//       return "image/jpeg";
//     case "png":
//       return "image/png";
//     case "doc":
//     case "docx":
//       return "application/msword";
//     case "xls":
//     case "xlsx":
//       return "application/vnd.ms-excel";
//     case "csv":
//       return "text/csv";
//     case "txt":
//       return "text/plain";
//     default:
//       return "";
//   }
// };


export const WorkAgreementAttachments: React.FC<WorkAgreementAttachmentsProps> = ({
  defaultAttachments,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext<WorkAgreementReq>();

  return (
    <div className="space-y-4">
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
          control: control as unknown as Control<FieldValues>,
          options: {
            // required: t("settings.attachment.error.required.files"),
            // validate: {
            //   maxFiles: (value) => {
            //     const files = value as File[];
            //     return files.length <= 5 || t("settings.attachment.error.maxFiles.files");
            //   },
            // },
          },
          errors: errors as FieldValues,
        }}
        listUploaded={defaultAttachments}
        deleteUploaded={undefined}
        type={"agreement"}
      />
    </div>
  );
};
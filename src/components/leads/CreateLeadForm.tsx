import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneNumber from "@/components/ui/phone-number";
import PostalCode from "@/components/ui/postal-code";
import { useTranslation } from "react-i18next";
import { Mail, UserIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useCreateLead, useUpdateLead } from "@/zustand/hooks/useLead";
import { LeadReq } from "@/zustand/types/leadT";

interface CreateLeadFormProps {
  onCancel: () => void;
  leadId: string;
  onSubmit: (data: LeadReq) => Promise<void>;
}

export const CreateLeadForm: React.FC<CreateLeadFormProps> = ({
  onCancel,
  leadId,
  onSubmit,
}) => {
  const { t } = useTranslation("dashboard");
  const createLeadZ = useCreateLead();
  const updateLeadZ = useUpdateLead();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LeadReq>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input
        label={t('register.label.name')}
        placeholder={t('register.placeholder.name')}
        id="name"
        type="text"
        icon={<UserIcon className="h-5 w-5 " />}
        rules={{
          register,
          name: "name",
          options: {
            required: t('register.error.required.name')
          },
          errors,
        }}
      />

      <Input
        label={t('login.label.email')}
        placeholder={t('login.placeholder.email')}
        id={'email'}
        type="email"
        icon={<Mail className="h-5 w-5 " />}
        rules={{
          register,
          name: "email",
          options: {
            required: t('login.error.required.email'),
          },
          errors,
        }}
      />

      <PhoneNumber
        label={t('companyCreate.label.phone')}
        rules={{
          control,
          name: "phone",
          options: {
            required: t('companyCreate.error.required.phone')
          },
          errors,
        }}
      />

      <PostalCode
        register={register}
        fieldPrefix="address"
        errors={errors}
        control={control}
        watch={watch}
        setValue={setValue}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Annuleren
        </Button>
        <Button type="submit"
          loading={leadId ? updateLeadZ.isPending : createLeadZ.isPending}
        >
          {leadId ? "Lead Bijwerken" : "Lead Toevoegen"}
        </Button>
      </div>
    </form>
  );
};


import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneNumber from "@/components/ui/phone-number";
import PostalCode from "@/components/ui/postal-code";
import { useTranslation } from "react-i18next";
import { Mail, UserIcon } from "lucide-react";
import { Lead } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useFormContext } from "react-hook-form";

interface CreateLeadFormProps {
  onCancel: () => void;
  leadId?: string;
  onSubmit: (data: Lead) => Promise<void>;
}

export const CreateLeadForm: React.FC<CreateLeadFormProps> = ({
  onCancel,
  leadId,
  onSubmit,
}) => {
  const { t } = useTranslation("dashboard");

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // const { loading: loadingLeadsStore, response: responseLeadStore } = useSelector((state: RootState) => state.lead.store);
  // const resultLeadStore = responseLeadStore.result as Lead;

  // const { loading: loadingLeadShow, response: responseLeadShow } = useSelector((state: RootState) => state.lead.show);
  // const resultLeadShow = responseLeadShow.result as Lead;

  // const { loading: loadingLeadUpdate, response: responseLeadUpdate } = useSelector((state: RootState) => state.lead.update);
  // const resultLeadUpdate = responseLeadUpdate.result as Lead;

  const leadUpdateRedux = useSelector((state: RootState) => state.lead.update);
  const leadShowRedux = useSelector((state: RootState) => state.lead.show);
  const leadStoreRedux = useSelector((state: RootState) => state.lead.store);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input
        label={t('auth:register.label.name')}
        placeholder={t('auth:register.placeholder.name')}
        id="name"
        type="text"
        icon={<UserIcon className="h-5 w-5 " />}
        rules={{
          register,
          name: "name",
          options: {
            required: t('auth:register.error.required.name')
          },
          errors,
        }}
      />

      <Input
        label={t('auth:login.label.email')}
        placeholder={t('auth:login.placeholder.email')}
        id={'email'}
        type="email"
        icon={<Mail className="h-5 w-5 " />}
        rules={{
          register,
          name: "email",
          options: {
            required: t('auth:login.error.required.email'),
          },
          errors,
        }}
      />

      <PhoneNumber
        label={t('dashboard:company_create.label.phone')}
        rules={{
          control,
          name: "phone",
          options: {
            required: t('dashboard:company_create.error.required.phone')
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
          loading={leadStoreRedux.loading || leadShowRedux.loading || leadUpdateRedux.loading}>
          {leadId ? "Lead Bijwerken" : "Lead Toevoegen"}
        </Button>
      </div>
    </form>
  );
};


import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLeadSchema, type CreateLeadFormData } from "@/utils/validations";
import { getLeadDetail } from "@/data/mockData";
import PhoneNumber from "@/components/ui/phone-number";
import PostalCode from "@/components/ui/postal-code";
import { useTranslation } from "react-i18next";
import { Mail, UserIcon } from "lucide-react";
import { Lead } from "@/types";
import { useAppDispatch } from "@/hooks/use-redux";
import { storeLead, updateLead } from "@/actions/leadAction";
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
  const dispatch = useAppDispatch();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   control,
  //   watch,
  //   setValue,
  // } = useForm<Lead>({
  //   // resolver: zodResolver(createLeadSchema),
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     phone: "",
  //     postal_code: "",
  //     house_number: "",
  //     house_number_addition: "",
  //     street: "",
  //     city: "",
  //     province: "",
  //   },
  // });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  

  const { loading:loadingLeadsStore, response:reponseLeadStore } = useSelector((state: RootState) => state.lead.store);
  const resultLeadStore = reponseLeadStore.result as Lead;
  
  const { loading:loadingLeadShow, response:responseLeadShow} = useSelector((state: RootState) => state.lead.show);
  const resultLeadShow = responseLeadShow.result as Lead;
  
  const { loading:loadingLeadUpdate, response:responseLeadUpdate} = useSelector((state: RootState) => state.lead.update);
  const resultLeadUpdate = responseLeadUpdate.result as Lead;

  // If leadId is provided, populate the form with lead data
  // useEffect(() => {
  //   if (leadId) {
  //     const leadData = getLeadDetail(leadId);
  //     if (leadData) {
  //       // Extract postcode and huisnummer from address (simplified implementation)
  //       const addressParts = leadData.address.split(' ');
  //       const postcode = addressParts.slice(0, 2).join(' ');
  //       const huisnummer = addressParts[2] || '';

  //       reset({
  //         name: leadData.name,
  //         email: leadData.email,
  //         phone: leadData.phone,
  //         postcode: postcode,
  //         huisnummer: huisnummer,
  //       });
  //     }
  //   }
  // }, [leadId, form]);




  // const onSubmit = async (data: Lead) => {
  //   if (leadId) {
  //     await dispatch(updateLead(data));
  //   } else {
  //     await dispatch(storeLead(data));
  //   }
  // };

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
            loading={loadingLeadsStore || loadingLeadShow || loadingLeadUpdate}>
            {leadId ? "Lead Bijwerken" : "Lead Toevoegen"}
            </Button>
        </div>
      </form>
  );
};

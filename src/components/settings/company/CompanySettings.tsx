import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Building2, Mail, Phone, MapPin, Ban, FileText, Upload, Building2Icon, MailIcon } from "lucide-react";

import PaymentStripe from "@/components/ui/payment-stripe";
import StripeProvider from "@/providers/stripe-provider";
import { useTranslation } from "react-i18next";
import StripeWrapper from "@/components/ui/payment-stripe/wrapper";
import { useAppDispatch } from "@/hooks/use-redux";
import { getProfileCompany, updateProfileCompany } from "@/actions/profileAction";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Company } from "@/types/company";
import { useForm } from "react-hook-form";
import PhoneNumber from "@/components/ui/phone-number";
import PostalCode from "@/components/ui/postal-code";
import { Dropzone } from "@/components/ui/drop-zone/Dropzone";

export const CompanySettings: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm<Company>({
    defaultValues: {
      name: '',
      description: '',
      vat_number: '',
      kvk_number: '',
      website: '',
      email: '',
      phone: '',
      logo_url: '',
      logo_public_id: '',
      address: {
        street: '',
        postal_code: { label: '', value: '' },
        house_number: '',
        house_number_addition: '',
        city: '',
        province: '',
      },

    },
  })

  const { loading: loadingProfileShowCompany, response: responseProfileShowCompany } = useSelector((state: RootState) => state.profile.showCompany);
  const resultProfileShowCompany = responseProfileShowCompany.result as Company;

  const { loading: loadingProfileUpdateCompany, response: responseProfileUpdateCompany } = useSelector((state: RootState) => state.profile.updateCompany);
  const resultProfileUpdateCompany = responseProfileUpdateCompany.result as Company;

  useEffect(() => {
    dispatch(getProfileCompany())
  }, [dispatch]);


  useEffect(() => {
    if (responseProfileShowCompany.success) {
      reset({
        ...resultProfileShowCompany,
        address: {
          ...resultProfileShowCompany.address,
          postal_code:
            typeof resultProfileShowCompany.address.postal_code === "string"
              ? { label: resultProfileShowCompany.address.postal_code, value: resultProfileShowCompany.address.postal_code }
              : resultProfileShowCompany.address.postal_code,

        },
      });
    }
  }, [responseProfileShowCompany, reset, resultProfileShowCompany]);

  const handleUpdate = async (data: Company) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("vat_number", data.vat_number || "");
    formData.append("kvk_number", data.kvk_number || "");
    formData.append("website", data.website || "");
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");

    if (data.address) {
      formData.append("address[street]", data.address.street || "");
      formData.append("address[postal_code]", typeof data.address.postal_code === "object"
        ? data.address.postal_code.value
        : data.address.postal_code || "");
      formData.append("address[house_number]", data.address.house_number || "");
      formData.append("address[house_number_addition]", data.address.house_number_addition || "");
      formData.append("address[city]", data.address.city || "");
      formData.append("address[province]", data.address.province || "");
    }

    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }

    dispatch(updateProfileCompany(formData));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Bedrijfsgegevens</CardTitle>
                <CardDescription>
                  Beheer je bedrijfsinformatie die wordt weergegeven op offertes en facturen
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Dropzone
                previewUrl={watch('logo_url')}
                rules={{
                  name: "image",
                  control,
                  errors,
                }}
                label="Upload profielfoto"
                multiple={false}
                text="Upload een afbeelding"
                dropText="Sleep hierheen of klik om te uploaden."
                isCircle
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={t('dashboard:company_create.label.name')}
                placeholder={t('dashboard:company_create.placeholder.name')}
                id="companyName"
                type="text"
                icon={<Building2Icon className="h-5 w-5 text-gray-400" />}
                rules={{
                  register,
                  name: "name",
                  options: {
                    required: t('dashboard:company_create.error.required.name'),
                  },
                  errors,
                }}
              />
              <Input
                label={t('dashboard:company_create.label.tax')}
                id="tax"
                placeholder={t('dashboard:company_create.placeholder.tax')}
                type="text"
                rules={{
                  register,
                  name: "vat_number",
                  options: {
                    required: t('dashboard:company_create.error.required.tax'),
                  },
                  errors,
                }}
              />
              <Input
                label={t('dashboard:company_create.label.kvk')}
                id="kvk"
                type="text"
                placeholder={t('dashboard:company_create.placeholder.kvk')}
                rules={{
                  register,
                  name: "kvk_number",
                  options: {
                    required: t('dashboard:company_create.error.required.kvk'),
                  },
                  errors,
                }}
              />
              <Input
                label={t('dashboard:company_create.label.website')}
                id="website"
                type="text"
                placeholder={t('dashboard:company_create.placeholder.website')}
                rules={{
                  register,
                  name: "website",
                  options: {
                    required: t('dashboard:company_create.error.required.website'),
                  },
                  errors,
                }}
              />
            </div>
            <Textarea
              label={t('dashboard:company_create.label.description')}
              id="description"
              placeholder={t('dashboard:company_create.placeholder.description')}
              rules={{
                register,
                name: "description",
                options: {
                  maxLength: 250,
                },
                errors,
              }}
            />
          </CardContent>

          <CardContent className="py-0">
            <Separator />
          </CardContent>

          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Contact & Locatie</CardTitle>
                <CardDescription>
                  Contact- en adresgegevens van je bedrijf
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={t('dashboard:company_create.label.email')}
                placeholder={t('dashboard:company_create.placeholder.email')}
                id={'companyEmail'}
                type="text"
                icon={<MailIcon className="h-5 w-5 " />}
                rules={{
                  register,
                  name: "email",
                  options: {
                    required: t('dashboard:company_create.error.required.name'),
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
            </div>

            <PostalCode
              register={register}
              fieldPrefix="address"
              errors={errors}
              control={control}
              watch={watch}
              setValue={setValue}
            />

            <Button type="submit"
              loading={loadingProfileUpdateCompany}
            >
              {t("dashboard:company_create.button.save")}
            </Button>
          </CardContent>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Ban className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>{t("dashboard:settings.payment.title")}</CardTitle>
              <CardDescription>
                {t("dashboard:settings.payment.description")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank</Label>
              <Input id="bank-name" defaultValue="ING Bank" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input id="iban" defaultValue="NL00 INGB 0000 0000 00" />
            </div>
          </div> */}

          {/* <StripeProvider>
            <PaymentStripe />
          </StripeProvider> */}

          <StripeWrapper />
        </CardContent>
      </Card>
    </div>
  );
};

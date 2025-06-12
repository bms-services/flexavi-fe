import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, Ban, Building2Icon, MailIcon } from "lucide-react";

import { useTranslation } from "react-i18next";
import StripeWrapper from "@/components/ui/payment-stripe/wrapper";
import { Company } from "@/types/company";
import { useForm } from "react-hook-form";
import PhoneNumber from "@/components/ui/phone-number";
import PostalCode from "@/components/ui/postal-code";
import { Dropzone } from "@/components/ui/drop-zone/Dropzone";
import { useShowMyCompany, useUpdateMyCompany } from "@/zustand/hooks/useSetting";

export const CompanySettings: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const showMyCompanyZ = useShowMyCompany();
  const updateMyCompanyZ = useUpdateMyCompany();

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors }
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

  // Fetch company data on component mount
  useEffect(() => {
    showMyCompanyZ.mutateAsync().then((data) => {
      const { result } = data;

      let address = result.address;
      if (Array.isArray(address)) {
        address = address[0] || {};
      }

      if (typeof address === "object" && address !== null) {
        reset({
          ...result,
          address: {
            ...address,
            postal_code:
              typeof address.postal_code === "string"
                ? { label: address.postal_code, value: address.postal_code }
                : address.postal_code,
          },
        });
      }

    });
  }, []);


  const handleUpdate = async (data: Company) => {
    const formData = new FormData();

    formData.append("_method", "PUT");
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
    updateMyCompanyZ.mutateAsync(formData)
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
                label="Upload bedrijfslogo"
                multiple={false}
                text="Upload een afbeelding"
                dropText="Sleep hierheen of klik om te uploaden."
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
              loading={updateMyCompanyZ.isPending}
            >
              {t("dashboard:settings.company.button.submit")}
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
          <StripeWrapper />
        </CardContent>
      </Card>
    </div>
  );
};

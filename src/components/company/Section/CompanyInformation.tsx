import { fullpageApi } from "@fullpage/react-fullpage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Building2Icon, MailIcon, MapPin } from "lucide-react";
import { Control, FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Company } from "@/types/company";
import { TFunction } from "i18next";
import logo from "@/assets/images/logo/logo-full.png"
import { Separator } from "@radix-ui/react-select";
import PhoneNumber from "@/components/ui/phone-number";
import PostalCode from "@/components/ui/postal-code";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/drop-zone/Dropzone";
import { FormEventHandler } from "react";
export default function CompanyInformation({
    register,
    state,
    fullpageApi,
    control,
    errors,
    onSubmit,
    watch,
    setValue,
    t,
}: {
    state?: unknown;
    fullpageApi?: fullpageApi;
    register: UseFormRegister<Company>;
    control: Control<Company, FieldValues>;
    watch: UseFormWatch<Company>;
    errors: FieldErrors<Company>;
    setValue: UseFormSetValue<Company>;
    t: TFunction<"dashboard", undefined>,
    onSubmit: FormEventHandler<HTMLFormElement>;
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-3">
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
            //   loading={settingCompanyUpdateRedux.loading}
            >
              {t("dashboard:company_create.button.submit")}
            </Button>
          </CardContent>
        </Card>
      </form>
    );
}

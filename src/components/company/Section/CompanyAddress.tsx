import { fullpageApi } from "@fullpage/react-fullpage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Building2, Building2Icon, MailIcon, Upload } from "lucide-react";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Company } from "@/types/company";
import { TFunction } from "i18next";
import PhoneNumber from "@/components/ui/phone-number";
import PostalCode from "@/components/ui/postal-code";

export default function CompanyAddress({
    state,
    fullpageApi,
    register,
    control,
    watch,
    setValue,
    errors,
    handleSubmit,
    t,
}: {
    state: unknown;
    fullpageApi: fullpageApi;
    register: UseFormRegister<Company>;
    control: Control<Company>;
    watch: UseFormWatch<Company>
    setValue: UseFormSetValue<Company>;
    errors: FieldErrors<Company>;
    handleSubmit: UseFormHandleSubmit<Company>;
    t: TFunction<"dashboard", undefined>
}) {
    return (
        <section className="min-h-screen w-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl">
                <Card className="shadow-md border border-gray-200 overflow-hidden">
                    <CardContent className="bg-white p-8 space-y-10">
                        <header className="mb-6">
                            <CardTitle className="text-3xl font-semibold text-gray-900">{t('dashboard:company_create.text.titleAddress')}</CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                                {t('dashboard:company_create.text.descriptionAddress')}
                            </CardDescription>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input
                                label={t('dashboard:company_create.label.email')}
                                placeholder={t('dashboard:company_create.placeholder.email')}
                                id={'companyEmail'}
                                type="text"
                                icon={<MailIcon className="h-5 w-5 text-gray-400" />}
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

                        <div className="mt-12">
                            <header className="mb-6">
                                <CardTitle className="text-3xl font-semibold text-gray-900">{t('dashboard:company_create.text.titleContact')}</CardTitle>
                                <CardDescription className="text-gray-600 mt-1">
                                    {t('dashboard:company_create.text.descriptionContact')}
                                </CardDescription>
                            </header>

                            <PostalCode
                                register={register}
                                errors={errors}
                                control={control}
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>

                        <div className="flex justify-end mt-10">
                            <button
                                type="button"
                                onClick={() => fullpageApi.moveSectionDown()}
                                className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold shadow-md"
                            >
                                {t('dashboard:company_create.button.next')}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

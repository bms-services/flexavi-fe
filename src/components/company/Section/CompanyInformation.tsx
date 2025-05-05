import { fullpageApi } from "@fullpage/react-fullpage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Building2, Building2Icon, Upload } from "lucide-react";
import Dropzone from "@/components/ui/drop-zone";
import DropZone from "@/components/ui/drop-zone";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Company } from "@/types/company";
import { TFunction } from "i18next";

export default function CompanyInformation({
    state,
    fullpageApi,
    register,
    control,
    errors,
    handleSubmit,
    t,
}: {
    state: unknown;
    fullpageApi: fullpageApi;
    register: UseFormRegister<Company>;
    control: Control<Company>;
    errors: FieldErrors<Company>;
    handleSubmit: UseFormHandleSubmit<Company>;
    t: TFunction<"dashboard", undefined>
}) {
    return (
        <div className="section">
                <div className="sm:h-screen w-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
                    <div className="w-full max-w-4xl">
                        <Card className="rounded-2xl shadow-xl overflow-hidden">
                            <CardHeader className="bg-blue-700 text-white px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <Building2 className="h-6 w-6" />
                                    <div>
                                        <CardTitle className="text-xl">{t('dashboard:company_create.text.title')}</CardTitle>
                                        <CardDescription className="text-white/80">
                                            {t('dashboard:company_create.text.description')}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="bg-white p-6 space-y-6">
                            <form onSubmit={handleSubmit((data) => {
                                fullpageApi.moveSectionDown();
                            })}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <DropZone label="Bedrijfslogo" className="" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label={t('dashboard:company_create.label.name')}
                                        placeholder={t('dashboard:company_create.placeholder.name')}
                                        id={'companyName'}
                                        type="text"
                                        icon={<Building2Icon className="h-5 w-5 " />}
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
                                            name: "tax",
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
                                            name: "kvk",
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
                                <div className="grid grid-cols-1 gap-6">
                                    <Textarea
                                        label={t('dashboard:company_create.label.description')}
                                        id="about"
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
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
                                    >
                                        {t('dashboard:company_create.button.next')}
                                    </button>
                                </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
        </div>
    );
}

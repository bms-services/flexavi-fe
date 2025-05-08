import { fullpageApi } from "@fullpage/react-fullpage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Building2Icon } from "lucide-react";
import DropZone from "@/components/ui/drop-zone";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Company } from "@/types/company";
import { TFunction } from "i18next";
import logo from "@/assets/images/logo/logo-full.png"
export default function CompanyInformation({
    register,
    state,
    fullpageApi,
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
        <div className="grid grid-cols-2 bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="hidden lg:flex flex-col justify-center ps-20">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-[200px] h-auto mb-4"
                />
                <h1 className="text-white text-4xl font-bold">
                    Start your journey with us
                </h1>
                <p className="text-white text-lg mt-2">
                    Provide your company information to get started.
                </p>
            </div>
            <div className="sm:min-h-screen w-full flex items-center justify-center pe-20">
                <div className="w-full max-w-5xl">
                    <Card className="shadow-2xl overflow-hidden border border-white/10">
                        <CardHeader className="bg-primary text-white px-8 py-6">
                            <div className="flex items-center gap-4">
                                <Building2 className="h-7 w-7" />
                                <div>
                                    <CardTitle className="text-2xl font-semibold">
                                        {t('dashboard:company_create.text.title')}
                                    </CardTitle>
                                    <CardDescription className="text-white/80 text-sm mt-1">
                                        {t('dashboard:company_create.text.description')}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="bg-white p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <DropZone label="Bedrijfslogo" />
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
                            {/* 
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                            >
                                {t('dashboard:company_create.button.next')}
                            </Button>
                        </div> */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Building2Icon, MailIcon, MapPin } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import PhoneNumber from "@/components/ui/phone-number";
import PostalCode from "@/components/ui/postal-code";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/drop-zone/Dropzone";
import { CompanyReq } from '@/zustand/types/companyT';
import { useCreateMyCompany } from '@/zustand/hooks/useSetting';
import { useLogout } from '@/zustand/hooks/useAuth';
import { mapApiErrorsToForm } from '@/utils/mapApiErrorsToForm';

export default function CompanyCreateFullPage() {
    const createMyCompanyZ = useCreateMyCompany();
    const logoutZ = useLogout();
    const { t } = useTranslation('dashboard');
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        register,
        watch,
        setValue,
        setError,
        formState: { errors }
    } = useForm<CompanyReq>({
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

    /**
     * Function to handle form submission
     * 
     * @param data 
     * @returns {Promise<void>}
     */
    const onSubmit = async (data: CompanyReq): Promise<void> => {
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

        createMyCompanyZ.mutate(formData, {
            onSuccess: () => {
                navigate("/");
            },
            onError: (error) => {
                if (error?.errors) {
                    console.log("Error creating company:", error.errors);

                    mapApiErrorsToForm(error?.errors, setError);
                }
            }
        });
    };

    /**
     * Function to handle user logout
     * 
     * This function triggers the logout mutation and redirects the user to the login page.
     */
    const handleLogout = () => {
        logoutZ.mutate();
    }

    return (
        <div className='bg-primary'>
            <div className="w-full max-w-3xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label={t('companyCreate.label.name')}
                                    placeholder={t('companyCreate.placeholder.name')}
                                    id="companyName"
                                    type="text"
                                    icon={<Building2Icon className="h-5 w-5 text-gray-400" />}
                                    rules={{
                                        register,
                                        name: "name",
                                        options: {
                                            required: t('companyCreate.error.required.name'),
                                        },
                                        errors,
                                    }}
                                />
                                <Input
                                    label={t('companyCreate.label.tax')}
                                    id="tax"
                                    placeholder={t('companyCreate.placeholder.tax')}
                                    type="text"
                                    rules={{
                                        register,
                                        name: "vat_number",
                                        options: {
                                            required: t('companyCreate.error.required.tax'),
                                        },
                                        errors,
                                    }}
                                />
                                <Input
                                    label={t('companyCreate.label.kvk')}
                                    id="kvk"
                                    type="text"
                                    placeholder={t('companyCreate.placeholder.kvk')}
                                    rules={{
                                        register,
                                        name: "kvk_number",
                                        options: {
                                            required: t('companyCreate.error.required.kvk'),
                                        },
                                        errors,
                                    }}
                                />
                                <Input
                                    label={t('companyCreate.label.website')}
                                    id="website"
                                    type="text"
                                    placeholder={t('companyCreate.placeholder.website')}
                                    rules={{
                                        register,
                                        name: "website",
                                        options: {
                                            required: t('companyCreate.error.required.website'),
                                        },
                                        errors,
                                    }}
                                />
                            </div>
                            <Textarea
                                label={t('companyCreate.label.description')}
                                id="description"
                                placeholder={t('companyCreate.placeholder.description')}
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
                                    label={t('companyCreate.label.email')}
                                    placeholder={t('companyCreate.placeholder.email')}
                                    id={'companyEmail'}
                                    type="text"
                                    icon={<MailIcon className="h-5 w-5 " />}
                                    rules={{
                                        register,
                                        name: "email",
                                        options: {
                                            required: t('companyCreate.error.required.name'),
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: t('companyCreate.error.invalid.email')
                                            }
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
                            </div>

                            <PostalCode
                                register={register}
                                fieldPrefix="address"
                                errors={errors}
                                control={control}
                                watch={watch}
                                setValue={setValue}
                            />

                            <div className="flex justify-between items-center">
                                <Button type="button" variant='destructive' onClick={handleLogout}>
                                    {t("companyCreate.button.logout")}
                                </Button>

                                <Button type="submit"
                                    loading={createMyCompanyZ.isPending}
                                >
                                    {t("companyCreate.button.submit")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    )
}

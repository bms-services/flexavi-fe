import { fullpageApi } from "@fullpage/react-fullpage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Building2Icon, MailIcon, MapPin } from "lucide-react";
import { Control, FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Company } from "@/types/company";
import { TFunction } from "i18next";
import { Separator } from "@radix-ui/react-select";
import PhoneNumber from "@/components/ui/phone-number";
import PostalCode from "@/components/ui/postal-code";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/drop-zone/Dropzone";
import { FormEventHandler } from "react";

/**
 * CompanyInformation
 * Company setup form, used in fullpage company creation.
 * All labels and placeholders are in English for consistency.
 */
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
    isSubmitting
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
    isSubmitting?: boolean;
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-3" autoComplete="off">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <CardTitle>Company Information</CardTitle>
                            <CardDescription>
                                Enter your company details.
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
                            label="Upload your company logo"
                            multiple={false}
                            text="Click or drag to upload"
                            dropText="Drag here or click to upload."
                            isCircle
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Company Name"
                            placeholder="Your company name"
                            id="companyName"
                            type="text"
                            icon={<Building2Icon className="h-5 w-5 text-gray-400" />}
                            rules={{
                                register,
                                name: "name",
                                options: { required: "Company name is required" },
                                errors,
                            }}
                        />
                        <Input
                            label="VAT Number"
                            id="tax"
                            placeholder="VAT number"
                            type="text"
                            rules={{
                                register,
                                name: "vat_number",
                                options: { required: "VAT number is required" },
                                errors,
                            }}
                        />
                        <Input
                            label="Chamber of Commerce (KVK)"
                            id="kvk"
                            type="text"
                            placeholder="KVK number"
                            rules={{
                                register,
                                name: "kvk_number",
                                options: { required: "KVK number is required" },
                                errors,
                            }}
                        />
                        <Input
                            label="Website"
                            id="website"
                            type="text"
                            placeholder="company.com"
                            rules={{
                                register,
                                name: "website",
                                options: { required: "Website is required" },
                                errors,
                            }}
                        />
                    </div>
                    <Textarea
                        label="Description"
                        id="description"
                        placeholder="Describe your company (max 250 chars)"
                        rules={{
                            register,
                            name: "description",
                            options: { maxLength: 250 },
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
                            <CardTitle>Contact & Location</CardTitle>
                            <CardDescription>
                                Add your company's contact and address information.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Company Email"
                            placeholder="email@company.com"
                            id={'companyEmail'}
                            type="text"
                            icon={<MailIcon className="h-5 w-5 " />}
                            rules={{
                                register,
                                name: "email",
                                options: { required: "Email is required" },
                                errors,
                            }}
                        />
                        <PhoneNumber
                            label="Phone"
                            rules={{
                                control,
                                name: "phone",
                                options: { required: "Phone is required" },
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

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save company"}
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
}
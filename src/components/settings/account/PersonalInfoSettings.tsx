
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ProfileReq } from "@/zustand/types/profileT";
import { useTranslation } from "react-i18next";
import { UserIcon, Mail } from "lucide-react";
import PhoneNumber from "@/components/ui/phone-number";
import { useShowMyProfile, useUpdateMyProfile } from "@/zustand/hooks/useProfile";

export const PersonalInfoSettings: React.FC = () => {
  const { t } = useTranslation();
  const showMyProfileZ = useShowMyProfile();
  const updateMyProfileZ = useUpdateMyProfile();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileReq>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (showMyProfileZ.isSuccess) {
      setValue("name", showMyProfileZ.data.result.name);
      setValue("email", showMyProfileZ.data.result.email);
      setValue("phone", showMyProfileZ.data.result.phone);
    }
  }, [showMyProfileZ.isSuccess, showMyProfileZ.data, setValue]);

  const onSubmit = async (data: ProfileReq): Promise<void> => {
    try {
      await updateMyProfileZ.mutateAsync(data);
    } catch (error) {
      throw new Error("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Persoonlijke Informatie</CardTitle>
          <CardDescription>
            Werk je accountgegevens bij.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t('register.label.name')}
              placeholder={t('register.placeholder.name')}
              id="name"
              type="text"
              icon={<UserIcon className="h-5 w-5 " />}
              rules={{
                register,
                name: "name",
                options: {
                  required: t('register.error.required.name')
                },
                errors,
              }}
            />
            <Input
              label={t('register.label.email')}
              placeholder={t('register.placeholder.email')}
              id={'email'}
              type="email"
              icon={<Mail className="h-5 w-5 " />}
              rules={{
                register,
                name: "email",
                options: {
                  required: t('register.error.required.email')
                },
                errors,
              }}
              disabled
            />
            <PhoneNumber
              label={t('register.label.phone')}
              rules={{
                control,
                name: "phone",
                options: {
                  required: t('register.error.required.phone')
                },
                errors,
              }}
              disabled
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit"
            loading={updateMyProfileZ.isPending}
          >Wijzigingen Opslaan</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

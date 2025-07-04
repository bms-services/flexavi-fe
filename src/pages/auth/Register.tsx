import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LockIcon, Mail, UserIcon, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocalization } from "@/hooks/useLocalization";
import PhoneNumber from "@/components/ui/phone-number";
import { useRegister } from "@/zustand/hooks/useAuth";
import { RegisterReq } from "@/zustand/types/authT";
const Register = () => {
  const { t } = useTranslation();
  const { currentLocal } = useLocalization();

  const methods = useForm<RegisterReq>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const registerZ = useRegister(methods);

  /**
   * Function to handle form submission
   * 
   * @param data - Form data containing user registration information
   * @returns {Promise<void>}
  */
  const onSubmit = async (data: RegisterReq): Promise<void> => {
    const newData = {
      ...data,
      language: currentLocal,
    };

    registerZ.mutateAsync(newData);
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <Input
          label={t('register.label.name')}
          placeholder={t('register.placeholder.name')}
          id="name"
          type="text"
          icon={<UserIcon className="h-5 w-5 " />}
          rules={{
            register: methods.register,
            name: "name",
            options: {
              required: t('register.error.required.name')
            },
            errors: methods.formState.errors,
          }}
        />
        <Input
          label={t('register.label.email')}
          placeholder={t('register.placeholder.email')}
          id={'email'}
          type="email"
          icon={<Mail className="h-5 w-5 " />}
          rules={{
            register: methods.register,
            name: "email",
            options: {
              required: t('register.error.required.email')
            },
            errors: methods.formState.errors,
          }}
        />
        <PhoneNumber
          label={t('register.label.phone')}
          rules={{
            control: methods.control,
            name: "phone",
            options: {
              required: t('register.error.required.phone')
            },
            errors: methods.formState.errors,
          }}
        />
        <Input
          label={t('register.label.password')}
          placeholder={t('register.placeholder.password')}
          id="password"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register: methods.register,
            name: "password",
            options: {
              required: t('register.error.required.password')
            },
            errors: methods.formState.errors,
          }}
        />
        <Input
          label={t('register.label.passwordConfirmation')}
          placeholder={t('register.placeholder.passwordConfirmation')}
          id="password_confirmation"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register: methods.register,
            name: "password_confirmation",
            options: {
              required: t('register.error.required.passwordConfirmation'),
              validate: (value) => {
                if (value !== methods.watch("password")) {
                  return t('register.error.required.passwordConfirmationMismatch')
                }
              },
            },
            errors: methods.formState.errors,
          }}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full"
          loading={registerZ.isPending}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {t('register.button.submit')}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t('register.text.alreadyHaveAccount')}
          <Link
            to="/login"
            className="text-primary hover:text-primary/90 hover:underline"
          >
            {t('register.link.login')}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default Register;

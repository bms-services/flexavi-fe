import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LockIcon, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocalization } from "@/hooks/useLocalization";
import { useRegisterEmployee, useVerifyRegisterEmployee } from "@/zustand/hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { RegisterEmployeeReq } from "@/zustand/types/authT";
import PhoneNumber from "@/components/ui/phone-number";

const RegisterEmployee = () => {
  const { t } = useTranslation();
  const { currentLocal } = useLocalization();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const methods = useForm<RegisterEmployeeReq>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      token,
    },
  });

  const registerEmployeeZ = useRegisterEmployee(methods);
  const verifyRegisterEmployeeZ = useVerifyRegisterEmployee(token, methods);

  /**
   * Function to handle form submission
   * 
   * @param data - Form data containing user registration information
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: RegisterEmployeeReq): Promise<void> => {
    const newData = {
      ...data,
      language: currentLocal,
    };
    await registerEmployeeZ.mutateAsync(newData);
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {verifyRegisterEmployeeZ.isSuccess && (
          <div>
            <p className="text-[14px]">
              Hii <b>{verifyRegisterEmployeeZ.data.result.name}</b>,
              {t('registerEmployee.text.subDescription')}{" "}
              <span className="text-primary font-semibold">
                {verifyRegisterEmployeeZ.data.result.company_name}.
              </span>
            </p>

            <p className="text-[14px]">
              {t('registerEmployee.text.subDescription2')}
            </p>
          </div>
        )}
        <Input
          label={t('registerEmployee.label.name')}
          placeholder={t('registerEmployee.placeholder.name')}
          id="name"
          type="text"
          icon={<LockIcon className="h-5 w-5 " />}
          disabled
          rules={{
            register: methods.register,
            name: "name",
            options: {
              required: t('registerEmployee.error.required.name')
            },
            errors: methods.formState.errors,
          }}
        />
        <Input
          label={t('registerEmployee.label.email')}
          placeholder={t('registerEmployee.placeholder.email')}
          id="email"
          type="email"
          icon={<LockIcon className="h-5 w-5 " />}
          disabled
          rules={{
            register: methods.register,
            name: "email",
            options: {
              required: t('registerEmployee.error.required.email')
            },
            errors: methods.formState.errors,
          }}
        />
        <PhoneNumber
          label={t('registerEmployee.label.phone')}
          disabled
          rules={{
            control: methods.control,
            name: "phone",
            options: {
              required: t('registerEmployee.error.required.phone')
            },
            errors: methods.formState.errors,
          }}
        />

        <Input
          label={t('registerEmployee.label.password')}
          placeholder={t('registerEmployee.placeholder.password')}
          id="password"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register: methods.register,
            name: "password",
            options: {
              required: t('registerEmployee.error.required.password')
            },
            errors: methods.formState.errors,
          }}
        />
        <Input
          label={t('registerEmployee.label.passwordConfirmation')}
          placeholder={t('registerEmployee.placeholder.passwordConfirmation')}
          id="password-confirmation"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register: methods.register,
            name: "password_confirmation",
            options: {
              required: t('registerEmployee.error.required.passwordConfirmation'),
              validate: (value) => {
                if (value !== methods.watch("password")) {
                  return t('registerEmployee.error.required.passwordConfirmationMismatch')
                }
              },
            },
            errors: methods.formState.errors,
          }}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full"
          loading={registerEmployeeZ.isPending}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {t('registerEmployee.button.submit')}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t('registerEmployee.text.alreadyHaveAccount')}
          <Link
            to="/login"
            className="text-primary hover:text-primary/90 hover:underline"
          >
            {t('registerEmployee.link.login')}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default RegisterEmployee;

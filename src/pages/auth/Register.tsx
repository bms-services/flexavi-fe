import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LockIcon, Mail, UserIcon, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { User } from "@/types/user";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocalization } from "@/hooks/useLocalization";
import PhoneNumber from "@/components/ui/phone-number";
import { useRegister } from "@/zustand/hooks/useAuth";
import { RegisterReq } from "@/zustand/types/authT";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { useRegisterStore } from "@/zustand/stores/registerStore";
const Register = () => {
  const registerZ = useRegister();
  const { setEmail } = useRegisterStore();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLocal } = useLocalization();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterReq>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

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

    registerZ.mutate(newData, {
      onSuccess: (res) => {
        setEmail(res.result.email);
        navigate("/register-successfully");
      }
    });
  };

  /**
   * Effect to handle registration errors
   * 
   * If there are errors during registration, set the appropriate error messages.
   */
  useEffect(() => {
    if (registerZ.error?.errors) {
      mapApiErrorsToForm(registerZ.error.errors, setError);
    }
  }, [registerZ.error, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <Input
          label={t('auth:register.label.name')}
          placeholder={t('auth:register.placeholder.name')}
          id="name"
          type="text"
          icon={<UserIcon className="h-5 w-5 " />}
          rules={{
            register,
            name: "name",
            options: {
              required: t('auth:register.error.required.name')
            },
            errors,
          }}
        />
        <Input
          label={t('auth:register.label.email')}
          placeholder={t('auth:register.placeholder.email')}
          id={'email'}
          type="email"
          icon={<Mail className="h-5 w-5 " />}
          rules={{
            register,
            name: "email",
            options: {
              required: t('auth:register.error.required.email')
            },
            errors,
          }}
        />
        <PhoneNumber
          label={t('auth:register.label.phone')}
          rules={{
            control,
            name: "phone",
            options: {
              required: t('auth:register.error.required.phone')
            },
            errors,
          }}
        />
        <Input
          label={t('auth:register.label.password')}
          placeholder={t('auth:register.placeholder.password')}
          id="password"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register,
            name: "password",
            options: {
              required: t('auth:register.error.required.password')
            },
            errors,
          }}
        />
        <Input
          label={t('auth:register.label.passwordConfirmation')}
          placeholder={t('auth:register.placeholder.passwordConfirmation')}
          id="password-confirmation"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register,
            name: "password-confirmation",
            options: {
              required: t('auth:register.error.required.passwordConfirmation'),
              validate: (value) => {
                if (value !== watch("password")) {
                  return t('auth:register.error.required.passwordConfirmationMismatch')
                }
              },
            },
            errors,
          }}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full"
          loading={registerZ.isPending}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {t('auth:register.button.submit')}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t('auth:register.text.alreadyHaveAccount')}
          <Link
            to="/login"
            className="text-primary hover:text-primary/90 hover:underline"
          >
            &nbsp;{t('auth:register.link.login')}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default Register;

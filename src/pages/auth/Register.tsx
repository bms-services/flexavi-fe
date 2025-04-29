
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LockIcon, Mail, UserIcon, UserPlus } from "lucide-react";
import { StatusReducerEnum, useAppDispatch } from "@/hooks/use-redux";
import { useForm } from "react-hook-form";
import { User } from "@/types/auth";
import { useTranslation } from "react-i18next";
import { register as registerPost } from "@/actions/authActions";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useLocalization } from "@/hooks/useLocalization";
import PhoneNumber from "@/components/ui/phone-number";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLocal } = useLocalization();

  const { loading, response } = useSelector((state: RootState) => state.auth.register);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: User) => {
    const newData = {
      ...data,
      language: currentLocal,
    };

    dispatch(registerPost(newData));
  };

  useEffect(() => {
    if (response?.success) {
      navigate("/register-successfully");
    }
  }, [response, navigate]);


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
            name: "phone_number",
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
          loading={loading}
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

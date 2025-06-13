import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LogIn, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoginReq } from "@/zustand/types/authT";
import { useLogin } from "@/zustand/hooks/useAuth";

const Login = () => {
  const loginZ = useLogin();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReq>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Function to handle form submission
   * 
   * @param data - Form data containing user login information
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: LoginReq): Promise<void> => {
    loginZ.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <Input
          label={t('auth:login.label.email')}
          placeholder={t('auth:login.placeholder.email')}
          id={'email'}
          type="email"
          icon={<Mail className="h-5 w-5 " />}
          rules={{
            register,
            name: "email",
            options: {
              required: t('auth:login.error.required.email'),
            },
            errors,
          }}
        />
        <Input
          label={t('auth:login.label.password')}
          placeholder={t('auth:login.placeholder.password')}
          id={'password'}
          type="password"
          icon={<Lock className="h-5 w-5 " />}
          rules={{
            register,
            name: "password",
            options: {
              required: t('auth:login.error.required.password'),
            },
            errors,
          }}
        />
        <Link
          to="/forgot-password"
          className="inline-block text-sm text-primary hover:text-primary/90 hover:underline"
        >
          {t('auth:login.link.forgotPassword')}
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full"
          loading={loginZ.isPending}
        >
          <LogIn className="mr-2 h-4 w-4" />
          {t('auth:login.button.submit')}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t('auth:login.text.notHaveAccount')}
          <Link
            to="/register"
            className="text-primary hover:text-primary/90 hover:underline"
          >
            &nbsp;{t('auth:login.link.register')}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default Login;

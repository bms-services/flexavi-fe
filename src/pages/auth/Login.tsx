import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LogIn, Mail, Lock } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoginReq } from "@/zustand/types/authT";
import { useLogin } from "@/zustand/hooks/useAuth";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const loginZ = useLogin();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginReq>({
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
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
          label={t('login.label.email')}
          placeholder={t('login.placeholder.email')}
          id={'email'}
          type="email"
          icon={<Mail className="h-5 w-5 " />}
          rules={{
            register,
            name: "email",
            options: {
              required: t('login.error.required.email'),
            },
            errors,
          }}
        />
        <Input
          label={t('login.label.password')}
          placeholder={t('login.placeholder.password')}
          id={'password'}
          type="password"
          icon={<Lock className="h-5 w-5 " />}
          rules={{
            register,
            name: "password",
            options: {
              required: t('login.error.required.password'),
            },
            errors,
          }}
        />

        <div className="flex items-center space-x-2">
          <Controller
            name="remember_me"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
                id="remember_me"
              />
            )}
          />
          <label htmlFor="remember_me" className="text-sm">
            {t("login.label.rememberMe")}
          </label>
        </div>

        <Link
          to="/forgot-password"
          className="inline-block text-sm text-primary hover:text-primary/90 hover:underline"
        >
          {t('login.link.forgotPassword')}
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full"
          loading={loginZ.isPending}
        >
          <LogIn className="mr-2 h-4 w-4" />
          {t('login.button.submit')}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t('login.text.notHaveAccount')}
          <Link
            to="/register"
            className="text-primary hover:text-primary/90 hover:underline"
          >
            {t('login.link.register')}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default Login;

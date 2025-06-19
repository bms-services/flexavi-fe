
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Key, Mail } from "lucide-react";
import { useForgotPassword } from "@/zustand/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ForgotPasswordReq } from "@/zustand/types/authT";
import { useForm } from "react-hook-form";
import { useForgotPasswordStore } from "@/zustand/stores/authStore";

const ForgotPassword = () => {
  const forgotPasswordZ = useForgotPassword();
  const { setEmail } = useForgotPasswordStore();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordReq>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordReq): Promise<void> => {
    try {
      await forgotPasswordZ.mutateAsync(data);
      setEmail(data.email);
      navigate('/forgot-password/success');
    } catch (error) {
      throw new Error("Failed to send reset password email");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <Input
          label={t('auth:forgotPassword.label.email')}
          placeholder={t('auth:forgotPassword.placeholder.email')}
          id={'email'}
          type="email"
          icon={<Mail className="h-5 w-5 " />}
          rules={{
            register,
            name: "email",
            options: {
              required: t('auth:forgotPassword.error.required.email'),
            },
            errors,
          }}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full">
          <Key className="mr-2 h-4 w-4" />
          {t('auth:forgotPassword.button.submit')}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t('auth:forgotPassword.text.haveAccount')}
          <Link
            to="/login"
            className="text-primary hover:text-primary/90 hover:underline"
          >
            {t('auth:forgotPassword.link.loginHere')}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default ForgotPassword;

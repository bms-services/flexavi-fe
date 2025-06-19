import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LockIcon, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocalization } from "@/hooks/useLocalization";
import { useResetPassword, useVerifyResetPassword } from "@/zustand/hooks/useAuth";
import { ResetPasswordReq } from "@/zustand/types/authT";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { useResetPasswordStore } from "@/zustand/stores/authStore";
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLocal } = useLocalization();
  const { setEmail } = useResetPasswordStore();
  const resetPasswordZ = useResetPassword();
  const verifyResetPasswordZ = useVerifyResetPassword({
    token: token || "",
    email: email || "",
  });


  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordReq>({
    defaultValues: {
      token: token || "",
      email: email || "",
      password: "",
      password_confirmation: "",
    },
  });

  /**
   * Function to handle form submission
   * 
   * @param data - Form data containing user reset password information
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: ResetPasswordReq): Promise<void> => {
    try {
      const res = await resetPasswordZ.mutateAsync(data);
      navigate("/reset-password/success");
    } catch (error) {
      throw new Error('Error during password reset');
    }
  };

  /**
   * Effect to handle registration errors
   * 
   * If there are errors during registration, set the appropriate error messages.
   */
  useEffect(() => {
    if (resetPasswordZ.error?.errors) {
      mapApiErrorsToForm(resetPasswordZ.error.errors, setError);
    }
  }, [resetPasswordZ.error, setError]);


  useEffect(() => {
    if (verifyResetPasswordZ.isSuccess) {
      setEmail(verifyResetPasswordZ.data.result.email);
      setValue("email", verifyResetPasswordZ.data.result.email);
      setValue("token", token || "");
    }

    if (verifyResetPasswordZ.isError) {
      navigate("/login");
    }
  }, [verifyResetPasswordZ.isSuccess, verifyResetPasswordZ.isError, setEmail, setValue, token, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {verifyResetPasswordZ.isSuccess && (
          <p className="text-[14px]">
            Hii <b>{verifyResetPasswordZ.data.result.name}</b>,&nbsp;
            {t('auth:resetPassword.text.subDescription')}
          </p>
        )}

        {/* Email */}
        <Input
          label={t('auth:registerEmployee.label.email')}
          placeholder={t('auth:registerEmployee.placeholder.email')}
          id="email"
          type="email"
          icon={<LockIcon className="h-5 w-5 " />}
          disabled
          rules={{
            register,
            name: "email",
            options: {
              required: t('auth:registerEmployee.error.required.email')
            },
            errors,
          }}
        />

        <Input
          label={t('auth:resetPassword.label.password')}
          placeholder={t('auth:resetPassword.placeholder.password')}
          id="password"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register,
            name: "password",
            options: {
              required: t('auth:resetPassword.error.required.password')
            },
            errors,
          }}
        />
        <Input
          label={t('auth:resetPassword.label.passwordConfirmation')}
          placeholder={t('auth:resetPassword.placeholder.passwordConfirmation')}
          id="password_confirmation"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register,
            name: "password_confirmation",
            options: {
              required: t('auth:resetPassword.error.required.passwordConfirmation'),
              validate: (value) => {
                if (value !== watch("password")) {
                  return t('auth:resetPassword.error.required.passwordConfirmationMismatch')
                }
              },
            },
            errors,
          }}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full"
          loading={resetPasswordZ.isPending}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {t('auth:resetPassword.button.submit')}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t('auth:resetPassword.text.alreadyHaveAccount')}
          <Link
            to="/login"
            className="text-primary hover:text-primary/90 hover:underline"
          >
            &nbsp;{t('auth:resetPassword.link.login')}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default ResetPassword;

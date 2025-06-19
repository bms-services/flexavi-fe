import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useResetPasswordStore } from "@/zustand/stores/authStore";
import { useEffect } from "react";

const ResetPasswordSuccessfully = () => {
  const { clearEmail, email } = useResetPasswordStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  /**
   * Function to handle redirect to login page
   * 
   * @returns {void}
   */
  const handleRedirectLogin = (): void => {
    navigate("/login");
    clearEmail();
  }

  // Redirect to register page if email is not set
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  return (
    <CardContent className="space-y-4">
      <div className="text-[14px]">
        <p className="">{t("auth:resetPasswordSuccessfully.text.success")}
          <span className="font-bold text-primary">
            &nbsp; {email}
          </span>
        </p>
        <p className="">{t("auth:resetPasswordSuccessfully.text.checkEmail")}</p>
      </div>
      <Button
        onClick={handleRedirectLogin}
        className="w-full">{t("auth:resetPasswordSuccessfully.button.login")}</Button>
    </CardContent>
  );
};

export default ResetPasswordSuccessfully;

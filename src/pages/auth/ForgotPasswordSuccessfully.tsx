import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useForgotPasswordStore } from "@/zustand/stores/authStore";
import { useEffect } from "react";

const ForgotPasswordSuccessfully = () => {
  const { clearEmail, email } = useForgotPasswordStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  /**
   * Function to handle redirect to login page
   * 
   * @returns {void}
   */
  const handleRedirectLogin = () => {
    navigate("/login");
    clearEmail();
  }

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  return (
    <CardContent className="space-y-4">
      <div className="text-[14px]">
        <p>
          <span className="font-bold text-primary">
            {email}{" "}
          </span>
          {t("forgotPasswordSuccessfully.text.success")}
          {t("forgotPasswordSuccessfully.text.checkEmail")}
        </p>
      </div>
      <Button
        onClick={handleRedirectLogin}
        className="w-full">{t("forgotPasswordSuccessfully.button.login")}</Button>
    </CardContent>
  );
};

export default ForgotPasswordSuccessfully;

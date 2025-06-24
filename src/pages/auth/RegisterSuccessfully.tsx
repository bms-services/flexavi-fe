import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useRegister } from "@/zustand/hooks/useAuth";
import { useRegisterStore } from "@/zustand/stores/authStore";
import { useEffect } from "react";

const RegisterSuccessfully = () => {
  const { clearEmail, email } = useRegisterStore();
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

  // Redirect to register page if email is not set
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  return (
    <CardContent className="space-y-4">
      <div className="text-[14px]">
        <p className="">{t("registerSuccessfully.text.welcome")}
          <span className="font-bold text-primary">
            {" "}{email}
          </span>
        </p>
        <p className="">{t("registerSuccessfully.text.activate")}</p>
      </div>
      <Button
        onClick={handleRedirectLogin}
        className="w-full">{t("registerSuccessfully.button.login")}</Button>
    </CardContent>
  );
};

export default RegisterSuccessfully;

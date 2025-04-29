
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { StatusReducerEnum, useAppDispatch } from "@/hooks/use-redux";
import { useForm } from "react-hook-form";
import { User } from "@/types/auth";
import { useTranslation } from "react-i18next";
import { pushRegister, pushRegisterReset } from "@/actions/authActions";
import i18n from "@/lib/i18n";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";

const RegisterSuccessfully = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { response, status } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleRedirectLogin = () => {
    dispatch(pushRegisterReset());

    navigate("/login");
  }

  useEffect(() => {
    if (response?.status === StatusReducerEnum.IDLE) {
      navigate("/login");
    }
  }, [response, status, navigate]);


  return (
    <CardContent className="space-y-4">
      <div className="text-[14px]">
        <p className="">{t("auth:registerSuccessfully.text.welcome")}
          <span className="font-bold text-primary">
            &nbsp;{response?.result?.name}
          </span>
        </p>
        <p className="">{t("auth:registerSuccessfully.text.activate")}</p>
      </div>
      <Button
        onClick={handleRedirectLogin}
        className="w-full">{t("auth:registerSuccessfully.button.login")}</Button>
    </CardContent>
  );
};

export default RegisterSuccessfully;

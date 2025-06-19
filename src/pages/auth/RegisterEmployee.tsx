import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LockIcon, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocalization } from "@/hooks/useLocalization";
import { useRegisterEmployee, useVerifyRegisterEmployee } from "@/zustand/hooks/useAuth";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { useRegisterStore } from "@/zustand/stores/authStore";
import { useSearchParams } from "react-router-dom";
import { RegisterEmployeeReq } from "@/zustand/types/authT";
import PhoneNumber from "@/components/ui/phone-number";

const RegisterEmployee = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLocal } = useLocalization();
  // get token from param
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { setEmail } = useRegisterStore();
  const registerEmployeeZ = useRegisterEmployee();
  const verifyRegisterEmployeeZ = useVerifyRegisterEmployee(token)


  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<RegisterEmployeeReq>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      token: token,
    },
  });



  /**
   * Function to handle form submission
   * 
   * @param data - Form data containing user registration information
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: RegisterEmployeeReq): Promise<void> => {
    try {
      const newData = {
        ...data,
        language: currentLocal,
      };

      const res = await registerEmployeeZ.mutateAsync(newData);
      setEmail(res.result.email);
      navigate("/register/success");
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  /**
   * Effect to handle registration errors
   * 
   * If there are errors during registration, set the appropriate error messages.
   */
  useEffect(() => {
    if (registerEmployeeZ.error?.errors) {
      mapApiErrorsToForm(registerEmployeeZ.error.errors, setError);
    }
  }, [registerEmployeeZ.error, setError]);


  useEffect(() => {
    if (verifyRegisterEmployeeZ.isSuccess) {
      const { name, email, phone } = verifyRegisterEmployeeZ.data.result;
      setValue("name", name);
      setValue("email", email);
      setValue("phone", phone);
    }

    if (verifyRegisterEmployeeZ.error) {
      navigate("/login");
    }
  }, [verifyRegisterEmployeeZ.isSuccess, verifyRegisterEmployeeZ.error, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {verifyRegisterEmployeeZ.isSuccess && (
          <div>
            <p className="text-[14px]">
              Hii <b>{verifyRegisterEmployeeZ.data.result.name}</b>,&nbsp;
              {t('auth:registerEmployee.text.subDescription')}&nbsp;
              <span className="text-primary font-semibold">
                {verifyRegisterEmployeeZ.data.result.company_name}
              </span>
            </p>

            <p className="text-[14px]">
              {t('auth:registerEmployee.text.subDescription2')}
            </p>
          </div>
        )}
        <Input
          label={t('auth:registerEmployee.label.name')}
          placeholder={t('auth:registerEmployee.placeholder.name')}
          id="name"
          type="text"
          icon={<LockIcon className="h-5 w-5 " />}
          disabled
          rules={{
            register,
            name: "name",
            options: {
              required: t('auth:registerEmployee.error.required.name')
            },
            errors,
          }}
        />
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
        <PhoneNumber
          label={t('auth:registerEmployee.label.phone')}
          disabled
          rules={{
            control,
            name: "phone",
            options: {
              required: t('auth:registerEmployee.error.required.phone')
            },
            errors,
          }}
        />

        <Input
          label={t('auth:registerEmployee.label.password')}
          placeholder={t('auth:registerEmployee.placeholder.password')}
          id="password"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register,
            name: "password",
            options: {
              required: t('auth:registerEmployee.error.required.password')
            },
            errors,
          }}
        />
        <Input
          label={t('auth:registerEmployee.label.passwordConfirmation')}
          placeholder={t('auth:registerEmployee.placeholder.passwordConfirmation')}
          id="password-confirmation"
          type="password"
          icon={<LockIcon className="h-5 w-5 " />}
          rules={{
            register,
            name: "password-confirmation",
            options: {
              required: t('auth:registerEmployee.error.required.passwordConfirmation'),
              validate: (value) => {
                if (value !== watch("password")) {
                  return t('auth:registerEmployee.error.required.passwordConfirmationMismatch')
                }
              },
            },
            errors,
          }}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full"
          loading={registerEmployeeZ.isPending}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {t('auth:registerEmployee.button.submit')}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t('auth:registerEmployee.text.alreadyHaveAccount')}
          <Link
            to="/login"
            className="text-primary hover:text-primary/90 hover:underline"
          >
            &nbsp;{t('auth:registerEmployee.link.login')}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default RegisterEmployee;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useAppDispatch } from "@/hooks/use-redux";
import { FieldValue, useForm } from "react-hook-form";
import { User } from "@/types/auth";
import { pushLogin } from "@/actions/authActions";
import { useTranslation } from "react-i18next";

const Login = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValue<User>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: User) => {
    dispatch(pushLogin(data));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <LogIn className="h-5 w-5 text-primary" />
            <CardTitle>
              {t('lang')}
            </CardTitle>
          </div>
          <CardDescription>
            Log in op je account om verder te gaan
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <Input
              label='Email'
              id={'email'}
              icon={<Mail className="h-5 w-5 " />}
              rules={{
                register,
                name: "email",
                options: {
                  required: 'Dit veld is verplicht'
                },
                errors,
              }}
            />
            <Input
              label='Wachtwoord'
              id={'password'}
              type="password"
              icon={<Lock className="h-5 w-5 " />}
              rules={{
                register,
                name: "password",
                options: {
                  required: 'Dit veld is verplicht'
                },
                errors,
              }}
            />
            <Link
              to="/auth/forgot-password"
              className="inline-block text-sm text-primary hover:text-primary/90 hover:underline"
            >
              Wachtwoord vergeten?
            </Link>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Inloggen
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Nog geen account?
              <Link
                to="/register"
                className="text-primary hover:text-primary/90 hover:underline"
              >
                Registreer hier
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;

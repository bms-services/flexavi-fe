
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useAppDispatch } from "@/hooks/use-redux";
import { FieldValue, useForm } from "react-hook-form";
import { User } from "@/types/auth";

const Register = () => {
  const dispatch = useAppDispatch();
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
    // dispatch(pushLogin(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <CardTitle>Account aanmaken</CardTitle>
          </div>
          <CardDescription>
            Maak een account aan om te beginnen
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <Input
              id="name"
              type="text"
              placeholder="Volledige naam"
              rules={{
                register,
                name: "name",
                options: {
                  required: 'Dit veld is verplicht'
                },
                errors,
              }}
            />
            <Input
              id="email"
              type="email"
              placeholder="naam@bedrijf.nl"
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
              id="password"
              type="password"
              rules={{
                register,
                name: "password",
                options: {
                  required: 'Dit veld is verplicht'
                },
                errors,
              }}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Account aanmaken
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Al een account?{" "}
              <Link
                to="/auth/login"
                className="text-primary hover:text-primary/90 hover:underline"
              >
                Log hier in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;

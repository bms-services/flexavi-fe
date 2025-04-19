
import { CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PaymentStarted = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-600">Betaling gestart</CardTitle>
          <CardDescription>
            U wordt doorgestuurd naar onze betaalpagina.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <CreditCard className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <p>
            Bedankt voor uw betaling. U wordt binnen enkele seconden doorgestuurd naar 
            ons beveiligde betaalsysteem.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

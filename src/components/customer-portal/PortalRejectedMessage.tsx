
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface PortalRejectedMessageProps {
  title: string;
  description: string;
}

const PortalRejectedMessage = ({ title, description }: PortalRejectedMessageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-red-600">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <X className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <p>
            Mocht u van gedachten veranderen of vragen hebben, aarzel dan niet om contact met ons op te nemen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalRejectedMessage;

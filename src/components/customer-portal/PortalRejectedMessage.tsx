
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
      <Card className="w-full max-w-3xl border shadow-md">
        <CardHeader className="text-center border-b bg-white">
          <CardTitle className="text-2xl text-red-600">{title}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12 bg-white">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <p className="text-gray-700 max-w-md mx-auto">
            Mocht u van gedachten veranderen of vragen hebben, aarzel dan niet om contact met ons op te nemen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalRejectedMessage;

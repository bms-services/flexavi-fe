
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PortalSuccessMessageProps {
  title: string;
  description: string;
}

const PortalSuccessMessage = ({ title, description }: PortalSuccessMessageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-3xl border shadow-md">
        <CardHeader className="text-center border-b bg-white">
          <CardTitle className="text-2xl text-green-600">{title}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12 bg-white">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <p className="text-gray-700 max-w-md mx-auto">
            We hebben uw acceptatie ontvangen en zullen binnenkort contact met u opnemen
            om de volgende stappen te bespreken.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalSuccessMessage;

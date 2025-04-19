
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
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-600">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Check className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <p>
            We hebben uw acceptatie ontvangen en zullen binnenkort contact met u opnemen
            om de volgende stappen te bespreken.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalSuccessMessage;

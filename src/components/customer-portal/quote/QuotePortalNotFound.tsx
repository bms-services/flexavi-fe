
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const QuotePortalNotFound = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="max-w-md w-full">
        <CardContent className="py-12 text-center">
          <p className="text-lg text-gray-600">Offerte niet gevonden.</p>
        </CardContent>
      </Card>
    </div>
  );
};

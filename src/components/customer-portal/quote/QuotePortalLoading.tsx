
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const QuotePortalLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12 px-4">
      <div className="container mx-auto flex justify-center">
        <Card className="w-full max-w-3xl border shadow-md">
          <CardHeader className="border-b pb-6 bg-white">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48 bg-gray-200" />
                <Skeleton className="h-4 w-72 bg-gray-200" />
              </div>
              <Skeleton className="h-6 w-24 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="py-6 space-y-6 bg-white">
            <div className="space-y-4">
              <Skeleton className="h-24 w-full bg-gray-200" />
              <Skeleton className="h-64 w-full bg-gray-200" />
              <Skeleton className="h-40 w-full bg-gray-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

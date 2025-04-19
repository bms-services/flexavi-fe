
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";

const Partners = () => {
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Partner Voordelen</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5" />
                Marketing Bureau XYZ
              </CardTitle>
              <CardDescription>
                Professionele marketing diensten
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>20% korting op alle diensten</li>
                  <li>Gratis marketing scan</li>
                  <li>Expertise in dakbedrijf marketing</li>
                  <li>Persoonlijke accountmanager</li>
                </ul>
                <Button className="w-full">
                  Contact opnemen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Partners;

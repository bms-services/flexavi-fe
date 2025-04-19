
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Users } from "lucide-react";

const Partners = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Partner Voordelen
          </h1>
          <p className="text-lg text-muted-foreground">
            Ontdek exclusieve voordelen van onze partners speciaal voor jouw dakbedrijf
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2">
            <CardHeader className="relative overflow-hidden pb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 transform group-hover:scale-105 transition-transform duration-300" />
              <CardTitle className="flex items-center gap-2 relative">
                <Handshake className="h-5 w-5 text-purple-500" />
                Marketing Bureau XYZ
              </CardTitle>
              <CardDescription className="relative">
                Professionele marketing diensten
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ul className="list-none space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    20% korting op alle diensten
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    Gratis marketing scan
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    Expertise in dakbedrijf marketing
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    Persoonlijke accountmanager
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Contact opnemen
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Extra partner card example */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2">
            <CardHeader className="relative overflow-hidden pb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 transform group-hover:scale-105 transition-transform duration-300" />
              <CardTitle className="flex items-center gap-2 relative">
                <Users className="h-5 w-5 text-blue-500" />
                Personeels Bureau ABC
              </CardTitle>
              <CardDescription className="relative">
                Specialistische werving & selectie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ul className="list-none space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    15% korting op recruitment
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Gratis job posting
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Dakspecifieke kandidaten pool
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Dedicated recruitment team
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
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

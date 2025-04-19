
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Users } from "lucide-react";

const Partners = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="container py-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-fade-in">
              Partner Voordelen
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Ontdek exclusieve voordelen van onze partners speciaal voor jouw dakbedrijf. 
              Profiteer van kortingen en speciale aanbiedingen.
            </p>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-purple-200 hover:-translate-y-1">
              <CardHeader className="relative overflow-hidden pb-8 pt-12">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
                  <Handshake className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-center mt-4">Marketing Bureau XYZ</CardTitle>
                <CardDescription className="text-center text-base mt-2">
                  Professionele marketing diensten
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="space-y-8">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                      <span className="text-base">20% korting op alle diensten</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                      <span className="text-base">Gratis marketing scan</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                      <span className="text-base">Expertise in dakbedrijf marketing</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                      <span className="text-base">Persoonlijke accountmanager</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg py-6">
                    Contact opnemen
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-blue-200 hover:-translate-y-1">
              <CardHeader className="relative overflow-hidden pb-8 pt-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-center mt-4">Personeels Bureau ABC</CardTitle>
                <CardDescription className="text-center text-base mt-2">
                  Specialistische werving & selectie
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="space-y-8">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                      <span className="text-base">15% korting op recruitment</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                      <span className="text-base">Gratis job posting</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                      <span className="text-base">Dakspecifieke kandidaten pool</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                      <span className="text-base">Dedicated recruitment team</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg py-6">
                    Contact opnemen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Partners;

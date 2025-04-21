
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2, Calendar, Users2, User, Paperclip, Mail, 
  Pen, CreditCard, Shield, FileText, Webhook, Star
} from "lucide-react";

export const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Instellingen</h1>
        <p className="text-muted-foreground">
          Beheer je account- en applicatie-instellingen.
        </p>
      </div>

      <div className="flex mt-6 min-h-[calc(100vh-10rem)]">
        <div className="shrink-0">
          <TabsList className="flex flex-col h-auto space-y-1 min-w-[200px] bg-muted p-2 rounded-l-md">
            <TabsTrigger value="company" className="w-full justify-start">
              <Building2 className="h-4 w-4 mr-2" />
              Bedrijf
            </TabsTrigger>
            <TabsTrigger value="teams" className="w-full justify-start">
              <Users2 className="h-4 w-4 mr-2" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="employees" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              Medewerkers
            </TabsTrigger>
            <TabsTrigger value="permissions" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Rechten
            </TabsTrigger>
            <TabsTrigger value="appointments" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Agenda
            </TabsTrigger>
            <TabsTrigger value="account" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="attachments" className="w-full justify-start">
              <Paperclip className="h-4 w-4 mr-2" />
              Standaard bijlagen
            </TabsTrigger>
            <TabsTrigger value="email" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Email templates
            </TabsTrigger>
            <TabsTrigger value="signature" className="w-full justify-start">
              <Pen className="h-4 w-4 mr-2" />
              Handtekening
            </TabsTrigger>
            <TabsTrigger value="subscription" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Mijn abonnement
            </TabsTrigger>
            <TabsTrigger value="workagreements" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Werkovereenkomsten
            </TabsTrigger>
            <TabsTrigger value="reputation" className="w-full justify-start">
              <Star className="h-4 w-4 mr-2" />
              Reputatiebeheer
            </TabsTrigger>
            <TabsTrigger value="integrations" className="w-full justify-start">
              <Webhook className="h-4 w-4 mr-2" />
              Koppelingen
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 border-l bg-background ml-4 pl-6">
          {children}
        </div>
      </div>
    </div>
  );
};

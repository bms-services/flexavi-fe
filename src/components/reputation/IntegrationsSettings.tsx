
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IntegrationCredentials } from "@/types/reputation";
import { PlatformIntegrationDialog } from "./dialogs/PlatformIntegrationDialog";

export const IntegrationsSettings = ({ reputation }: { reputation: any }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<IntegrationCredentials | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditPlatform = (platform: IntegrationCredentials) => {
    setSelectedPlatform(platform);
    setIsDialogOpen(true);
  };

  const platformConfig = {
    google: {
      title: "Google Reviews",
      description: "Integratie met Google My Business voor recensies beheer",
      icon: "/logos/google.svg",
      placeholder: "https://placehold.co/200x80/e2e8f0/475569?text=Google",
      color: "#4285F4"
    },
    trustpilot: {
      title: "Trustpilot",
      description: "Verbinden met het Trustpilot platform",
      icon: "/logos/trustpilot.svg",
      placeholder: "https://placehold.co/200x80/e2e8f0/475569?text=Trustpilot",
      color: "#00B67A"
    },
    facebook: {
      title: "Facebook",
      description: "Facebook pagina recensies integreren",
      icon: "/logos/facebook.svg",
      placeholder: "https://placehold.co/200x80/e2e8f0/475569?text=Facebook",
      color: "#1877F2"
    },
    internal: {
      title: "Eigen website",
      description: "Interne recensies op uw website tonen",
      icon: "/logos/website.svg",
      placeholder: "https://placehold.co/200x80/e2e8f0/475569?text=Website",
      color: "#6366f1"
    }
  };

  return (
    <div className="space-y-6 py-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Platform integraties</h2>
        <p className="text-muted-foreground">
          Verbind uw review accounts om recensies te beheren op verschillende platforms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reputation.settings.platforms.map((platform: IntegrationCredentials) => {
          const config = platformConfig[platform.platform as keyof typeof platformConfig];
          
          return (
            <Card key={platform.platform}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-md" style={{ backgroundColor: `${config.color}10` }}>
                    <img
                      src={config.icon}
                      alt={`${config.title} logo`}
                      className="h-8 w-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = config.placeholder;
                      }}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{config.title}</CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platform.connected ? (
                    <>
                      <div className="space-y-2">
                        <Label>Verbonden</Label>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Actief</span>
                        </div>
                      </div>
                      
                      {platform.profileUrl && (
                        <div className="space-y-2">
                          <Label>Review profiel URL</Label>
                          <Input value={platform.profileUrl} readOnly className="bg-muted" />
                        </div>
                      )}
                      
                      {platform.lastSync && (
                        <div className="space-y-1">
                          <Label className="text-xs">Laatste synchronisatie</Label>
                          <p className="text-xs text-muted-foreground">
                            {new Date(platform.lastSync).toLocaleString('nl-NL')}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-muted-foreground mb-4">
                        Nog niet verbonden met {config.title}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant={platform.connected ? "outline" : "default"}
                  className="w-full"
                  onClick={() => handleEditPlatform(platform)}
                >
                  {platform.connected ? "Bewerken" : "Verbinden"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <PlatformIntegrationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        platform={selectedPlatform}
        onSave={reputation.updatePlatformIntegration}
        platformConfig={platformConfig}
      />
    </div>
  );
};

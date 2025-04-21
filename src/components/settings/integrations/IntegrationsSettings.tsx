
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Integration } from "@/types";
import { IntegrationDialog } from "./IntegrationDialog";
import { toast } from "sonner";
import { Plus, Webhook } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockIntegrations: Integration[] = [
  {
    id: "1",
    name: "Trustoo Leads",
    platformType: "trustoo",
    webhookUrl: "https://api.example.com/webhook/trustoo",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const IntegrationsSettings = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const handleAddIntegration = (integration: Integration) => {
    setIntegrations([...integrations, integration]);
    toast.success("Integratie succesvol toegevoegd");
    setIsDialogOpen(false);
  };

  const handleUpdateIntegration = (updatedIntegration: Integration) => {
    setIntegrations(
      integrations.map((i) => (i.id === updatedIntegration.id ? updatedIntegration : i))
    );
    toast.success("Integratie succesvol bijgewerkt");
    setIsDialogOpen(false);
    setSelectedIntegration(null);
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(integrations.filter((i) => i.id !== id));
    toast.success("Integratie succesvol verwijderd");
  };

  const openEditDialog = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Koppelingen</h2>
          <p className="text-muted-foreground">
            Beheer je integraties met lead platformen en webhooks
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe Koppeling
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naam</TableHead>
              <TableHead>Platform Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Laatst Bijgewerkt</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {integrations.map((integration) => (
              <TableRow key={integration.id}>
                <TableCell className="font-medium">{integration.name}</TableCell>
                <TableCell>{integration.platformType}</TableCell>
                <TableCell>
                  <Badge variant={integration.status === "active" ? "default" : "secondary"}>
                    {integration.status === "active" ? "Actief" : "Inactief"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(integration.updatedAt).toLocaleDateString("nl-NL")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(integration)}
                  >
                    Bewerken
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <IntegrationDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedIntegration(null);
        }}
        onSubmit={selectedIntegration ? handleUpdateIntegration : handleAddIntegration}
        integration={selectedIntegration}
      />
    </div>
  );
};

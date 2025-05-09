import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Integration } from "@/types";
import { IntegrationDialog } from "./IntegrationDialog";

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

interface WebhookLog {
  id: string;
  integrationId: string;
  timestamp: string;
  event: string;
  status: "success" | "error";
}

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
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);

  const handleAddIntegration = async (integration: Integration) => {
    const logEntry: WebhookLog = {
      id: crypto.randomUUID(),
      integrationId: integration.id,
      timestamp: new Date().toISOString(),
      event: "integration_created",
      status: "success",
    };
    
    setWebhookLogs([logEntry, ...webhookLogs]);
    setIntegrations([...integrations, integration]);
    setIsDialogOpen(false);
  };

  const handleUpdateIntegration = (updatedIntegration: Integration) => {
    setIntegrations(
      integrations.map((i) => (i.id === updatedIntegration.id ? updatedIntegration : i))
    );
    setIsDialogOpen(false);
    setSelectedIntegration(null);
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(integrations.filter((i) => i.id !== id));
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
        <h3 className="text-lg font-medium p-4 border-b">Webhook Logs</h3>
        <div className="p-4">
          {webhookLogs.length === 0 ? (
            <p className="text-muted-foreground">Geen webhook logs beschikbaar</p>
          ) : (
            <div className="space-y-2">
              {webhookLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex justify-between items-center p-2 bg-muted rounded"
                >
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                  <span>{log.event}</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      log.status === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Pencil, FileCog, Download, Share } from "lucide-react";
import { WorkAgreement } from "@/types";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { mockLeads } from "@/data/mockLeads";
import { useWorkAgreementStatusBadge } from "@/hooks/useWorkAgreementStatusBadge";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const WorkAgreementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [workAgreement, setWorkAgreement] = useState<WorkAgreement | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundAgreement = mockWorkAgreements.find(wa => wa.id === id);
      if (foundAgreement) {
        setWorkAgreement(foundAgreement);

        const foundCustomer = mockLeads.find(l => l.id === foundAgreement.leadId);
        if (foundCustomer) {
          setCustomer(foundCustomer);
        }
      }
    }
    setLoading(false);
  }, [id]);

  const statusBadge = useWorkAgreementStatusBadge(workAgreement?.status);

  const handleEdit = () => {
    navigate(`/workagreements/edit/${id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-6">
          <p>Laden...</p>
        </div>
      </Layout>
    );
  }

  if (!workAgreement || !customer) {
    return (
      <Layout>
        <div className="container py-6">
          <p>Werkovereenkomst niet gevonden.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Werkovereenkomst {workAgreement.id.replace("wa-", "WO-")}
              </h1>
              <p className="text-muted-foreground">
                Gemaakt op {format(new Date(workAgreement.createdAt), "d MMMM yyyy", { locale: nl })}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Bewerken
            </Button>
            <Button>
              <Share className="mr-2 h-4 w-4" />
              Delen
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p>
                      {statusBadge && (
                        <Badge variant={statusBadge.variant} className="mt-1">
                          {statusBadge.label}
                        </Badge>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrag</p>
                    <p className="font-medium">{formatCurrency(workAgreement.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Startdatum</p>
                    <p className="font-medium">
                      {format(new Date(workAgreement.startDate), "d MMMM yyyy", { locale: nl })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Offerte</p>
                    <p className="font-medium">{workAgreement.quoteId.replace("quote-", "OFF-")}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Omschrijving</p>
                  <p className="mt-1">{workAgreement.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Werkbeschrijving</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{workAgreement.workDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Garantie</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{workAgreement.warranty}</p>
              </CardContent>
            </Card>

            {workAgreement.exclusions && workAgreement.exclusions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Uitsluitingen</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {workAgreement.exclusions.map((exclusion, index) => (
                      <li key={index}>{exclusion}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Klantgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Naam</p>
                  <p className="font-medium">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefoon</p>
                  <p className="font-medium">{customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Adres</p>
                  <p className="font-medium">{customer.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Betalingsgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Betaalmethode</p>
                  <p className="font-medium">
                    {workAgreement.paymentMethod === "bank" && "Bankoverschrijving"}
                    {workAgreement.paymentMethod === "cash" && "Contant"}
                    {workAgreement.paymentMethod === "both" && "Bankoversch./Contant"}
                    {!workAgreement.paymentMethod && "Bankoverschrijving"}
                  </p>
                </div>

                {workAgreement.paymentInstallments && workAgreement.paymentInstallments.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Termijnen</p>
                    <div className="space-y-2">
                      {workAgreement.paymentInstallments.map((installment, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <span>{installment.description}</span>
                          <span className="font-medium">{installment.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documenten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {workAgreement.defaultAttachments ? (
                    workAgreement.defaultAttachments.map((attachment, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                        <span>{attachment.name}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Geen documenten beschikbaar.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkAgreementDetail;

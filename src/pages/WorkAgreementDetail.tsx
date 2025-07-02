
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Download, Share } from "lucide-react";
import { useGetWorkAgreement } from "@/zustand/hooks/useWorkAgreement";
import WorkAgreementStatusBadge from "@/components/workagreements/WorkAgreementStatusBadge";

const WorkAgreementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getWorkAgreementZ = useGetWorkAgreement(id || "");
  const agreement = getWorkAgreementZ.data?.result;

  const handleEdit = () => {
    navigate(`/workagreements/edit/${id}`);
  };

  if (getWorkAgreementZ.isPending) {
    return (
      <Layout>
        <div className="container py-6">
          <p>Laden...</p>
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
                Werkovereenkomst {agreement?.id}
              </h1>
              <p className="text-muted-foreground">
                Gemaakt op {agreement?.created_at}
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
                      {agreement?.status && (
                        <WorkAgreementStatusBadge
                          status={agreement.status}
                        />
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrag</p>
                    <p className="font-medium">{agreement?.total_amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Startdatum</p>
                    <p className="font-medium">
                      {agreement?.start_date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Offerte</p>
                    <p className="font-medium">
                      {agreement?.quotes && agreement.quotes.length > 0
                        ? agreement.quotes.map((q) => q.id).join(", ")
                        : "Geen offertes"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Omschrijving</p>
                  <p className="mt-1">{agreement?.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Werkbeschrijving</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{agreement?.description_work}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Garantie</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{agreement?.warranty}</p>
              </CardContent>
            </Card>

            {agreement?.exclusions && agreement.exclusions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Uitsluitingen</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {agreement.exclusions.map((exclusion, index) => (
                      <li key={index}>{exclusion.description}</li>
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
              {agreement?.leads.map((lead) => (
                <CardContent key={lead.id} className="space-y-4 border-b">
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Naam</p>
                    <p className="font-medium">{lead.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{lead.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefoon</p>
                    <p className="font-medium">{lead.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adres</p>
                    <p className="font-medium">{lead.address.city}</p>
                  </div>
                </CardContent>
              ))}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Betalingsgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Betaalmethode</p>
                  <p className="font-medium">
                    {agreement?.payment.payment_method === "bank" && "Bankoverschrijving"}
                    {agreement?.payment.payment_method === "cash" && "Contant"}
                    {agreement?.payment.payment_method === "both" && "Bankoversch./Contant"}
                    {!agreement?.payment.payment_method && "Bankoverschrijving"}
                  </p>
                </div>

                {agreement?.payment.terms && agreement?.payment.terms.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Termijnen</p>
                    <div className="space-y-2">
                      {agreement.payment.terms.map((installment, index) => (
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
                  {agreement?.attachments ? (
                    agreement.attachments.map((attachment, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                        <span>{attachment.name}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={attachment.name} target="_blank" rel="noopener noreferrer">
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

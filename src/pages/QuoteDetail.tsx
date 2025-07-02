import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Share } from "lucide-react";
import { useGetQuotation } from "@/zustand/hooks/useQuotation";
import QuoteStatusBadge from "@/components/leads/badges/QuoteStatusBadge";

const QuoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getQuoteZ = useGetQuotation(id || "");
  const quote = getQuoteZ.data?.result;

  const handleEdit = () => {
    navigate(`/quotes/edit/${id}`);
  };

  if (getQuoteZ.isPending) {
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
                Offerte {quote?.id}
              </h1>
              <p className="text-muted-foreground">
                Gemaakt op {quote?.created_at}
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
                      {quote?.status && (
                        <QuoteStatusBadge
                          status={quote.status}
                        />
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrag</p>
                    <p className="font-medium">{quote?.total_amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Datum</p>
                    <p className="font-medium">
                      {quote?.planned_start_date}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Omschrijving</p>
                  <p className="mt-1">{quote?.description}</p>
                </div>
              </CardContent>
            </Card>


            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Klantgegevens</CardTitle>
                </CardHeader>
                {quote?.leads.map((lead) => (
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
                  </CardContent>
                ))}
              </Card>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuoteDetail;

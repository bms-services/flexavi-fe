
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LeadDetail } from "@/components/leads/LeadDetail";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { getLeadDetail } from "@/data/mockData";

const LeadDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const leadDetail = id ? getLeadDetail(id) : undefined;

  if (!leadDetail) {
    return (
      <Layout>
        <div className="container py-6 space-y-6">
          <Button variant="ghost" onClick={() => navigate("/leads")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Terug naar leads
          </Button>
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Lead niet gevonden.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate("/leads")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Terug naar leads
        </Button>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{leadDetail.name}</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate(`/portal/dashboard/${leadDetail.id}`)}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Bekijk klant portaal
            </Button>
            <Button variant="outline">Bewerken</Button>
          </div>
        </div>

        <LeadDetail lead={leadDetail} />
      </div>
    </Layout>
  );
};

export default LeadDetails;

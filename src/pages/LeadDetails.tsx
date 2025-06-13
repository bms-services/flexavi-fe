import { useParams, useNavigate } from "react-router-dom";
import { LeadDetail } from "@/components/leads/LeadDetail";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { getLeadDetail } from "@/data/mockData";
import { LeadDetailActions } from "@/components/leads/components/LeadActions";
import { useGetLead } from "@/zustand/hooks/useLead";

const LeadDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getLeadZ = useGetLead(id ?? "");

  if (getLeadZ.isError) {
    return (
      <div className="container py-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate("/leads")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Terug naar leads
        </Button>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Lead niet gevonden.</p>
        </div>
      </div>
    );
  }


  if (getLeadZ.isSuccess) {
    const leadDetailZ = getLeadZ?.data?.result;
    console.log("Lead Detail:", leadDetailZ);

    return (
      <div className="container py-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/leads")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Terug naar leads
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/portal/dashboard`)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Bekijk klant portaal
          </Button>
        </div>

        {/* <LeadDetailActions /> */}

        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">{leadDetailZ.email}</h1>
          <LeadDetail lead={leadDetailZ} />
        </div>
      </div>

    );
  };
}


export default LeadDetails;

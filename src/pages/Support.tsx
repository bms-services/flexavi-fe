
import React from "react";
import { SupportHeader } from "@/components/support/SupportHeader";
import { SupportTicketsTable } from "@/components/support/SupportTicketsTable";
import { useSupportTickets } from "@/hooks/useSupportTickets";
import { Layout } from "@/components/layout/Layout";

const Support = () => {
  const { tickets, loading, deleteTicket } = useSupportTickets();

  return (
    <Layout>
      <div className="container mx-auto">
        <SupportHeader />
        <div className="p-4 md:p-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Tickets laden...</p>
            </div>
          ) : (
            <SupportTicketsTable tickets={tickets} onDelete={deleteTicket} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Support;

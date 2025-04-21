
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { RequestsHeader } from "@/components/requests/RequestsHeader";
import { StatusFilter } from "@/components/requests/StatusFilter";
import { RequestCard } from "@/components/requests/RequestCard";
import { CreateRequestDialog } from "@/components/requests/CreateRequestDialog";
import { RequestDialog } from "@/components/requests/RequestDialog";
import { useRequests } from "@/hooks/useRequests";
import { Request, RequestStatus } from "@/types/requests";

export default function Requests() {
  const {
    requests,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    addRequest,
    updateRequestStatus,
    addComment,
    voteOnRequest,
    getRequestById,
    isAdmin,
  } = useRequests();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  
  const selectedRequest = selectedRequestId 
    ? getRequestById(selectedRequestId) 
    : null;

  const handleCreateRequest = (title: string, description: string) => {
    const newRequest = addRequest(title, description);
    setSelectedRequestId(newRequest.id);
  };

  const handleSelectRequest = (requestId: string) => {
    setSelectedRequestId(requestId);
  };

  const handleCloseRequestDialog = () => {
    setSelectedRequestId(null);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <RequestsHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onCreateRequest={() => setIsCreateDialogOpen(true)}
        />

        <StatusFilter
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onVote={voteOnRequest}
              onSelect={handleSelectRequest}
            />
          ))}
          {requests.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">
                Geen requests gevonden. Maak een nieuwe aan!
              </p>
            </div>
          )}
        </div>

        <CreateRequestDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onSubmit={handleCreateRequest}
        />

        <RequestDialog
          request={selectedRequest}
          isOpen={!!selectedRequestId}
          onClose={handleCloseRequestDialog}
          onVote={voteOnRequest}
          onAddComment={addComment}
          onUpdateStatus={updateRequestStatus}
          isAdmin={isAdmin}
        />
      </div>
    </Layout>
  );
}

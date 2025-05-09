
import { useState, useMemo } from "react";
import { Request, RequestStatus, RequestComment } from "@/types/requests";


// Mock initial data
const initialRequests: Request[] = [
  {
    id: "1",
    title: "Drag & drop kalender voor planning",
    description: "Het zou handig zijn als we een drag & drop kalender hebben voor de planning van afspraken.",
    userId: "admin1",
    userName: "Jan Jansen",
    status: "idea",
    upvotes: 12,
    downvotes: 2,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: "c1",
        requestId: "1",
        userId: "user1",
        userName: "Piet Pietersen",
        content: "Dit zou echt geweldig zijn voor onze planningsafdeling!",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: "2",
    title: "Automatische productprijzen bijwerken",
    description: "Een functie om productprijzen automatisch bij te werken op basis van inkoopprijzen en gewenste marge.",
    userId: "user2",
    userName: "Klaas Klaassen",
    status: "planned",
    upvotes: 23,
    downvotes: 1,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    comments: []
  },
  {
    id: "3",
    title: "Integratie met boekhoudpakket",
    description: "Graag een integratie met ons boekhoudpakket zodat facturen automatisch verwerkt kunnen worden.",
    userId: "user3",
    userName: "Mark de Boer",
    status: "in_progress",
    upvotes: 45,
    downvotes: 3,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    comments: []
  }
];

export const useRequests = () => {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin] = useState(true); // Mock admin state

  const filteredRequests = useMemo(() => {
    return requests
      .filter(request => 
        selectedStatus === "all" || request.status === selectedStatus)
      .filter(request => 
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        request.description.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  }, [requests, selectedStatus, searchQuery]);

  const addRequest = (title: string, description: string) => {
    const newRequest: Request = {
      id: crypto.randomUUID(),
      title,
      description,
      userId: "currentUser", // In a real app, get this from auth
      userName: "Huidige Gebruiker", // In a real app, get this from auth
      status: "idea",
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };

    setRequests(prev => [...prev, newRequest]);
    
    return newRequest;
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              status, 
              updatedAt: new Date().toISOString() 
            } 
          : request
      )
    );
    
  };

  const addComment = (requestId: string, content: string) => {
    const newComment: RequestComment = {
      id: crypto.randomUUID(),
      requestId,
      userId: "currentUser", // In a real app, get this from auth
      userName: "Huidige Gebruiker", // In a real app, get this from auth
      content,
      createdAt: new Date().toISOString()
    };

    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              comments: [...request.comments, newComment] 
            } 
          : request
      )
    );
    
    return newComment;
  };

  const voteOnRequest = (requestId: string, isUpvote: boolean) => {
    setRequests(prev => 
      prev.map(request => {
        if (request.id === requestId) {
          return {
            ...request,
            upvotes: isUpvote ? request.upvotes + 1 : request.upvotes,
            downvotes: !isUpvote ? request.downvotes + 1 : request.downvotes,
            updatedAt: new Date().toISOString()
          };
        }
        return request;
      })
    );
    
  };

  const getRequestById = (requestId: string) => {
    return requests.find(request => request.id === requestId);
  };

  return {
    requests: filteredRequests,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    addRequest,
    updateRequestStatus,
    addComment,
    voteOnRequest,
    getRequestById,
    isAdmin
  };
};


import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Request } from "@/types/requests";
import { RequestStatusBadge } from "./RequestStatusBadge";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";

interface RequestCardProps {
  request: Request;
  onVote: (requestId: string, isUpvote: boolean) => void;
  onSelect: (requestId: string) => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({ 
  request, 
  onVote,
  onSelect,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(request.id)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{request.title}</h3>
          <p className="text-sm text-muted-foreground">
            Ingediend door {request.userName} • {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true, locale: nl })}
          </p>
        </div>
        <RequestStatusBadge status={request.status} />
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{request.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2" 
              onClick={(e) => {
                e.stopPropagation();
                onVote(request.id, true);
              }}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{request.upvotes}</span>
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2" 
              onClick={(e) => {
                e.stopPropagation();
                onVote(request.id, false);
              }}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{request.downvotes}</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span className="text-sm">{request.comments.length}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

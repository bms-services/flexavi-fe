
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RequestStatusBadge } from "./RequestStatusBadge";
import { Request, RequestStatus } from "@/types/requests";
import { ThumbsUp, ThumbsDown, MessageSquare, Check } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { nl } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface RequestDialogProps {
  request: Request | null;
  isOpen: boolean;
  onClose: () => void;
  onVote: (requestId: string, isUpvote: boolean) => void;
  onAddComment: (requestId: string, content: string) => void;
  onUpdateStatus: (requestId: string, status: RequestStatus) => void;
  isAdmin: boolean;
}

export const RequestDialog: React.FC<RequestDialogProps> = ({
  request,
  isOpen,
  onClose,
  onVote,
  onAddComment,
  onUpdateStatus,
  isAdmin,
}) => {
  const [comment, setComment] = useState("");

  if (!request) return null;

  const handleAddComment = () => {
    if (comment.trim()) {
      onAddComment(request.id, comment);
      setComment("");
    }
  };

  const statusOptions = [
    { value: "idea", label: "Idee" },
    { value: "planned", label: "Gepland" },
    { value: "in_progress", label: "In ontwikkeling" },
    { value: "beta", label: "Beta" },
    { value: "rolled_out", label: "Uitgerold" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl">{request.title}</DialogTitle>
            <RequestStatusBadge status={request.status} />
          </div>
          <DialogDescription>
            Ingediend door {request.userName} •{" "}
            {formatDistanceToNow(new Date(request.createdAt), {
              addSuffix: true,
              locale: nl,
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <p className="text-sm whitespace-pre-line">{request.description}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onVote(request.id, true)}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              <span>{request.upvotes}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onVote(request.id, false)}
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              <span>{request.downvotes}</span>
            </Button>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Select
                value={request.status}
                onValueChange={(value) =>
                  onUpdateStatus(request.id, value as RequestStatus)
                }
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status wijzigen" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        <div className="mt-2">
          <h4 className="text-sm font-medium mb-2">
            Reacties ({request.comments.length})
          </h4>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {request.comments.length > 0 ? (
              request.comments.map((comment) => (
                <div key={comment.id} className="bg-muted p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{comment.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(comment.createdAt), "d MMM yyyy HH:mm", {
                        locale: nl,
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nog geen reacties. Wees de eerste!
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Textarea
            placeholder="Schrijf een reactie..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px]"
          />
          <Button className="mt-2" onClick={handleAddComment}>
            Reactie plaatsen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

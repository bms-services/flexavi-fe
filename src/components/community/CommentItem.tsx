
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Reply, 
  ThumbsDown, 
  MoreHorizontal,
  Flag
} from "lucide-react";
import { formatTimeAgo } from "@/utils/format";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ReportDialog } from "./ReportDialog";
import { toast } from "sonner";
import { Comment, Author } from "@/types/community";

interface CommentItemProps {
  comment: Comment & { author: Author };  // Ensure comment has author property
  onReply: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  depth?: number;
  children?: React.ReactNode;
}

export function CommentItem({ 
  comment, 
  onReply, 
  onLike, 
  onDislike, 
  depth = 0,
  children 
}: CommentItemProps) {
  const [showReportDialog, setShowReportDialog] = useState(false);
  
  const maxDepth = 3;
  const isNested = depth > 0;
  
  const handleReport = (reason: string, details: string) => {
    console.log("Reporting comment:", comment.id, reason, details);
    toast.success("Bedankt voor je melding. We zullen deze reactie beoordelen.");
    setShowReportDialog(false);
  };
  
  // Use the likes/dislikes from the Comment or fallback to likeCount/dislikeCount
  const likes = comment.likes || comment.likeCount || 0;
  const dislikes = comment.dislikes || comment.dislikeCount || 0;
  
  return (
    <div className={`${isNested ? 'ml-6 pl-4 border-l' : ''}`}>
      <div className="py-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatar} />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {comment.author.name}
              </span>
              {comment.author.badge && (
                <Badge variant="outline" className="text-xs">
                  {comment.author.badge}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(new Date(comment.createdAt))}
              </span>
            </div>
            
            <div className="text-sm">
              {comment.content}
            </div>
            
            <div className="flex items-center gap-2 pt-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-muted-foreground"
                onClick={() => onLike(comment.id)}
              >
                <Heart 
                  className={`h-3.5 w-3.5 mr-1 ${comment.hasLiked ? "fill-red-500 text-red-500" : ""}`} 
                />
                {likes}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-muted-foreground"
                onClick={() => onDislike(comment.id)}
              >
                <ThumbsDown 
                  className={`h-3.5 w-3.5 mr-1 ${comment.hasDisliked ? "fill-gray-500 text-gray-500" : ""}`} 
                />
                {dislikes}
              </Button>
              
              {depth < maxDepth && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-muted-foreground"
                  onClick={() => onReply(comment.id)}
                >
                  <Reply className="h-3.5 w-3.5 mr-1" />
                  Reageren
                </Button>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-3.5 w-3.5" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowReportDialog(true)}>
                <Flag className="h-4 w-4 mr-2" />
                Rapporteren
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {children}
      
      <ReportDialog 
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        itemType="comment"
        onSubmit={handleReport}
      />
    </div>
  );
}

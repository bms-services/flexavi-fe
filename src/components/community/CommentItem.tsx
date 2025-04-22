
import { useState } from "react";
import { Comment } from "@/types/community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Reply } from "lucide-react";
import { formatDistance } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CommentReplyForm } from "./CommentReplyForm";

interface CommentItemProps {
  comment: Comment;
  onLike: (commentId: string, isComment: boolean) => void;
  onDislike: (commentId: string, isComment: boolean) => void;
  onReply: (content: string, parentId: string) => void;
  indentLevel?: number;
}

export function CommentItem({ comment, onLike, onDislike, onReply, indentLevel = 0 }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  
  const handleReply = (content: string, parentId: string) => {
    onReply(content, parentId);
    setShowReplyForm(false);
  };
  
  return (
    <div className={cn("transition-all", indentLevel > 0 && "ml-8 mt-2")}>
      <div className="flex gap-3">
        <Avatar className={cn("h-8 w-8", indentLevel > 0 && "h-6 w-6")}>
          <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
          <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm">{comment.authorName}</h4>
              <span className="text-xs text-muted-foreground">
                {formatDistance(new Date(comment.createdAt), new Date(), { 
                  addSuffix: true,
                  locale: nl
                })}
              </span>
            </div>
            <p className="mt-1 text-sm">{comment.content}</p>
          </div>
          <div className="flex items-center gap-2 mt-1 ml-2">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "h-6 px-2 text-xs text-muted-foreground",
                comment.userReaction === 'like' && "text-green-600"
              )}
              onClick={() => onLike(comment.id, true)}
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              <span>{comment.likeCount}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "h-6 px-2 text-xs text-muted-foreground",
                comment.userReaction === 'dislike' && "text-red-600"
              )}
              onClick={() => onDislike(comment.id, true)}
            >
              <ThumbsDown className="h-3 w-3 mr-1" />
              <span>{comment.dislikeCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply className="h-3 w-3 mr-1" />
              <span>Reageren</span>
            </Button>
          </div>
        </div>
      </div>
      
      {showReplyForm && (
        <CommentReplyForm
          parentId={comment.id}
          onSubmit={handleReply}
          onCancel={() => setShowReplyForm(false)}
          placeholder={`Reageer op ${comment.authorName}...`}
        />
      )}
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onLike={onLike}
              onDislike={onDislike}
              onReply={onReply}
              indentLevel={indentLevel + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
